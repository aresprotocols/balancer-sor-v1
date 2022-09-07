import { BaseProvider } from '@ethersproject/providers';
import { BigNumber } from './utils/bignumber';
import {
    SubGraphPool,
    SubGraphPools,
    Swap,
    PoolDictionary,
    Path,
    EffectivePrice,
    Pools,
} from './types';
import { bnum, scale } from './bmath';
import * as sor from './index';
import { RouteProposer } from './router';

export class SOR {
    provider: BaseProvider;
    gasPrice: BigNumber;
    maxPools: number;
    chainId: number;
    // avg Balancer swap cost. Can be updated manually if required.
    swapCost: BigNumber = new BigNumber('100000');
    tokenCost = {};
    onChainCache: Pools = { pools: [] };
    poolsForPairsCache = {};
    processedDataCache = {};
    isAllFetched: boolean = false;
    poolsUrl: string;
    pools;
    public readonly routeProposer: RouteProposer;

    MULTIADDR: { [chainId: number]: string } = {
        1: '0x514053acec7177e277b947b1ebb5c08ab4c4580e',
        42: '0x71c7f1086aFca7Aa1B0D4d73cfa77979d10D3210',
    };

    constructor(
        Provider: BaseProvider,
        GasPrice: BigNumber,
        MaxPools: number,
        ChainId: number,
        PoolsUrl: string
    ) {
        this.provider = Provider;
        this.gasPrice = GasPrice;
        this.maxPools = MaxPools;
        this.chainId = ChainId;
        this.poolsUrl = PoolsUrl;
        this.pools = new sor.POOLS();
        this.routeProposer = new RouteProposer({
            chainId: ChainId,
            weth: '0xA95aA7229Aaf354CA18FB8f9A5aA3e78B88a2806',
        });
    }

    /*
    Find and cache cost of token.
    */
    async setCostOutputToken(TokenOut: string, Cost: BigNumber = null) {
        TokenOut = TokenOut.toLowerCase();

        if (Cost === null) {
            // This calculates the cost to make a swap which is used as an input to SOR to allow it to make gas efficient recommendations
            const costOutputToken = await sor.getCostOutputToken(
                TokenOut,
                this.gasPrice,
                this.swapCost,
                this.provider,
                this.chainId
            );

            this.tokenCost[TokenOut] = costOutputToken;
        } else {
            this.tokenCost[TokenOut] = Cost;
        }
    }

    // Fetch allPools from URL then retrieve OnChain balances
    async fetchPools(): Promise<boolean> {
        try {
            let allPools = await this.pools.getAllPublicSwapPools(
                this.poolsUrl
            );

            let previousStringify = JSON.stringify(this.onChainCache); // Used for compare

            // this.onChainCache = await this.fetchOnChainPools(allPools);
            this.onChainCache = {
                pools: [
                    {
                        id: '0xcc90e5a51d401998761559716cc7abf38620710d',
                        swapFee: new BigNumber('1500000000000000'),
                        totalWeight: new BigNumber('19230000000000000000'),
                        tokens: [
                            {
                                address:
                                    '0xde4539989309d3c59c10a4cf8ce307bc1bacd287',
                                balance: new BigNumber(
                                    '3383809463441497970498'
                                ),
                                decimals: 18,
                                denormWeight: new BigNumber(
                                    '15385000000000000000'
                                ),
                            },
                            {
                                address:
                                    '0xa95aa7229aaf354ca18fb8f9a5aa3e78b88a2806',
                                balance: new BigNumber('455465008503958923'),
                                decimals: 18,
                                denormWeight: new BigNumber(
                                    '3845000000000000000'
                                ),
                            },
                        ],
                        tokensList: [
                            '0xde4539989309d3c59c10a4cf8ce307bc1bacd287',
                            '0xa95aa7229aaf354ca18fb8f9a5aa3e78b88a2806',
                        ],
                    },
                    {
                        id: '0x72f7c9518250c5b1a5bfdceda3a177ddc9210197',
                        swapFee: new BigNumber('1500000000000000'),
                        totalWeight: new BigNumber('23330000000000000000'),
                        tokens: [
                            {
                                address:
                                    '0xde4539989309d3c59c10a4cf8ce307bc1bacd287',
                                balance: new BigNumber('105984583700843259125'),
                                decimals: 18,
                                denormWeight: new BigNumber(
                                    '10000000000000000000'
                                ),
                            },
                            {
                                address:
                                    '0x6a46a749abda4f4bd8959b5c3be0a0aaded1738e',
                                balance: new BigNumber('875895168696607227'),
                                decimals: 18,
                                denormWeight: new BigNumber(
                                    '6665000000000000000'
                                ),
                            },
                            {
                                address:
                                    '0x01c463c45d18d4c04c14ede5a30b67b1207dd9f7',
                                balance: new BigNumber('566244580614778927'),
                                decimals: 18,
                                denormWeight: new BigNumber(
                                    '6665000000000000000'
                                ),
                            },
                        ],
                        tokensList: [
                            '0xde4539989309d3c59c10a4cf8ce307bc1bacd287',
                            '0x6a46a749abda4f4bd8959b5c3be0a0aaded1738e',
                            '0x01c463c45d18d4c04c14ede5a30b67b1207dd9f7',
                        ],
                    },
                    {
                        id: '0xf63eb82b52cdb6ea9fca0c11be8a5ff9be097230',
                        swapFee: new BigNumber('1500000000000000'),
                        totalWeight: new BigNumber('41670000000000000000'),
                        tokens: [
                            {
                                address:
                                    '0x0457ad7b48d98e3cd463b9f9d14efed56332268d',
                                balance: new BigNumber('6124795052'),
                                decimals: 6,
                                denormWeight: new BigNumber(
                                    '33335000000000000000'
                                ),
                            },
                            {
                                address:
                                    '0x40dcb20b6b0d528d1206899f467d0f0339c7889d',
                                balance: new BigNumber('913240875069993096'),
                                decimals: 18,
                                denormWeight: new BigNumber(
                                    '8335000000000000000'
                                ),
                            },
                        ],
                        tokensList: [
                            '0x40dcb20b6b0d528d1206899f467d0f0339c7889d',
                            '0x0457ad7b48d98e3cd463b9f9d14efed56332268d',
                        ],
                    },
                    {
                        id: '0x4b957c4dbda47712a6118c442b29f99e82f97ba1',
                        swapFee: new BigNumber('1500000000000000'),
                        totalWeight: new BigNumber('27775000000000000000'),
                        tokens: [
                            {
                                address:
                                    '0x0457ad7b48d98e3cd463b9f9d14efed56332268d',
                                balance: new BigNumber('4062000000'),
                                decimals: 6,
                                denormWeight: new BigNumber(
                                    '22220000000000000000'
                                ),
                            },
                            {
                                address:
                                    '0x40e5e70826ecf94325fffdea0c61aaae3eda46f6',
                                balance: new BigNumber('1749870235613294'),
                                decimals: 18,
                                denormWeight: new BigNumber(
                                    '5555000000000000000'
                                ),
                            },
                        ],
                        tokensList: [
                            '0x0457ad7b48d98e3cd463b9f9d14efed56332268d',
                            '0x40e5e70826ecf94325fffdea0c61aaae3eda46f6',
                        ],
                    },
                    {
                        id: '0x1b85027f4783e84c100cee1e27646c9aa9d70ec6',
                        swapFee: new BigNumber('1500000000000000'),
                        totalWeight: new BigNumber('27270000000000000000'),
                        tokens: [
                            {
                                address:
                                    '0x6a46a749abda4f4bd8959b5c3be0a0aaded1738e',
                                balance: new BigNumber('211118646776288478'),
                                decimals: 18,
                                denormWeight: new BigNumber(
                                    '18180000000000000000'
                                ),
                            },
                            {
                                address:
                                    '0x40dcb20b6b0d528d1206899f467d0f0339c7889d',
                                balance: new BigNumber('78048291496136620'),
                                decimals: 18,
                                denormWeight: new BigNumber(
                                    '9090000000000000000'
                                ),
                            },
                        ],
                        tokensList: [
                            '0x40dcb20b6b0d528d1206899f467d0f0339c7889d',
                            '0x6a46a749abda4f4bd8959b5c3be0a0aaded1738e',
                        ],
                    },
                    {
                        id: '0x9d0c90dae2715f281281dd5fcbce92919aa72888',
                        swapFee: new BigNumber('1500000000000000'),
                        totalWeight: new BigNumber('50000000000000000000'),
                        tokens: [
                            {
                                address:
                                    '0x0457ad7b48d98e3cd463b9f9d14efed56332268d',
                                balance: new BigNumber('892949315'),
                                decimals: 6,
                                denormWeight: new BigNumber(
                                    '40000000000000000000'
                                ),
                            },
                            {
                                address:
                                    '0xde4539989309d3c59c10a4cf8ce307bc1bacd287',
                                balance: new BigNumber('2806152238216407761'),
                                decimals: 18,
                                denormWeight: new BigNumber(
                                    '10000000000000000000'
                                ),
                            },
                        ],
                        tokensList: [
                            '0xde4539989309d3c59c10a4cf8ce307bc1bacd287',
                            '0x0457ad7b48d98e3cd463b9f9d14efed56332268d',
                        ],
                    },
                    {
                        id: '0x956a183a2779c34a9cd14c5258b7af685a5a4ebf',
                        swapFee: new BigNumber('1500000000000000'),
                        totalWeight: new BigNumber('41670000000000000000'),
                        tokens: [
                            {
                                address:
                                    '0x0457ad7b48d98e3cd463b9f9d14efed56332268d',
                                balance: new BigNumber('775916355'),
                                decimals: 6,
                                denormWeight: new BigNumber(
                                    '33335000000000000000'
                                ),
                            },
                            {
                                address:
                                    '0xa46cbb65da27fcf00344c0ae57a2b2d06770cae9',
                                balance: new BigNumber('299910464719635576'),
                                decimals: 18,
                                denormWeight: new BigNumber(
                                    '8335000000000000000'
                                ),
                            },
                        ],
                        tokensList: [
                            '0x0457ad7b48d98e3cd463b9f9d14efed56332268d',
                            '0xa46cbb65da27fcf00344c0ae57a2b2d06770cae9',
                        ],
                    },
                    {
                        id: '0xfc66dca4ccf85d9e0fea0c2e9cfed5b41a47da44',
                        swapFee: new BigNumber('1500000000000000'),
                        totalWeight: new BigNumber('30770000000000000000'),
                        tokens: [
                            {
                                address:
                                    '0xa46cbb65da27fcf00344c0ae57a2b2d06770cae9',
                                balance: new BigNumber('181486446052832816'),
                                decimals: 18,
                                denormWeight: new BigNumber(
                                    '15385000000000000000'
                                ),
                            },
                            {
                                address:
                                    '0x366f8716bc83692e98f172bd7e28363aa6013d33',
                                balance: new BigNumber('142195831663608855'),
                                decimals: 18,
                                denormWeight: new BigNumber(
                                    '15385000000000000000'
                                ),
                            },
                        ],
                        tokensList: [
                            '0xa46cbb65da27fcf00344c0ae57a2b2d06770cae9',
                            '0x366f8716bc83692e98f172bd7e28363aa6013d33',
                        ],
                    },
                    {
                        id: '0xa5fa249f1045eebf12977917bc50c285c1ab9ff9',
                        swapFee: new BigNumber('1500000000000000'),
                        totalWeight: new BigNumber('30770000000000000000'),
                        tokens: [
                            {
                                address:
                                    '0xa46cbb65da27fcf00344c0ae57a2b2d06770cae9',
                                balance: new BigNumber('181592574368706299'),
                                decimals: 18,
                                denormWeight: new BigNumber(
                                    '15385000000000000000'
                                ),
                            },
                            {
                                address:
                                    '0x01c463c45d18d4c04c14ede5a30b67b1207dd9f7',
                                balance: new BigNumber('140070000000000000'),
                                decimals: 18,
                                denormWeight: new BigNumber(
                                    '15385000000000000000'
                                ),
                            },
                        ],
                        tokensList: [
                            '0x01c463c45d18d4c04c14ede5a30b67b1207dd9f7',
                            '0xa46cbb65da27fcf00344c0ae57a2b2d06770cae9',
                        ],
                    },
                    {
                        id: '0xefffffc0ab2815cfd93b4dbc4292ad8a0e24f7a1',
                        swapFee: new BigNumber('1500000000000000'),
                        totalWeight: new BigNumber('27775000000000000000'),
                        tokens: [
                            {
                                address:
                                    '0xde4539989309d3c59c10a4cf8ce307bc1bacd287',
                                balance: new BigNumber('215784213333333333118'),
                                decimals: 18,
                                denormWeight: new BigNumber(
                                    '22220000000000000000'
                                ),
                            },
                            {
                                address:
                                    '0x01c463c45d18d4c04c14ede5a30b67b1207dd9f7',
                                balance: new BigNumber('400000000000000000'),
                                decimals: 18,
                                denormWeight: new BigNumber(
                                    '5555000000000000000'
                                ),
                            },
                        ],
                        tokensList: [
                            '0xde4539989309d3c59c10a4cf8ce307bc1bacd287',
                            '0x01c463c45d18d4c04c14ede5a30b67b1207dd9f7',
                        ],
                    },
                    {
                        id: '0x85200d1c2c68779f1a7edfc06aea40411bfd677d',
                        swapFee: new BigNumber('1500000000000000'),
                        totalWeight: new BigNumber('25000000000000000000'),
                        tokens: [
                            {
                                address:
                                    '0xa46cbb65da27fcf00344c0ae57a2b2d06770cae9',
                                balance: new BigNumber('977780000000000000'),
                                decimals: 18,
                                denormWeight: new BigNumber(
                                    '20000000000000000000'
                                ),
                            },
                            {
                                address:
                                    '0xa95aa7229aaf354ca18fb8f9a5aa3e78b88a2806',
                                balance: new BigNumber('100000000000000000'),
                                decimals: 18,
                                denormWeight: new BigNumber(
                                    '5000000000000000000'
                                ),
                            },
                        ],
                        tokensList: [
                            '0xa95aa7229aaf354ca18fb8f9a5aa3e78b88a2806',
                            '0xa46cbb65da27fcf00344c0ae57a2b2d06770cae9',
                        ],
                    },
                    {
                        id: '0x6fa649647196c64a5eaa50f5da16d2898ff92b1b',
                        swapFee: new BigNumber('1500000000000000'),
                        totalWeight: new BigNumber('50000000000000000000'),
                        tokens: [
                            {
                                address:
                                    '0xde4539989309d3c59c10a4cf8ce307bc1bacd287',
                                balance: new BigNumber('200000000000000000000'),
                                decimals: 18,
                                denormWeight: new BigNumber(
                                    '25000000000000000000'
                                ),
                            },
                            {
                                address:
                                    '0x0457ad7b48d98e3cd463b9f9d14efed56332268d',
                                balance: new BigNumber('200000000'),
                                decimals: 6,
                                denormWeight: new BigNumber(
                                    '25000000000000000000'
                                ),
                            },
                        ],
                        tokensList: [
                            '0xde4539989309d3c59c10a4cf8ce307bc1bacd287',
                            '0x0457ad7b48d98e3cd463b9f9d14efed56332268d',
                        ],
                    },
                    {
                        id: '0x46ecae49798c95ae058e4c2f4ee0811fd0592b21',
                        swapFee: new BigNumber('1500000000000000'),
                        totalWeight: new BigNumber('41670000000000000000'),
                        tokens: [
                            {
                                address:
                                    '0x0457ad7b48d98e3cd463b9f9d14efed56332268d',
                                balance: new BigNumber('895913110'),
                                decimals: 6,
                                denormWeight: new BigNumber(
                                    '33335000000000000000'
                                ),
                            },
                            {
                                address:
                                    '0x40dcb20b6b0d528d1206899f467d0f0339c7889d',
                                balance: new BigNumber('800000000000000000'),
                                decimals: 18,
                                denormWeight: new BigNumber(
                                    '8335000000000000000'
                                ),
                            },
                        ],
                        tokensList: [
                            '0x40dcb20b6b0d528d1206899f467d0f0339c7889d',
                            '0x0457ad7b48d98e3cd463b9f9d14efed56332268d',
                        ],
                    },
                ],
            };

            // If new pools are different from previous then any previous processed data is out of date so clear
            if (previousStringify !== JSON.stringify(this.onChainCache)) {
                this.processedDataCache = {};
            }

            this.isAllFetched = true;

            return true;
        } catch (err) {
            // On error clear all caches and return false so user knows to try again.
            this.isAllFetched = false;
            this.onChainCache = { pools: [] };
            this.processedDataCache = {};
            console.error(`Error: fetchPools(): ${err.message}`);
            return false;
        }
    }

    /*
    Uses multicall contact to fetch all onchain balances for pools.
    */
    async fetchOnChainPools(SubgraphPools: SubGraphPools): Promise<Pools> {
        if (SubgraphPools.pools.length === 0) {
            console.error('ERROR: No Pools To Fetch.');
            return { pools: [] };
        }

        let onChainPools: Pools = await sor.getAllPoolDataOnChain(
            SubgraphPools,
            this.MULTIADDR[this.chainId],
            this.provider
        );

        // Error with multicall
        if (!onChainPools) return { pools: [] };

        return onChainPools;
    }

    /*
    Main function to retrieve swap information.
    */
    async getSwaps(
        TokenIn: string,
        TokenOut: string,
        SwapType: string,
        SwapAmt: BigNumber
    ): Promise<[Swap[][], BigNumber, BigNumber, BigNumber]> {
        // The Subgraph returns tokens in lower case format so we must match this
        TokenIn = TokenIn.toLowerCase();
        TokenOut = TokenOut.toLowerCase();
        let swaps, total, marketSp, totalConsideringFees;

        if (this.isAllFetched) {
            // All Pools with OnChain Balances is already fetched so use that
            [
                swaps,
                total,
                marketSp,
                totalConsideringFees,
            ] = await this.processSwaps(
                TokenIn,
                TokenOut,
                SwapType,
                SwapAmt,
                this.onChainCache
            );
        } else {
            // Haven't retrieved all pools/balances so we use the pools for pairs if previously fetched
            if (!this.poolsForPairsCache[this.createKey(TokenIn, TokenOut)])
                return [[[]], bnum(0), bnum(0), bnum(0)];

            [
                swaps,
                total,
                marketSp,
                totalConsideringFees,
            ] = await this.processSwaps(
                TokenIn,
                TokenOut,
                SwapType,
                SwapAmt,
                this.poolsForPairsCache[this.createKey(TokenIn, TokenOut)],
                false
            );
        }

        return [swaps, total, marketSp, totalConsideringFees];
    }

    // Will process swap/pools data and return best swaps
    // UserProcessCache can be false to force fresh processing of paths/prices
    async processSwaps(
        TokenIn: string,
        TokenOut: string,
        SwapType: string,
        SwapAmt: BigNumber,
        OnChainPools: Pools,
        UserProcessCache: boolean = true
    ): Promise<[Swap[][], BigNumber, BigNumber, BigNumber]> {
        if (OnChainPools.pools.length === 0)
            return [[[]], bnum(0), bnum(0), bnum(0)];

        let pools: PoolDictionary,
            paths: Path[],
            epsOfInterest: EffectivePrice[],
            marketSp: BigNumber;
        // If token pair has been processed before that info can be reused to speed up execution
        let cache = this.processedDataCache[`${TokenIn}${TokenOut}${SwapType}`];

        // UserProcessCache can be false to force fresh processing of paths/prices
        if (!UserProcessCache || !cache) {
            // If not previously cached we must process all paths/prices.

            // Always use onChain info
            // Some functions alter pools list directly but we want to keep original so make a copy to work from
            let poolsList = JSON.parse(JSON.stringify(OnChainPools));

            let pathData: Path[];
            [pools, pathData] = this.processPairPools(
                TokenIn,
                TokenOut,
                poolsList
            );

            console.log('pool list:', poolsList);
            const newPath = this.routeProposer.getCandidatePaths(
                TokenIn,
                TokenOut,
                SwapType,
                poolsList.pools,
                {
                    gasPrice: this.gasPrice,
                    swapGas: new BigNumber('35000'),
                    maxPools: this.maxPools,
                    timestamp: Math.floor(Date.now() / 1000),
                    forceRefresh: false,
                }
            );

            const newPool: PoolDictionary = {};
            newPath.forEach(path => {
                path.pools.forEach(pool => {
                    newPool[pool.id] = pool;
                });
            });
            pools = newPool;

            [paths, epsOfInterest, marketSp] = this.processPathsAndPrices(
                newPath,
                pools,
                SwapType
            );

            // Update cache if used
            if (UserProcessCache)
                this.processedDataCache[`${TokenIn}${TokenOut}${SwapType}`] = {
                    pools: pools,
                    paths: paths,
                    epsOfInterest: epsOfInterest,
                    marketSp: marketSp,
                };
        } else {
            // Using pre-processed data from cache
            pools = cache.pools;
            paths = cache.paths;
            epsOfInterest = cache.epsOfInterest;
            marketSp = cache.marketSp;
        }

        let costOutputToken = this.tokenCost[TokenOut.toLowerCase()];

        if (SwapType === 'swapExactOut')
            costOutputToken = this.tokenCost[TokenIn.toLowerCase()];

        if (costOutputToken === undefined) {
            costOutputToken = new BigNumber(0);
        }

        // Returns list of swaps
        // swapExactIn - total = total amount swap will return of TokenOut
        // swapExactOut - total = total amount of TokenIn required for swap
        let swaps, total, totalConsideringFees;
        [
            swaps,
            total,
            totalConsideringFees,
        ] = sor.smartOrderRouterMultiHopEpsOfInterest(
            JSON.parse(JSON.stringify(pools)), // Need to keep original pools for cache
            paths,
            SwapType,
            SwapAmt,
            this.maxPools,
            costOutputToken,
            epsOfInterest
        );

        return [swaps, total, marketSp, totalConsideringFees];
    }

    /*
    This is used as a quicker alternative to fetching all pools information.
    A subset of pools for token pair is found by checking swaps for range of input amounts.
    The onchain balances for the subset of pools is retrieved and cached for future swap calculations (i.e. when amts change).
    */
    async fetchFilteredPairPools(
        TokenIn: string,
        TokenOut: string
    ): Promise<boolean> {
        TokenIn = TokenIn.toLowerCase();
        TokenOut = TokenOut.toLowerCase();

        try {
            // Get all IPFS pools (with balance)
            let allPoolsNonBig = await this.pools.getAllPublicSwapPools(
                this.poolsUrl
            );

            // Convert to BigNumber format
            let allPools = await this.pools.formatPoolsBigNumber(
                allPoolsNonBig
            );

            let decimalsIn = 0;
            let decimalsOut = 0;

            // Find token decimals for scaling
            for (let i = 0; i < allPools.pools.length; i++) {
                for (let j = 0; j < allPools.pools[i].tokens.length; j++) {
                    if (allPools.pools[i].tokens[j].address === TokenIn) {
                        decimalsIn = Number(
                            allPools.pools[i].tokens[j].decimals
                        );
                        if (decimalsIn > 0 && decimalsOut > 0) break;
                    } else if (
                        allPools.pools[i].tokens[j].address === TokenOut
                    ) {
                        decimalsOut = Number(
                            allPools.pools[i].tokens[j].decimals
                        );
                        if (decimalsIn > 0 && decimalsOut > 0) break;
                    }
                }

                if (decimalsIn > 0 && decimalsOut > 0) break;
            }

            // These can be shared for both swap Types
            let pools: PoolDictionary, pathData: Path[];
            [pools, pathData] = this.processPairPools(
                TokenIn,
                TokenOut,
                allPools
            );

            // Find paths and prices for swap types
            let pathsExactIn: Path[], epsExactIn: EffectivePrice[];
            [pathsExactIn, epsExactIn] = this.processPathsAndPrices(
                JSON.parse(JSON.stringify(pathData)),
                pools,
                'swapExactIn'
            );

            let pathsExactOut: Path[], epsExactOut: EffectivePrice[];
            [pathsExactOut, epsExactOut] = this.processPathsAndPrices(
                pathData,
                pools,
                'swapExactOut'
            );

            // Use previously stored value if exists else default to 0
            let costOutputToken = this.tokenCost[TokenOut.toLowerCase()];
            if (costOutputToken === undefined) {
                costOutputToken = new BigNumber(0);
            }

            let allSwaps = [];

            let range = [
                bnum('0.01'),
                bnum('0.1'),
                bnum('1'),
                bnum('10'),
                bnum('100'),
                bnum('1000'),
            ];

            // Calculate swaps for swapExactIn/Out over range and save swaps (with pools) returned
            range.forEach(amt => {
                let amtIn = scale(amt, decimalsIn);
                let amtOut = amtIn;
                if (decimalsIn !== decimalsOut)
                    amtOut = scale(amt, decimalsOut);

                let swaps, total;
                [swaps, total] = sor.smartOrderRouterMultiHopEpsOfInterest(
                    JSON.parse(JSON.stringify(pools)), // Need to keep original pools
                    pathsExactIn,
                    'swapExactIn',
                    amtIn,
                    this.maxPools,
                    costOutputToken,
                    epsExactIn
                );

                allSwaps.push(swaps);
                [swaps, total] = sor.smartOrderRouterMultiHopEpsOfInterest(
                    JSON.parse(JSON.stringify(pools)), // Need to keep original pools
                    pathsExactOut,
                    'swapExactOut',
                    amtOut,
                    this.maxPools,
                    costOutputToken,
                    epsExactOut
                );

                allSwaps.push(swaps);
            });

            // List of unique pool addresses
            let filteredPools: string[] = [];
            // get unique swap pools
            allSwaps.forEach(swap => {
                swap.forEach(seq => {
                    seq.forEach(p => {
                        if (!filteredPools.includes(p.pool))
                            filteredPools.push(p.pool);
                    });
                });
            });

            // Get list of pool infos for pools of interest
            let poolsOfInterest: SubGraphPool[] = [];
            for (let i = 0; i < allPoolsNonBig.pools.length; i++) {
                let index = filteredPools.indexOf(allPoolsNonBig.pools[i].id);
                if (index > -1) {
                    filteredPools.splice(index, 1);
                    poolsOfInterest.push(allPoolsNonBig.pools[i]);
                    if (filteredPools.length === 0) break;
                }
            }

            let onChainPools: Pools = { pools: [] };
            if (poolsOfInterest.length !== 0) {
                // Retrieves onchain balances for pools list
                onChainPools = await sor.getAllPoolDataOnChain(
                    { pools: poolsOfInterest },
                    this.MULTIADDR[this.chainId],
                    this.provider
                );
            }

            // Add to cache for future use
            this.poolsForPairsCache[
                this.createKey(TokenIn, TokenOut)
            ] = onChainPools;

            return true;
        } catch (err) {
            console.error(`Error: fetchFilteredPairPools(): ${err.message}`);
            // Add to cache for future use
            this.poolsForPairsCache[this.createKey(TokenIn, TokenOut)] = {
                pools: [],
            };
            return false;
        }
    }

    // Finds pools and paths for token pairs. Independent of swap type.
    processPairPools(
        TokenIn: string,
        TokenOut: string,
        poolsList
    ): [PoolDictionary, Path[]] {
        // Retrieves intermediate pools along with tokens that are contained in these.
        let directPools: PoolDictionary,
            hopTokens: string[],
            poolsTokenIn: PoolDictionary,
            poolsTokenOut: PoolDictionary;
        [directPools, hopTokens, poolsTokenIn, poolsTokenOut] = sor.filterPools(
            poolsList.pools,
            TokenIn,
            TokenOut,
            this.maxPools
        );

        // Sort intermediate pools by order of liquidity
        let mostLiquidPoolsFirstHop, mostLiquidPoolsSecondHop;
        [
            mostLiquidPoolsFirstHop,
            mostLiquidPoolsSecondHop,
        ] = sor.sortPoolsMostLiquid(
            TokenIn,
            TokenOut,
            hopTokens,
            poolsTokenIn,
            poolsTokenOut
        );

        // Finds the possible paths to make the swap
        let pathData: Path[];
        let pools: PoolDictionary;
        [pools, pathData] = sor.parsePoolData(
            directPools,
            TokenIn,
            TokenOut,
            mostLiquidPoolsFirstHop,
            mostLiquidPoolsSecondHop,
            hopTokens
        );

        return [pools, pathData];
    }

    // SwapType dependent - calculates paths prices/amounts
    processPathsAndPrices(
        PathArray: Path[],
        PoolsDict: PoolDictionary,
        SwapType: string
    ): [Path[], EffectivePrice[], BigNumber] {
        console.log('PoolsDict', PoolsDict);
        const paths: Path[] = sor.processPaths(PathArray, PoolsDict, SwapType);

        const bestSpotPrice = sor.getMarketSpotPrice(paths);

        const eps: EffectivePrice[] = sor.processEpsOfInterestMultiHop(
            paths,
            SwapType,
            this.maxPools
        );

        return [paths, eps, bestSpotPrice];
    }

    // Used for cache ids
    private createKey(Token1: string, Token2: string): string {
        return Token1 < Token2 ? `${Token1}${Token2}` : `${Token2}${Token1}`;
    }

    // Check if pair data already fetched (using fetchFilteredPairPools)
    hasDataForPair(TokenIn: string, TokenOut: string): boolean {
        TokenIn = TokenIn.toLowerCase();
        TokenOut = TokenOut.toLowerCase();

        if (
            this.isAllFetched ||
            this.poolsForPairsCache[this.createKey(TokenIn, TokenOut)]
        )
            return true;
        else return false;
    }
}
