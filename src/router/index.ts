import { NewPath, Pool, SorConfig, Swap, SwapOptions } from '../types';
import {
    filterPoolsOfInterest,
    getBoostedPaths,
    parseToPoolsDict,
    producePaths,
} from './filtering';
import { BigNumber as OldBigNumber, bnum, ZERO } from '../utils/bignumber';
import { BigNumber, formatFixed } from '@ethersproject/bignumber';
import { Zero } from '@ethersproject/constants';
import { formatSwaps } from './sorClass';

export class RouteProposer {
    cache: Record<string, { paths: NewPath[] }> = {};

    constructor(private readonly config: SorConfig) {}

    /**
     * Given a list of pools and a desired input/output, returns a set of possible paths to route through
     */
    getCandidatePaths(
        tokenIn: string,
        tokenOut: string,
        swapType: string,
        pools: Pool[],
        swapOptions: SwapOptions
    ): NewPath[] {
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

        const poolsAllDict = parseToPoolsDict(pools);

        const [directPools, hopsIn, hopsOut] = filterPoolsOfInterest(
            poolsAllDict,
            tokenIn,
            tokenOut,
            swapOptions.maxPools
        );

        const pathData = producePaths(
            tokenIn,
            tokenOut,
            directPools,
            hopsIn,
            hopsOut,
            poolsAllDict
        );

        console.log('pathData', JSON.stringify(pathData));

        const boostedPaths = getBoostedPaths(
            tokenIn,
            tokenOut,
            poolsAllDict,
            this.config
        );

        console.log('boostedPaths', JSON.stringify(boostedPaths));

        return [...pathData, ...boostedPaths];
    }
}

function optimizeSwapAmounts(
    paths: NewPath[],
    swapType: string,
    totalSwapAmount: BigNumber,
    initialSwapAmounts: BigNumber[],
    highestLimitAmounts: BigNumber[],
    inputDecimals: number,
    outputDecimals: number,
    initialNumPaths: number,
    maxPools: number,
    costReturnToken: BigNumber
) {
    return [];
}

export const getBestPaths = (
    paths: NewPath[],
    swapType: string,
    totalSwapAmount: BigNumber,
    inputDecimals: number,
    outputDecimals: number,
    maxPools: number,
    costReturnToken: BigNumber
): [Swap[][], OldBigNumber, OldBigNumber, OldBigNumber] => {
    // No paths available or totalSwapAmount == 0, return empty solution
    if (paths.length == 0 || totalSwapAmount.isZero()) {
        return [[], ZERO, ZERO, ZERO];
    }

    // Before we start the main loop, we first check if there is enough liquidity for this totalSwapAmount
    const highestLimitAmounts = getHighestLimitAmountsForPaths(paths, maxPools);
    const sumLimitAmounts = highestLimitAmounts.reduce(
        (r: BigNumber[], pathLimit: BigNumber) => {
            r.push(pathLimit.add(r[r.length - 1] || Zero));
            return r;
        },
        []
    );

    // If the cumulative limit across all paths is lower than totalSwapAmount then no solution is possible
    if (totalSwapAmount.gt(sumLimitAmounts[sumLimitAmounts.length - 1])) {
        return [[], ZERO, ZERO, ZERO]; // Not enough liquidity, return empty
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

    const [swaps, bestTotalReturn, marketSp] = formatSwaps(
        bestPaths,
        swapType,
        bnum(formatFixed(totalSwapAmount, inputDecimals)),
        bestSwapAmounts
    );

    if (bestTotalReturn.eq(0)) return [[], ZERO, ZERO, ZERO];

    return [swaps, bestTotalReturn, marketSp, bestTotalReturnConsideringFees];
};

function getHighestLimitAmountsForPaths(
    paths: NewPath[],
    maxPools: number
): BigNumber[] {
    if (paths.length === 0) return [];
    const limitAmounts: BigNumber[] = [];
    for (let i = 0; i < maxPools; i++) {
        if (i < paths.length) {
            const limitAmount = paths[i].limitAmount;
            limitAmounts.push(limitAmount);
        }
    }
    return limitAmounts;
}
