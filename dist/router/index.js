'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.RouteProposer = void 0;
const filtering_1 = require('./filtering');
class RouteProposer {
    constructor(config) {
        this.config = config;
        this.cache = {};
    }
    /**
     * Given a list of pools and a desired input/output, returns a set of possible paths to route through
     */
    getCandidatePaths(tokenIn, tokenOut, swapType, pools, swapOptions) {
        tokenIn = tokenIn.toLowerCase();
        tokenOut = tokenOut.toLowerCase();
        if (pools.length === 0) return [];
        // If token pair has been processed before that info can be reused to speed up execution
        const cache = this.cache[
            `${tokenIn}${tokenOut}${swapType}${swapOptions.timestamp}`
        ];
        // forceRefresh can be set to force fresh processing of paths/prices
        if (!swapOptions.forceRefresh && !!cache) {
            // Using pre-processed data from cache
            return cache.paths;
        }
        const poolsAllDict = filtering_1.parseToPoolsDict(pools);
        const [
            directPools,
            hopsIn,
            hopsOut,
        ] = filtering_1.filterPoolsOfInterest(
            poolsAllDict,
            tokenIn,
            tokenOut,
            swapOptions.maxPools
        );
        const pathData = filtering_1.producePaths(
            tokenIn,
            tokenOut,
            directPools,
            hopsIn,
            hopsOut,
            poolsAllDict
        );
        console.log('pathData', JSON.stringify(pathData));
        const boostedPaths = filtering_1.getBoostedPaths(
            tokenIn,
            tokenOut,
            poolsAllDict,
            this.config
        );
        console.log('boostedPaths', JSON.stringify(boostedPaths));
        return null;
    }
}
exports.RouteProposer = RouteProposer;
