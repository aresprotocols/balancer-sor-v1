import { SubGraphPools, Pools } from './types';
export declare class POOLS {
    getAllPublicSwapPools(URL: string): SubGraphPools;
    formatPoolsBigNumber(pools: SubGraphPools): Promise<Pools>;
}
