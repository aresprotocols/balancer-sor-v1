'use strict';
var __importDefault =
    (this && this.__importDefault) ||
    function(mod) {
        return mod && mod.__esModule ? mod : { default: mod };
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.createPath = exports.getBoostedPaths = exports.getBoostedGraph = exports.producePaths = exports.filterPoolsOfInterest = exports.parseToPoolsDict = void 0;
const lodash_clonedeep_1 = __importDefault(require('lodash.clonedeep'));
const bignumber_1 = require('../utils/bignumber');
const constants_1 = require('@ethersproject/constants');
const address_1 = require('@ethersproject/address');
const bmath_1 = require('../bmath');
function parseToPoolsDict(pools) {
    console.log('parseToPoolsDict', pools);
    return Object.fromEntries(
        lodash_clonedeep_1
            .default(pools)
            .filter(
                pool =>
                    pool.tokensList.length > 0 && pool.tokens[0].balance !== '0'
            )
            .map(pool => [pool.id, pool])
            .filter(([, pool]) => pool !== undefined)
    );
}
exports.parseToPoolsDict = parseToPoolsDict;
/*
The purpose of this function is to build dictionaries of direct pools
and plausible hop pools.
*/
function filterPoolsOfInterest(allPools, tokenIn, tokenOut, maxPools) {
    const directPools = {};
    const hopsIn = {};
    const hopsOut = {};
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
exports.filterPoolsOfInterest = filterPoolsOfInterest;
function producePaths(tokenIn, tokenOut, directPools, hopsIn, hopsOut, pools) {
    const paths = [];
    // Create direct paths
    for (const id in directPools) {
        const path = createPath([tokenIn, tokenOut], [pools[id]]);
        paths.push(path);
    }
    for (const hopToken in hopsIn) {
        if (hopsOut[hopToken]) {
            let highestNormalizedLiquidityFirst = bignumber_1.ZERO; // Aux variable to find pool with most liquidity for pair (tokenIn -> hopToken)
            let highestNormalizedLiquidityFirstPoolId; // Aux variable to find pool with most liquidity for pair (tokenIn -> hopToken)
            let highestNormalizedLiquiditySecond = bignumber_1.ZERO; // Aux variable to find pool with most liquidity for pair (hopToken -> tokenOut)
            let highestNormalizedLiquiditySecondPoolId; // Aux variable to find pool with most liquidity for pair (hopToken -> tokenOut)
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
exports.producePaths = producePaths;
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
function getBoostedGraph(tokenIn, tokenOut, poolsAllDict, config) {
    const wethAddress = config.weth.toLowerCase();
    const graphPoolsSet = new Set();
    const linearPools = [];
    const phantomPools = [];
    const relevantRaisingTokens = [];
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
    const graphPools = [...graphPoolsSet];
    const edgeDict = getNodesAndEdges(graphPools);
    return edgeDict;
}
exports.getBoostedGraph = getBoostedGraph;
function getNodesAndEdges(pools) {
    const edgesFromNode = {};
    for (const pool of pools) {
        const n = pool.tokensList.length;
        for (let i = 0; i < n; i++) {
            if (!edgesFromNode[pool.tokensList[i]])
                edgesFromNode[pool.tokensList[i]] = [];
            for (let j = 0; j < n; j++) {
                if (i == j) continue;
                const edge = [pool.id, pool.tokensList[i], pool.tokensList[j]];
                edgesFromNode[pool.tokensList[i]].push(edge);
            }
        }
    }
    return edgesFromNode;
}
function getBoostedPaths(tokenIn, tokenOut, poolsAllDict, config) {
    const edgesFromNode = getBoostedGraph(
        tokenIn,
        tokenOut,
        poolsAllDict,
        config
    );
    const pathsInfo = [];
    const rootTreeEdge = {
        edge: ['', '', tokenIn],
        parentIndices: [-1, -1],
        visitedNodes: [],
    };
    const treeEdges = [[rootTreeEdge]];
    let iterate = true;
    while (iterate) {
        const n = treeEdges.length; // number of tree edge layers so far
        const newTreeEdges = [];
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
                const newTreeEdge = {
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
exports.getBoostedPaths = getBoostedPaths;
function getPathInfo(edge, treeEdge, treeEdges) {
    const pathEdges = [edge];
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
function pathsInfoToPaths(flexBoostedPathsInfo, poolsAllDict) {
    const paths = [];
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
function createPath(tokens, pools) {
    let tI, tO;
    const swaps = [];
    const poolPairData = [];
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
    const path = {
        id,
        swaps,
        limitAmount: constants_1.Zero,
        poolPairData,
        pools,
    };
    return path;
}
exports.createPath = createPath;
const parsePoolPairData = (tokenIn, tokenOut, pool) => {
    const tokenIndexIn = pool.tokens.findIndex(
        t => address_1.getAddress(t.address) === address_1.getAddress(tokenIn)
    );
    if (tokenIndexIn < 0) throw 'Pool does not contain tokenIn';
    const tI = pool.tokens[tokenIndexIn];
    const balanceIn = tI.balance;
    const decimalsIn = tI.decimals;
    const tokenIndexOut = pool.tokens.findIndex(
        t => address_1.getAddress(t.address) === address_1.getAddress(tokenOut)
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
        weightIn: bmath_1.scale(
            bignumber_1
                .bnum(tI.denormWeight)
                .div(bignumber_1.bnum(pool.totalWeight)),
            18
        ),
        weightOut: bmath_1.scale(
            bignumber_1
                .bnum(tO.denormWeight)
                .div(bignumber_1.bnum(pool.totalWeight)),
            18
        ),
        swapFee: pool.swapFee,
    };
};
// Normalized liquidity is an abstract term that can be thought of the
// inverse of the slippage. It is proportional to the token balances in the
// pool but also depends on the shape of the invariant curve.
// As a standard, we define normalized liquidity in tokenOut
const getNormalizedLiquidity1 = poolPairData => {
    // return bnum(
    //     formatFixed(
    //         poolPairData.balanceOut
    //             .mul(poolPairData.weightIn)
    //             .div(poolPairData.weightIn.add(poolPairData.weightOut)),
    //         poolPairData.decimalsOut
    //     )
    // );
    return bignumber_1.bnum(1);
};
// Based on the function of same name of file onchain-sor in file: BRegistry.sol
// Normalized liquidity is not used in any calculationf, but instead for comparison between poolPairDataList only
// so we can find the most liquid poolPairData considering the effect of uneven weigths
function getNormalizedLiquidity(poolPairData) {
    let { weightIn, weightOut, balanceIn, balanceOut, swapFee } = poolPairData;
    balanceOut = bignumber_1.bnum(balanceOut.toString());
    weightIn = bignumber_1.bnum(weightIn.toString());
    weightOut = bignumber_1.bnum(weightOut.toString());
    return bmath_1.bdiv(
        bmath_1.bmul(balanceOut, weightIn),
        weightIn.plus(weightOut)
    );
}
