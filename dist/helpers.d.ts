import { BigNumber } from './utils/bignumber';
import {
    PoolPairData,
    Path,
    Pool,
    PoolDictionary,
    DisabledOptions,
    PoolPairBase,
} from './types';
import { BigNumber as OldBigNumber } from '@ethersproject/bignumber';
export declare function getLimitAmountSwap(
    poolPairData: PoolPairBase,
    swapType: string
): BigNumber;
export declare function getNewLimitAmountSwap(
    poolPairData: any,
    swapType: string
): BigNumber;
export declare function getNewLimitAmountSwapForPath(
    newPoolPairData: any,
    swapType: string
): OldBigNumber;
export declare function getOutputAmountSwap(
    poolPairData: PoolPairBase,
    swapType: string,
    amount: BigNumber
): BigNumber;
export declare function calcNewInGivenOut(
    balanceIn: bigint,
    weightIn: bigint,
    balanceOut: bigint,
    weightOut: bigint,
    amountOut: bigint,
    fee: bigint
): bigint;
export declare function takeToPrecision18(
    amount: OldBigNumber,
    decimals: number
): OldBigNumber;
export declare function getLimitAmountSwapPath(
    pools: PoolDictionary,
    path: Path,
    swapType: string,
    poolPairData: any
): BigNumber;
export declare function getSpotPricePath(
    pools: PoolDictionary,
    path: Path,
    poolPairData: any
): BigNumber;
export declare function getSpotPrice(poolPairData: PoolPairData): BigNumber;
export declare function getSlippageLinearizedSpotPriceAfterSwapPath(
    pools: PoolDictionary,
    path: Path,
    swapType: string,
    poolPairData: any
): BigNumber;
export declare function getSlippageLinearizedSpotPriceAfterSwap(
    poolPairData: PoolPairData,
    swapType: string
): BigNumber;
export declare function getReturnAmountSwapPath(
    pools: PoolDictionary,
    path: Path,
    swapType: string,
    amount: BigNumber
): BigNumber;
export declare function getReturnAmountSwap(
    pools: PoolDictionary,
    poolPairData: PoolPairData,
    swapType: string,
    amount: BigNumber
): BigNumber;
export declare function updateTokenBalanceForPool(
    pool: any,
    token: string,
    balance: BigNumber
): any;
export declare function getNormalizedLiquidity(
    poolPairData: PoolPairData
): BigNumber;
export declare const parsePoolData: (
    directPools: PoolDictionary,
    tokenIn: string,
    tokenOut: string,
    mostLiquidPoolsFirstHop?: Pool[],
    mostLiquidPoolsSecondHop?: Pool[],
    hopTokens?: string[]
) => [PoolDictionary, Path[]];
export declare const parsePoolPairData: (
    p: Pool,
    tokenIn: string,
    tokenOut: string
) => PoolPairData;
export declare const formatSubgraphPools: (pools: any) => void;
export declare function filterPools(
    allPools: Pool[], // The complete information of the pools
    tokenIn: string,
    tokenOut: string,
    maxPools: number,
    disabledOptions?: DisabledOptions
): [PoolDictionary, string[], PoolDictionary, PoolDictionary];
export declare function sortPoolsMostLiquid(
    tokenIn: string,
    tokenOut: string,
    hopTokens: string[],
    poolsTokenInNoTokenOut: PoolDictionary,
    poolsTokenOutNoTokenIn: PoolDictionary
): [Pool[], Pool[]];
export declare function getMarketSpotPrice(paths: Path[]): BigNumber;
