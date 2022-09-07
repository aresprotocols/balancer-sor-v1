import { NewPath, Pool, SorConfig, SwapOptions } from '../types';
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
