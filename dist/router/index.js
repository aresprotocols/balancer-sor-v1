'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getBestPaths = exports.RouteProposer = void 0;
const filtering_1 = require('./filtering');
const bignumber_1 = require('../utils/bignumber');
const bignumber_2 = require('@ethersproject/bignumber');
const constants_1 = require('@ethersproject/constants');
const sorClass_1 = require('./sorClass');
class RouteProposer {
    constructor(config) {
        this.config = config;
        this.cache = {};
    }
    /**
     * Given a list of pools and a desired input/output, returns a set of possible paths to route through
     */
    getCandidatePaths(tokenIn, tokenOut, swapType, pools, swapOptions) {
        tokenIn = tokenIn.toLowerCase();
        tokenOut = tokenOut.toLowerCase();
        if (pools.length === 0) return [];
        // If token pair has been processed before that info can be reused to speed up execution
        const cache = this.cache[
            `${tokenIn}${tokenOut}${swapType}${swapOptions.timestamp}`
        ];
        // forceRefresh can be set to force fresh processing of paths/prices
        if (!swapOptions.forceRefresh && !!cache) {
            // Using pre-processed data from cache
            return cache.paths;
        }
        const poolsAllDict = filtering_1.parseToPoolsDict(pools);
        const [
            directPools,
            hopsIn,
            hopsOut,
        ] = filtering_1.filterPoolsOfInterest(
            poolsAllDict,
            tokenIn,
            tokenOut,
            swapOptions.maxPools
        );
        const pathData = filtering_1.producePaths(
            tokenIn,
            tokenOut,
            directPools,
            hopsIn,
            hopsOut,
            poolsAllDict
        );
        console.log('pathData', JSON.stringify(pathData));
        if (pathData.length > 0) {
            return [...pathData];
        }
        const boostedPaths = filtering_1.getBoostedPaths(
            tokenIn,
            tokenOut,
            poolsAllDict,
            this.config
        );
        console.log('boostedPaths', JSON.stringify(boostedPaths));
        return [...pathData, ...boostedPaths];
    }
}
exports.RouteProposer = RouteProposer;
function optimizeSwapAmounts(
    paths,
    swapType,
    totalSwapAmount,
    initialSwapAmounts,
    highestLimitAmounts,
    inputDecimals,
    outputDecimals,
    initialNumPaths,
    maxPools,
    costReturnToken
) {
    return [];
}
exports.getBestPaths = (
    paths,
    swapType,
    totalSwapAmount,
    inputDecimals,
    outputDecimals,
    maxPools,
    costReturnToken
) => {
    // No paths available or totalSwapAmount == 0, return empty solution
    if (paths.length == 0 || totalSwapAmount.isZero()) {
        return [[], bignumber_1.ZERO, bignumber_1.ZERO, bignumber_1.ZERO];
    }
    // Before we start the main loop, we first check if there is enough liquidity for this totalSwapAmount
    const highestLimitAmounts = getHighestLimitAmountsForPaths(paths, maxPools);
    const sumLimitAmounts = highestLimitAmounts.reduce((r, pathLimit) => {
        r.push(pathLimit.add(r[r.length - 1] || constants_1.Zero));
        return r;
    }, []);
    // If the cumulative limit across all paths is lower than totalSwapAmount then no solution is possible
    if (totalSwapAmount.gt(sumLimitAmounts[sumLimitAmounts.length - 1])) {
        return [[], bignumber_1.ZERO, bignumber_1.ZERO, bignumber_1.ZERO]; // Not enough liquidity, return empty
    }
    // We use the highest limits to define the initial number of pools considered and the initial guess for swapAmounts.
    const initialNumPaths =
        sumLimitAmounts.findIndex(cumulativeLimit =>
            // If below is true, it means we have enough liquidity
            totalSwapAmount.lte(cumulativeLimit)
        ) + 1;
    const initialSwapAmounts = highestLimitAmounts.slice(0, initialNumPaths);
    //  Since the sum of the first i highest limits will be less than totalSwapAmount, we remove the difference to the last swapAmount
    //  so we are sure that the sum of swapAmounts will be equal to totalSwapAmount
    const difference = sumLimitAmounts[initialNumPaths - 1].sub(
        totalSwapAmount
    );
    initialSwapAmounts[initialSwapAmounts.length - 1] = initialSwapAmounts[
        initialSwapAmounts.length - 1
    ].sub(difference);
    const [
        bestPaths,
        bestSwapAmounts,
        bestTotalReturnConsideringFees,
    ] = optimizeSwapAmounts(
        paths,
        swapType,
        totalSwapAmount,
        initialSwapAmounts,
        highestLimitAmounts,
        inputDecimals,
        outputDecimals,
        initialNumPaths,
        maxPools,
        costReturnToken
    );
    const [swaps, bestTotalReturn, marketSp] = sorClass_1.formatSwaps(
        bestPaths,
        swapType,
        bignumber_1.bnum(
            bignumber_2.formatFixed(totalSwapAmount, inputDecimals)
        ),
        bestSwapAmounts
    );
    if (bestTotalReturn.eq(0))
        return [[], bignumber_1.ZERO, bignumber_1.ZERO, bignumber_1.ZERO];
    return [swaps, bestTotalReturn, marketSp, bestTotalReturnConsideringFees];
};
function getHighestLimitAmountsForPaths(paths, maxPools) {
    if (paths.length === 0) return [];
    const limitAmounts = [];
    for (let i = 0; i < maxPools; i++) {
        if (i < paths.length) {
            const limitAmount = paths[i].limitAmount;
            limitAmounts.push(limitAmount);
        }
    }
    return limitAmounts;
}
