import { NewPath, Pool, PoolPairBase, SwapTypes } from '../types';
import {
    BigNumber as OldBigNumber,
    bnum,
    ZERO,
    ONE,
    INFINITY,
} from '../utils/bignumber';
import { scale } from '../bmath';
// We need do pass 'pools' here because this function has to update the pools state
// in case a pool is used twice in two different paths

export function EVMgetOutputAmountSwap(
    pool: Pool,
    poolPairData: PoolPairBase,
    swapType: SwapTypes,
    amount: OldBigNumber
): OldBigNumber {
    const { balanceIn, balanceOut, tokenIn, tokenOut } = poolPairData;

    let returnAmount: OldBigNumber;

    return ZERO;
}
