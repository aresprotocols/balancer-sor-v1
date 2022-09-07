import { NewPath, Swap, SwapTypes } from '../types';
import {
    BigNumber as OldBigNumber,
    bnum,
    ZERO,
    ONE,
    INFINITY,
} from '../utils/bignumber';
import cloneDeep from 'lodash.clonedeep';
import { BigNumber, formatFixed } from '@ethersproject/bignumber';
import { EVMgetOutputAmountSwap } from '../utils/math';

export const formatSwaps = (
    bestPaths: NewPath[],
    swapType: string,
    totalSwapAmount: OldBigNumber,
    bestSwapAmounts: OldBigNumber[]
): [Swap[][], OldBigNumber, OldBigNumber] => {
    //// Prepare swap data from paths
    const swaps: Swap[][] = [];
    let highestSwapAmt = bestSwapAmounts[0];
    let largestSwapPath: NewPath = bestPaths[0];
    let bestTotalReturn = ZERO; // Reset totalReturn as this time it will be
    // calculated with the EVM maths so the return is exactly what the user will get
    // after executing the transaction (given there are no front-runners)

    bestPaths.forEach((path, i) => {
        const swapAmount = bestSwapAmounts[i];

        if (swapAmount.gt(highestSwapAmt)) {
            highestSwapAmt = swapAmount;
            largestSwapPath = path;
        }

        // // TODO: remove. To debug only!
        /*
        console.log(
            'Prices should be all very close (unless one of the paths is on the limit!'
        );
        console.log(
            getSpotPriceAfterSwapForPath(path, swapType, swapAmount).toNumber()
        );
        */
        const poolPairData = path.poolPairData;
        const pathSwaps: Swap[] = [];
        const amounts: OldBigNumber[] = [];
        let returnAmount: OldBigNumber;
        const n = poolPairData.length;
        amounts.push(swapAmount);
        if (swapType === SwapTypes.SwapExactIn) {
            for (let i = 0; i < n; i++) {
                amounts.push(
                    EVMgetOutputAmountSwap(
                        path.pools[i],
                        poolPairData[i],
                        SwapTypes.SwapExactIn,
                        amounts[amounts.length - 1]
                    )
                );
                const swap: Swap = {
                    pool: path.swaps[i].pool,
                    tokenIn: path.swaps[i].tokenIn,
                    tokenOut: path.swaps[i].tokenOut,
                    swapAmount: amounts[i].toString(),
                    tokenInDecimals: path.poolPairData[i].decimalsIn,
                    tokenOutDecimals: path.poolPairData[i].decimalsOut,
                };
                pathSwaps.push(swap);
            }
            returnAmount = amounts[n];
        } else {
            for (let i = 0; i < n; i++) {
                amounts.unshift(
                    EVMgetOutputAmountSwap(
                        path.pools[n - 1 - i],
                        poolPairData[n - 1 - i],
                        SwapTypes.SwapExactOut,
                        amounts[0]
                    )
                );
                const swap: Swap = {
                    pool: path.swaps[n - 1 - i].pool,
                    tokenIn: path.swaps[n - 1 - i].tokenIn,
                    tokenOut: path.swaps[n - 1 - i].tokenOut,
                    swapAmount: amounts[1].toString(),
                    tokenInDecimals: path.poolPairData[n - 1 - i].decimalsIn,
                    tokenOutDecimals: path.poolPairData[n - 1 - i].decimalsOut,
                };
                pathSwaps.unshift(swap);
            }
            returnAmount = amounts[0];
        }
        swaps.push(pathSwaps);
        bestTotalReturn = bestTotalReturn.plus(returnAmount);
    });

    // Since the individual swapAmounts for each path are integers, the sum of all swapAmounts
    // might not be exactly equal to the totalSwapAmount the user requested. We need to correct that rounding error
    // and we do that by adding the rounding error to the first path.
    if (swaps.length > 0) {
        const totalSwapAmountWithRoundingErrors = bestSwapAmounts.reduce(
            (a, b) => a.plus(b),
            ZERO
        );
        const dust = totalSwapAmount.minus(totalSwapAmountWithRoundingErrors);
        if (swapType === SwapTypes.SwapExactIn) {
            // As swap is ExactIn, add dust to input pool
            swaps[0][0].swapAmount = bnum(swaps[0][0].swapAmount as string)
                .plus(dust)
                .toString();
        } else {
            // As swap is ExactOut, add dust to output pool
            const firstPathLastPoolIndex = bestPaths[0].swaps.length - 1;
            swaps[0][firstPathLastPoolIndex].swapAmount = bnum(
                swaps[0][firstPathLastPoolIndex].swapAmount as string
            )
                .plus(dust)
                .toString();
        }
    }

    if (bestTotalReturn.eq(0)) return [[], ZERO, ZERO];

    // const marketSp = getSpotPriceAfterSwapForPath(
    //     largestSwapPath,
    //     swapType,
    //     ZERO
    // );

    const marketSp = ZERO;

    return [swaps, bestTotalReturn, marketSp];
};

// TODO: calculate EVM return (use bmath) and update pool balances like current SOR
export const calcTotalReturn = (
    paths: NewPath[],
    swapType: SwapTypes,
    swapAmounts: OldBigNumber[],
    inputDecimals: number
): OldBigNumber => {
    let totalReturn = new OldBigNumber(0);
    // changing the contents of pools (parameter passed as reference)
    paths.forEach((path, i) => {
        totalReturn = totalReturn.plus(
            getOutputAmountSwapForPath(
                path,
                swapType,
                swapAmounts[i],
                inputDecimals
            )
        );
    });
    return totalReturn;
};

export function getOutputAmountSwapForPath(
    path: NewPath,
    swapType: SwapTypes,
    amount: OldBigNumber,
    inputDecimals: number
): OldBigNumber {
    // First of all check if the amount is above limit, if so, return 0 for
    // 'swapExactIn' or Inf for swapExactOut
    if (amount.gt(bnum(formatFixed(path.limitAmount, inputDecimals)))) {
        if (swapType === SwapTypes.SwapExactIn) {
            return ZERO;
        } else {
            return INFINITY;
        }
    }

    // const amounts = getAmounts(path, swapType, amount);
    const amounts = [];
    if (swapType === SwapTypes.SwapExactIn) {
        return amounts[amounts.length - 1];
    } else {
        return amounts[0];
    }
}
