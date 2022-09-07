import { NewPath, Swap, SwapTypes } from '../types';
import { BigNumber as OldBigNumber } from '../utils/bignumber';
export declare const formatSwaps: (
    bestPaths: NewPath[],
    swapType: string,
    totalSwapAmount: OldBigNumber,
    bestSwapAmounts: OldBigNumber[]
) => [Swap[][], OldBigNumber, OldBigNumber];
export declare const calcTotalReturn: (
    paths: NewPath[],
    swapType: SwapTypes,
    swapAmounts: OldBigNumber[],
    inputDecimals: number
) => OldBigNumber;
export declare function getOutputAmountSwapForPath(
    path: NewPath,
    swapType: SwapTypes,
    amount: OldBigNumber,
    inputDecimals: number
): OldBigNumber;
