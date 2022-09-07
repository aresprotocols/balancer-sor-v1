import { NewPath, Pool, SorConfig, Swap, SwapOptions } from '../types';
import { BigNumber as OldBigNumber } from '../utils/bignumber';
import { BigNumber } from '@ethersproject/bignumber';
export declare class RouteProposer {
    private readonly config;
    cache: Record<
        string,
        {
            paths: NewPath[];
        }
    >;
    constructor(config: SorConfig);
    /**
     * Given a list of pools and a desired input/output, returns a set of possible paths to route through
     */
    getCandidatePaths(
        tokenIn: string,
        tokenOut: string,
        swapType: string,
        pools: Pool[],
        swapOptions: SwapOptions
    ): NewPath[];
}
export declare const getBestPaths: (
    paths: NewPath[],
    swapType: string,
    totalSwapAmount: BigNumber,
    inputDecimals: number,
    outputDecimals: number,
    maxPools: number,
    costReturnToken: BigNumber
) => [Swap[][], OldBigNumber, OldBigNumber, OldBigNumber];
