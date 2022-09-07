import {
    hopDictionary,
    NewPath,
    Pool,
    PoolDictionary,
    SorConfig,
} from '../types';
export declare function parseToPoolsDict(pools: Pool[]): PoolDictionary;
export declare function filterPoolsOfInterest(
    allPools: PoolDictionary,
    tokenIn: string,
    tokenOut: string,
    maxPools: number
): [PoolDictionary, hopDictionary, hopDictionary];
export declare function producePaths(
    tokenIn: string,
    tokenOut: string,
    directPools: PoolDictionary,
    hopsIn: hopDictionary,
    hopsOut: hopDictionary,
    pools: PoolDictionary
): NewPath[];
export declare function getBoostedGraph(
    tokenIn: string,
    tokenOut: string,
    poolsAllDict: PoolDictionary,
    config: SorConfig
): edgeDict;
interface edgeDict {
    [node: string]: [string, string, string][];
}
export declare function getBoostedPaths(
    tokenIn: string,
    tokenOut: string,
    poolsAllDict: PoolDictionary,
    config: SorConfig
): NewPath[];
export declare function createPath(tokens: string[], pools: Pool[]): NewPath;
export {};
