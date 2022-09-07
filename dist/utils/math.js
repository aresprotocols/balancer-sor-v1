'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.EVMgetOutputAmountSwap = void 0;
const bignumber_1 = require('../utils/bignumber');
// We need do pass 'pools' here because this function has to update the pools state
// in case a pool is used twice in two different paths
function EVMgetOutputAmountSwap(pool, poolPairData, swapType, amount) {
    const { balanceIn, balanceOut, tokenIn, tokenOut } = poolPairData;
    let returnAmount;
    return bignumber_1.ZERO;
}
exports.EVMgetOutputAmountSwap = EVMgetOutputAmountSwap;
