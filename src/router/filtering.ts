import {
    hopDictionary,
    NewPath,
    Pool,
    PoolDictionary,
    PoolPairBase,
    PoolPairData,
    SorConfig,
    Swap,
} from '../types';
import cloneDeep from 'lodash.clonedeep';
import { BigNumber, bnum, ZERO } from '../utils/bignumber';
import { Zero } from '@ethersproject/constants';
import { getAddress } from '@ethersproject/address';
import { bdiv, bmul, scale } from '../bmath';

export function parseToPoolsDict(pools: Pool[]): PoolDictionary {
    console.log('parseToPoolsDict', pools);
    return Object.fromEntries(
        cloneDeep(pools)
            .filter(
                pool =>
                    pool.tokensList.length > 0 && pool.tokens[0].balance !== '0'
            )
            .map(pool => [pool.id, pool])
            .filter(([, pool]) => pool !== undefined)
    );
}

/*
The purpose of this function is to build dictionaries of direct pools
and plausible hop pools.
*/
export function filterPoolsOfInterest(
    allPools: PoolDictionary,
    tokenIn: string,
    tokenOut: string,
    maxPools: number
): [PoolDictionary, hopDictionary, hopDictionary] {
    const directPools: PoolDictionary = {};
    const hopsIn: hopDictionary = {};
    const hopsOut: hopDictionary = {};

    Object.keys(allPools).forEach(id => {
        const pool = allPools[id];
        const tokenListSet = new Set(pool.tokensList);
        const containsTokenIn = tokenListSet.has(tokenIn.toLowerCase());
        const containsTokenOut = tokenListSet.has(tokenOut.toLowerCase());

        // This is a direct pool as has both tokenIn and tokenOut
        if (containsTokenIn && containsTokenOut) {
            directPools[pool.id] = pool;
            return;
        }

        if (maxPools > 1) {
            if (containsTokenIn && !containsTokenOut) {
                for (const hopToken of tokenListSet) {
                    if (!hopsIn[hopToken]) hopsIn[hopToken] = new Set([]);
                    hopsIn[hopToken].add(pool.id);
                }
            } else if (!containsTokenIn && containsTokenOut) {
                for (const hopToken of [...tokenListSet]) {
                    if (!hopsOut[hopToken]) hopsOut[hopToken] = new Set([]);
                    hopsOut[hopToken].add(pool.id);
                }
            }
        }
    });
    return [directPools, hopsIn, hopsOut];
}

export function producePaths(
    tokenIn: string,
    tokenOut: string,
    directPools: PoolDictionary,
    hopsIn: hopDictionary,
    hopsOut: hopDictionary,
    pools: PoolDictionary
): NewPath[] {
    const paths: NewPath[] = [];

    // Create direct paths
    for (const id in directPools) {
        const path = createPath([tokenIn, tokenOut], [pools[id]]);
        paths.push(path);
    }

    for (const hopToken in hopsIn) {
        if (hopsOut[hopToken]) {
            let highestNormalizedLiquidityFirst = ZERO; // Aux variable to find pool with most liquidity for pair (tokenIn -> hopToken)
            let highestNormalizedLiquidityFirstPoolId: string | undefined; // Aux variable to find pool with most liquidity for pair (tokenIn -> hopToken)
            let highestNormalizedLiquiditySecond = ZERO; // Aux variable to find pool with most liquidity for pair (hopToken -> tokenOut)
            let highestNormalizedLiquiditySecondPoolId: string | undefined; // Aux variable to find pool with most liquidity for pair (hopToken -> tokenOut)
            for (const poolInId of [...hopsIn[hopToken]]) {
                const poolIn = pools[poolInId];
                const poolPairData = parsePoolPairData(
                    tokenIn,
                    hopToken,
                    poolIn
                );
                const normalizedLiquidity = getNormalizedLiquidity(
                    poolPairData
                );
                // Cannot be strictly greater otherwise highestNormalizedLiquidityPoolId = 0 if hopTokens[i] balance is 0 in this pool.
                if (
                    normalizedLiquidity.isGreaterThanOrEqualTo(
                        highestNormalizedLiquidityFirst
                    )
                ) {
                    highestNormalizedLiquidityFirst = normalizedLiquidity;
                    highestNormalizedLiquidityFirstPoolId = poolIn.id;
                }
            }
            for (const poolOutId of [...hopsOut[hopToken]]) {
                const poolOut = pools[poolOutId];
                const poolPairData = parsePoolPairData(
                    hopToken,
                    tokenOut,
                    poolOut
                );
                const normalizedLiquidity = getNormalizedLiquidity(
                    poolPairData
                );
                // Cannot be strictly greater otherwise highestNormalizedLiquidityPoolId = 0 if hopTokens[i] balance is 0 in this pool.
                if (
                    normalizedLiquidity.isGreaterThanOrEqualTo(
                        highestNormalizedLiquiditySecond
                    )
                ) {
                    highestNormalizedLiquiditySecond = normalizedLiquidity;
                    highestNormalizedLiquiditySecondPoolId = poolOut.id;
                }
            }
            if (
                highestNormalizedLiquidityFirstPoolId &&
                highestNormalizedLiquiditySecondPoolId
            ) {
                const path = createPath(
                    [tokenIn, hopToken, tokenOut],
                    [
                        pools[highestNormalizedLiquidityFirstPoolId],
                        pools[highestNormalizedLiquiditySecondPoolId],
                    ]
                );
                paths.push(path);
            }
        }
    }
    return paths;
}

// We build a directed graph for the boosted pools.
// Nodes are tokens and edges are triads: [pool.id, tokenIn, tokenOut].
// The current criterion for including a pool into this graph is the following:
// (a) We include every linear pool.
// (b) Among phantom pools, we include those that contain the pool token of a linear pool.
// (c) Among every pool, we include those that contain the pool token of
// a pool from the previous step.
// (d) We include connections of tokenIn and tokenOut to WETH.
// (e) When tokenIn or tokenOut are tokens offered at an LBP, we also include
// the LBPs and the connections of the corresponding raising tokens with WETH.
// (f) We include the pool weth/wsteth
//
// To build the paths using boosted pools we use the following algorithm.
// Given a tokenIn and a tokenOut belonging to the graph, we want to find
// all the connecting paths inside the graph, with the properties:
// (a) They do not visit the same token twice
// (b) They do not use the same pool twice in a row (since this
// would never be optimal).
// These paths can be organized as a directed tree having tokenIn as a root.
// We build this tree by adding at each step all the possible continuations for
// each branch. When a branch reaches tokenOut, we write down the corresponding path.

export function getBoostedGraph(
    tokenIn: string,
    tokenOut: string,
    poolsAllDict: PoolDictionary,
    config: SorConfig
): edgeDict {
    const wethAddress: string = config.weth.toLowerCase();
    const graphPoolsSet: Set<Pool> = new Set();
    const linearPools: Pool[] = [];
    const phantomPools: Pool[] = [];
    const relevantRaisingTokens: string[] = [];
    // Here we add all linear pools, take note of phantom pools,
    // add pools with tokenIn or tokenOut with weth,
    // add LBP pools with tokenIn or tokenOut and take note of the
    // corresponding raising tokens.
    for (const id in poolsAllDict) {
        const pool = poolsAllDict[id];
        linearPools.push(pool);
        graphPoolsSet.add(pool);
    }
    if (linearPools.length == 0) return {};

    const graphPools: Pool[] = [...graphPoolsSet];
    const edgeDict = getNodesAndEdges(graphPools);
    return edgeDict;
}

interface edgeDict {
    [node: string]: [string, string, string][];
}

function getNodesAndEdges(pools: Pool[]): edgeDict {
    const edgesFromNode: edgeDict = {};
    for (const pool of pools) {
        const n = pool.tokensList.length;
        for (let i = 0; i < n; i++) {
            if (!edgesFromNode[pool.tokensList[i]])
                edgesFromNode[pool.tokensList[i]] = [];
            for (let j = 0; j < n; j++) {
                if (i == j) continue;
                const edge: [string, string, string] = [
                    pool.id,
                    pool.tokensList[i],
                    pool.tokensList[j],
                ];
                edgesFromNode[pool.tokensList[i]].push(edge);
            }
        }
    }
    return edgesFromNode;
}

interface treeEdge {
    edge: [string, string, string];
    parentIndices: [number, number];
    visitedNodes: string[];
}

export function getBoostedPaths(
    tokenIn: string,
    tokenOut: string,
    poolsAllDict: PoolDictionary,
    config: SorConfig
): NewPath[] {
    const edgesFromNode = getBoostedGraph(
        tokenIn,
        tokenOut,
        poolsAllDict,
        config
    );
    const pathsInfo: [string[], string[]][] = [];
    const rootTreeEdge: treeEdge = {
        edge: ['', '', tokenIn],
        parentIndices: [-1, -1],
        visitedNodes: [],
    };
    const treeEdges: treeEdge[][] = [[rootTreeEdge]];
    let iterate = true;
    while (iterate) {
        const n = treeEdges.length; // number of tree edge layers so far
        const newTreeEdges: treeEdge[] = [];
        // adds every possible treeEdge for each treeEdge of the previous layer
        for (let i = 0; i < treeEdges[n - 1].length; i++) {
            const treeEdge = treeEdges[n - 1][i];
            const token = treeEdge.edge[2];
            const edgesFromToken = edgesFromNode[token];
            if (!edgesFromToken) continue;
            for (const edge of edgesFromToken) {
                // skip if the node was already visited or
                // if the pool is the one from the previous edge
                if (
                    treeEdge.visitedNodes.includes(edge[2]) ||
                    treeEdge.edge[0] == edge[0]
                ) {
                    continue;
                }
                if (edge[2] == tokenOut) {
                    pathsInfo.push(getPathInfo(edge, treeEdge, treeEdges));
                }
                const newTreeEdge: treeEdge = {
                    edge: edge,
                    parentIndices: [n - 1, i],
                    visitedNodes: treeEdge.visitedNodes.concat(edge[1]),
                };
                newTreeEdges.push(newTreeEdge);
            }
        }
        if (newTreeEdges.length == 0) {
            iterate = false;
        } else treeEdges.push(newTreeEdges);
    }
    console.log('pathsInfo', JSON.stringify(pathsInfo));
    return pathsInfoToPaths(pathsInfo, poolsAllDict);
}

function getPathInfo(
    edge: [string, string, string],
    treeEdge: treeEdge,
    treeEdges: treeEdge[][]
): [string[], string[]] {
    const pathEdges: [string, string, string][] = [edge];
    pathEdges.unshift(treeEdge.edge);
    let indices = treeEdge.parentIndices;
    while (indices[0] !== -1) {
        pathEdges.unshift(treeEdges[indices[0]][indices[1]].edge);
        indices = treeEdges[indices[0]][indices[1]].parentIndices;
    }
    const pools = pathEdges.map(pathEdge => pathEdge[0]);
    pools.splice(0, 1);
    const tokens = pathEdges.map(pathEdge => pathEdge[2]);
    return [tokens, pools];
}

function pathsInfoToPaths(
    flexBoostedPathsInfo: [string[], string[]][],
    poolsAllDict: PoolDictionary
): NewPath[] {
    const paths: NewPath[] = [];
    for (const boostedPathInfo of flexBoostedPathsInfo) {
        const pools = boostedPathInfo[1].map(id => poolsAllDict[id]);
        // ignore paths of length 1 and 2
        if (pools.length > 2) {
            paths.push(createPath(boostedPathInfo[0], pools));
        }
    }
    return paths;
}

// Creates a path with pools.length hops
// i.e. tokens[0]>[Pool0]>tokens[1]>[Pool1]>tokens[2]>[Pool2]>tokens[3]
export function createPath(tokens: string[], pools: Pool[]): NewPath {
    let tI: string, tO: string;
    const swaps: Swap[] = [];
    const poolPairData: PoolPairBase[] = [];
    let id = '';

    for (let i = 0; i < pools.length; i++) {
        tI = tokens[i];
        tO = tokens[i + 1];
        const poolPair = parsePoolPairData(tI, tO, pools[i]);
        poolPairData.push(poolPair);
        id = id + poolPair.id;

        const swap = {
            pool: pools[i].id,
            tokenIn: tI,
            tokenOut: tO,
            tokenInDecimals: poolPair.decimalsIn,
            tokenOutDecimals: poolPair.decimalsOut,
        };

        swaps.push(swap);
    }

    const path: NewPath = {
        id,
        swaps,
        limitAmount: Zero,
        poolPairData,
        pools,
    };

    return path;
}

const parsePoolPairData = (tokenIn: string, tokenOut: string, pool: Pool) => {
    const tokenIndexIn = pool.tokens.findIndex(
        t => getAddress(t.address) === getAddress(tokenIn)
    );
    if (tokenIndexIn < 0) throw 'Pool does not contain tokenIn';

    const tI = pool.tokens[tokenIndexIn];
    const balanceIn = tI.balance;
    const decimalsIn = tI.decimals;

    const tokenIndexOut = pool.tokens.findIndex(
        t => getAddress(t.address) === getAddress(tokenOut)
    );
    if (tokenIndexOut < 0) throw 'Pool does not contain tokenOut';
    const tO = pool.tokens[tokenIndexOut];
    const balanceOut = tO.balance;
    const decimalsOut = tO.decimals;

    return {
        id: pool.id,
        address: pool.id,
        tokenIn: tokenIn,
        tokenOut: tokenOut,
        decimalsIn: Number(decimalsIn),
        decimalsOut: Number(decimalsOut),
        // TODO: parseFixed(balanceIn, decimalsIn)
        balanceIn: balanceIn,
        // TODO: parseFixed(balanceOut, decimalsOut)
        balanceOut: balanceOut,
        weightIn: scale(bnum(tI.denormWeight).div(bnum(pool.totalWeight)), 18),
        weightOut: scale(bnum(tO.denormWeight).div(bnum(pool.totalWeight)), 18),
        swapFee: pool.swapFee,
    };
};

// Normalized liquidity is an abstract term that can be thought of the
// inverse of the slippage. It is proportional to the token balances in the
// pool but also depends on the shape of the invariant curve.
// As a standard, we define normalized liquidity in tokenOut
const getNormalizedLiquidity1 = (poolPairData: PoolPairBase) => {
    // return bnum(
    //     formatFixed(
    //         poolPairData.balanceOut
    //             .mul(poolPairData.weightIn)
    //             .div(poolPairData.weightIn.add(poolPairData.weightOut)),
    //         poolPairData.decimalsOut
    //     )
    // );

    return bnum(1);
};

// Based on the function of same name of file onchain-sor in file: BRegistry.sol
// Normalized liquidity is not used in any calculationf, but instead for comparison between poolPairDataList only
// so we can find the most liquid poolPairData considering the effect of uneven weigths
function getNormalizedLiquidity(poolPairData: PoolPairBase): BigNumber {
    let { weightIn, weightOut, balanceIn, balanceOut, swapFee } = poolPairData;
    balanceOut = bnum(balanceOut.toString());
    weightIn = bnum(weightIn.toString());
    weightOut = bnum(weightOut.toString());
    return bdiv(bmul(balanceOut, weightIn), weightIn.plus(weightOut));
}
