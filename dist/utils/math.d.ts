import { Pool, PoolPairBase, SwapTypes } from '../types';
import { BigNumber as OldBigNumber } from '../utils/bignumber';
export declare function EVMgetOutputAmountSwap(
    pool: Pool,
    poolPairData: PoolPairBase,
    swapType: SwapTypes,
    amount: OldBigNumber
): OldBigNumber;
