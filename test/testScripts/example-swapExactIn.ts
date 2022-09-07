// Example showing full swapExactIn - run using: $ ts-node ./test/testScripts/example-swapExactIn.ts
import { SOR } from '../../src';

require('dotenv').config();
const sor = require('../../src');
const BigNumber = require('bignumber.js');
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { PoolDictionary } from '../../src/types';

// const provider = new JsonRpcProvider(
//     `https://mainnet.infura.io/v3/${process.env.INFURA}` // If running this example make sure you have a .env file saved in root DIR with INFURA=your_key
// );

const provider = new JsonRpcProvider(
    'https://rpc-mumbai.maticvigil.com/v1/c1947560c824b65dcc8774279fe1225b3c835d35'
);
// const DAI = '0xA95aA7229Aaf354CA18FB8f9A5aA3e78B88a2806'; // WETH Address
// const USDC = '0x0457Ad7b48d98E3CD463B9F9d14EfED56332268D'; // USDC Address
// const USDC = '0x40dcb20b6b0d528d1206899f467d0f0339c7889d'; // MBMU Address

const DAI = '0xA95aA7229Aaf354CA18FB8f9A5aA3e78B88a2806';
const USDC = '0x40e5e70826ecf94325fffdea0c61aaae3eda46f6';

const amountIn = new BigNumber('1000000000'); // 1 USDC, Always pay attention to Token Decimals. i.e. In this case USDC has 6 decimals.
const tokenIn = DAI;
const tokenOut = USDC;
const swapType = 'swapExactIn';
const noPools = 6; // This determines how many pools the SOR will use to swap.
const gasPrice = new BigNumber('30000000000'); // You can set gas price to whatever the current price is.
const swapCost = new BigNumber('100000'); // A pool swap costs approx 100000 gas
// URL for pools data
// const poolsUrl = `https://ipfs.fleek.co/ipns/balancer-team-bucket.storage.fleek.co/balancer-exchange-kovan/pools`;
const poolsUrl = 'http://158.247.224.97:18000/subgraphs/name/bootstrapnft';

async function swapExactIn() {
    console.log('Swapping...');
    // This calculates the cost in output token (output token is tokenOut for swapExactIn and
    // tokenIn for a swapExactOut) for each additional pool added to the final SOR swap result.
    // This is used as an input to SOR to allow it to make gas efficient recommendations, i.e.
    // if it costs 5 DAI to add another pool to the SOR solution and that only generates 1 more DAI,
    // then SOR should not add that pool (if gas costs were zero that pool would be added)
    // Notice that outputToken is tokenOut if swapType == 'swapExactIn' and tokenIn if swapType == 'swapExactOut'
    const costOutputToken = await sor.getCostOutputToken(
        tokenOut,
        gasPrice,
        swapCost,
        provider
    );

    // Fetch all pools information
    const poolsHelper = new sor.POOLS();
    console.log('Fetching Pools...');
    let allPoolsNonZeroBalances = poolsHelper.getAllPublicSwapPools(poolsUrl);

    console.log(`Retrieving Onchain Balances...`);
    allPoolsNonZeroBalances = await sor.getAllPoolDataOnChain(
        allPoolsNonZeroBalances,
        '0xAFdbA29203159a16b38Be3e42Bb6bbB0C39a73Ba', // Address of Multicall contract
        provider
    );

    console.log(`Processing Data...`);
    // 'directPools' are all pools that contain both tokenIn and tokenOut, i.e. pools that
    // can be used for direct swaps
    // 'hopTokens' are all tokens that can connect tokenIn and tokenOut in a multihop swap
    // with two legs. WETH is a hopToken if its possible to trade USDC to WETH then WETH to DAI
    // 'poolsTokenIn' are the pools that contain tokenIn and a hopToken
    // 'poolsTokenOut' are the pools that contain a hopToken and tokenOut
    let directPools, hopTokens, poolsTokenIn, poolsTokenOut;
    [directPools, hopTokens, poolsTokenIn, poolsTokenOut] = sor.filterPools(
        allPoolsNonZeroBalances.pools,
        tokenIn.toLowerCase(), // The Subgraph returns tokens in lower case format so we must match this
        tokenOut.toLowerCase(),
        noPools
    );
    console.log('filtering pools...', directPools);

    const smartRouter = new SOR(provider, gasPrice, noPools, 80001, poolsUrl);

    const path = smartRouter.routeProposer.getCandidatePaths(
        tokenIn,
        tokenOut,
        'swapExactIn',
        allPoolsNonZeroBalances.pools,
        {
            gasPrice,
            swapGas: new BigNumber('35000'),
            maxPools: noPools,
            timestamp: Math.floor(Date.now() / 1000),
            forceRefresh: false,
        }
    );

    console.log('new path', JSON.stringify(path));

    // For each hopToken, find the most liquid pool for the first and the second hops
    // let mostLiquidPoolsFirstHop, mostLiquidPoolsSecondHop;
    // [
    //     mostLiquidPoolsFirstHop,
    //     mostLiquidPoolsSecondHop,
    // ] = sor.sortPoolsMostLiquid(
    //     tokenIn,
    //     tokenOut,
    //     hopTokens,
    //     poolsTokenIn,
    //     poolsTokenOut
    // );
    //
    // console.log("sorting pools...", JSON.stringify(mostLiquidPoolsFirstHop), JSON.stringify(mostLiquidPoolsSecondHop));

    // Finds the possible paths to make the swap, each path can be a direct swap
    // or a multihop composed of 2 swaps
    // let pools, pathData;
    // [pools, pathData] = sor.parsePoolData(
    //     directPools,
    //     tokenIn.toLowerCase(),
    //     tokenOut.toLowerCase(),
    //     mostLiquidPoolsFirstHop,
    //     mostLiquidPoolsSecondHop,
    //     hopTokens
    // );
    //
    // console.log("parsing pools...", pools, JSON.stringify(pathData));

    // For each path, find its spot price, slippage and limit amount
    // The spot price of a multihop is simply the multiplication of the spot prices of each
    // of the swaps. The slippage of a multihop is a bit more complicated (out of scope for here)
    // The limit amount is due to the fact that Balancer protocol limits a trade to 50% of the pool
    // balance of tokenIn (for swapExactIn) and 33.33% of the pool balance of tokenOut (for
    // swapExactOut)
    // 'paths' are ordered by ascending spot price
    // let paths = sor.processPaths(pathData, pools, swapType);
    //
    // console.log("processing paths...", JSON.stringify(paths));

    const newPool: PoolDictionary = {};
    path.forEach(path => {
        path.pools.forEach(pool => {
            newPool[pool.id] = pool;
        });
    });
    let newPaths = sor.processPaths(path, newPool, swapType);

    console.log('new processing paths...', JSON.stringify(newPaths));

    // epsOfInterest stores a list of all relevant prices: these are either
    // 1) Spot prices of a path
    // 2) Prices where paths cross, meaning they would move to the same spot price after trade
    //    for the same amount traded.
    // For each price of interest we have:
    //   - 'bestPathsIds' a list of the id of the best paths to get to this price and
    //   - 'amounts' a list of how much each path would need to trade to get to that price of
    //     interest
    // let epsOfInterest = sor.processEpsOfInterestMultiHop(
    //     paths,
    //     swapType,
    //     noPools
    // );

    let newEpsOfInterest = sor.processEpsOfInterestMultiHop(
        newPaths,
        swapType,
        noPools
    );
    console.log(
        'processing eps of interest...',
        JSON.stringify(newEpsOfInterest)
    );

    // Returns 'swaps' which is the optimal list of swaps to make and
    // 'totalReturnWei' which is the total amount of tokenOut (eg. DAI) will be returned
    // let swaps, totalReturnWei;
    // [swaps, totalReturnWei] = sor.smartOrderRouterMultiHopEpsOfInterest(
    //     pools,
    //     paths,
    //     swapType,
    //     amountIn,
    //     noPools,
    //     costOutputToken,
    //     epsOfInterest
    // );

    console.log('====new====');

    const [
        newSwaps,
        newTotalReturnWei,
    ] = sor.smartOrderRouterMultiHopEpsOfInterest(
        newPool,
        newPaths,
        swapType,
        amountIn,
        noPools,
        costOutputToken,
        newEpsOfInterest
    );
    //
    // console.log(`Total DAI Return: ${totalReturnWei.toString()}`);
    // console.log(`Swaps: `);
    // console.log(swaps);

    console.log(`NEw Total DAI Return: ${newTotalReturnWei.toString()}`);
    console.log(`New Swaps: `);
    console.log(newSwaps);

    // console.log("eps of interest", JSON.stringify(epsOfInterest));
    console.log('============');
    console.log('new pool:', JSON.stringify(newPool));
    console.log('=================');
    console.log('new path:', JSON.stringify(newPaths));
    console.log('=================');
    console.log('new eps of interest:', JSON.stringify(newEpsOfInterest));
}

swapExactIn();
