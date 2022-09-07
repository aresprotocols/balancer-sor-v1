'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.getOutputAmountSwapForPath = exports.calcTotalReturn = exports.formatSwaps = void 0;
const types_1 = require('../types');
const bignumber_1 = require('../utils/bignumber');
const bignumber_2 = require('@ethersproject/bignumber');
const math_1 = require('../utils/math');
exports.formatSwaps = (
    bestPaths,
    swapType,
    totalSwapAmount,
    bestSwapAmounts
) => {
    //// Prepare swap data from paths
    const swaps = [];
    let highestSwapAmt = bestSwapAmounts[0];
    let largestSwapPath = bestPaths[0];
    let bestTotalReturn = bignumber_1.ZERO; // Reset totalReturn as this time it will be
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
        const pathSwaps = [];
        const amounts = [];
        let returnAmount;
        const n = poolPairData.length;
        amounts.push(swapAmount);
        if (swapType === types_1.SwapTypes.SwapExactIn) {
            for (let i = 0; i < n; i++) {
                amounts.push(
                    math_1.EVMgetOutputAmountSwap(
                        path.pools[i],
                        poolPairData[i],
                        types_1.SwapTypes.SwapExactIn,
                        amounts[amounts.length - 1]
                    )
                );
                const swap = {
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
                    math_1.EVMgetOutputAmountSwap(
                        path.pools[n - 1 - i],
                        poolPairData[n - 1 - i],
                        types_1.SwapTypes.SwapExactOut,
                        amounts[0]
                    )
                );
                const swap = {
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
            bignumber_1.ZERO
        );
        const dust = totalSwapAmount.minus(totalSwapAmountWithRoundingErrors);
        if (swapType === types_1.SwapTypes.SwapExactIn) {
            // As swap is ExactIn, add dust to input pool
            swaps[0][0].swapAmount = bignumber_1
                .bnum(swaps[0][0].swapAmount)
                .plus(dust)
                .toString();
        } else {
            // As swap is ExactOut, add dust to output pool
            const firstPathLastPoolIndex = bestPaths[0].swaps.length - 1;
            swaps[0][firstPathLastPoolIndex].swapAmount = bignumber_1
                .bnum(swaps[0][firstPathLastPoolIndex].swapAmount)
                .plus(dust)
                .toString();
        }
    }
    if (bestTotalReturn.eq(0)) return [[], bignumber_1.ZERO, bignumber_1.ZERO];
    // const marketSp = getSpotPriceAfterSwapForPath(
    //     largestSwapPath,
    //     swapType,
    //     ZERO
    // );
    const marketSp = bignumber_1.ZERO;
    return [swaps, bestTotalReturn, marketSp];
};
// TODO: calculate EVM return (use bmath) and update pool balances like current SOR
exports.calcTotalReturn = (paths, swapType, swapAmounts, inputDecimals) => {
    let totalReturn = new bignumber_1.BigNumber(0);
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
function getOutputAmountSwapForPath(path, swapType, amount, inputDecimals) {
    // First of all check if the amount is above limit, if so, return 0 for
    // 'swapExactIn' or Inf for swapExactOut
    if (
        amount.gt(
            bignumber_1.bnum(
                bignumber_2.formatFixed(path.limitAmount, inputDecimals)
            )
        )
    ) {
        if (swapType === types_1.SwapTypes.SwapExactIn) {
            return bignumber_1.ZERO;
        } else {
            return bignumber_1.INFINITY;
        }
    }
    // const amounts = getAmounts(path, swapType, amount);
    const amounts = [];
    if (swapType === types_1.SwapTypes.SwapExactIn) {
        return amounts[amounts.length - 1];
    } else {
        return amounts[0];
    }
}
exports.getOutputAmountSwapForPath = getOutputAmountSwapForPath;
