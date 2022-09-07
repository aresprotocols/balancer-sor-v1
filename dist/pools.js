'use strict';
var __createBinding =
    (this && this.__createBinding) ||
    (Object.create
        ? function(o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              Object.defineProperty(o, k2, {
                  enumerable: true,
                  get: function() {
                      return m[k];
                  },
              });
          }
        : function(o, m, k, k2) {
              if (k2 === undefined) k2 = k;
              o[k2] = m[k];
          });
var __setModuleDefault =
    (this && this.__setModuleDefault) ||
    (Object.create
        ? function(o, v) {
              Object.defineProperty(o, 'default', {
                  enumerable: true,
                  value: v,
              });
          }
        : function(o, v) {
              o['default'] = v;
          });
var __importStar =
    (this && this.__importStar) ||
    function(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== 'default' && Object.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    };
var __awaiter =
    (this && this.__awaiter) ||
    function(thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function(resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function(resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator['throw'](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
            }
            step(
                (generator = generator.apply(thisArg, _arguments || [])).next()
            );
        });
    };
Object.defineProperty(exports, '__esModule', { value: true });
exports.POOLS = void 0;
const bmath = __importStar(require('./bmath'));
class POOLS {
    getAllPublicSwapPools(URL) {
        // const result = await fetch(URL);
        // const allPools = result.json();
        const allPools = [
            {
                id: '0xcc90e5a51d401998761559716cc7abf38620710d',
                publicSwap: true,
                finalized: false,
                crp: true,
                rights: [
                    'canPauseSwapping',
                    'canChangeSwapFee',
                    'canChangeWeights',
                    'canAddRemoveTokens',
                    'canChangeCap',
                ],
                swapFee: '0.0015',
                totalWeight: '19.23',
                totalShares: '100',
                totalSwapVolume: '815.2571657733262790006805737309975',
                liquidity: '279092.3216285327947573452916263712',
                tokensList: [
                    '0xde4539989309d3c59c10a4cf8ce307bc1bacd287',
                    '0xa95aa7229aaf354ca18fb8f9a5aa3e78b88a2806',
                ],
                swapsCount: '6',
                tokens: [
                    {
                        id:
                            '0xcc90e5a51d401998761559716cc7abf38620710d-0xde4539989309d3c59c10a4cf8ce307bc1bacd287',
                        address: '0xde4539989309d3c59c10a4cf8ce307bc1bacd287',
                        balance: '3387.527573720500165585',
                        decimals: 18,
                        symbol: 'DAI',
                        denormWeight: '15.385',
                    },
                    {
                        id:
                            '0xcc90e5a51d401998761559716cc7abf38620710d-0xa95aa7229aaf354ca18fb8f9a5aa3e78b88a2806',
                        address: '0xa95aa7229aaf354ca18fb8f9a5aa3e78b88a2806',
                        balance: '0.453465008503958923',
                        decimals: 18,
                        symbol: 'WETH',
                        denormWeight: '3.845',
                    },
                ],
            },
            {
                id: '0xf63eb82b52cdb6ea9fca0c11be8a5ff9be097230',
                publicSwap: true,
                finalized: false,
                crp: true,
                rights: [
                    'canPauseSwapping',
                    'canChangeSwapFee',
                    'canChangeWeights',
                    'canAddRemoveTokens',
                    'canWhitelistLPs',
                    'canChangeCap',
                ],
                swapFee: '0.0015',
                totalWeight: '41.67',
                totalShares: '100',
                totalSwapVolume: '167.8717342540563122077617667195604',
                liquidity: '7656.222918314084295785210739463026',
                tokensList: [
                    '0x40dcb20b6b0d528d1206899f467d0f0339c7889d',
                    '0x0457ad7b48d98e3cd463b9f9d14efed56332268d',
                ],
                swapsCount: '16',
                tokens: [
                    {
                        id:
                            '0xf63eb82b52cdb6ea9fca0c11be8a5ff9be097230-0x0457ad7b48d98e3cd463b9f9d14efed56332268d',
                        address: '0x0457ad7b48d98e3cd463b9f9d14efed56332268d',
                        balance: '6124.7946',
                        decimals: 6,
                        symbol: 'USDC',
                        denormWeight: '33.335',
                    },
                    {
                        id:
                            '0xf63eb82b52cdb6ea9fca0c11be8a5ff9be097230-0x40dcb20b6b0d528d1206899f467d0f0339c7889d',
                        address: '0x40dcb20b6b0d528d1206899f467d0f0339c7889d',
                        balance: '0.913241144016097339',
                        decimals: 18,
                        symbol: 'MBMU',
                        denormWeight: '8.335',
                    },
                ],
            },
            {
                id: '0x4b957c4dbda47712a6118c442b29f99e82f97ba1',
                publicSwap: true,
                finalized: false,
                crp: true,
                rights: [
                    'canPauseSwapping',
                    'canChangeSwapFee',
                    'canChangeWeights',
                    'canAddRemoveTokens',
                    'canWhitelistLPs',
                    'canChangeCap',
                ],
                swapFee: '0.0015',
                totalWeight: '27.775',
                totalShares: '100',
                totalSwapVolume: '5513.637566906213322218893163980559',
                liquidity: '5077.499999999999999999999999999999',
                tokensList: [
                    '0x0457ad7b48d98e3cd463b9f9d14efed56332268d',
                    '0x40e5e70826ecf94325fffdea0c61aaae3eda46f6',
                ],
                swapsCount: '14',
                tokens: [
                    {
                        id:
                            '0x4b957c4dbda47712a6118c442b29f99e82f97ba1-0x0457ad7b48d98e3cd463b9f9d14efed56332268d',
                        address: '0x0457ad7b48d98e3cd463b9f9d14efed56332268d',
                        balance: '4062',
                        decimals: 6,
                        symbol: 'USDC',
                        denormWeight: '22.22',
                    },
                    {
                        id:
                            '0x4b957c4dbda47712a6118c442b29f99e82f97ba1-0x40e5e70826ecf94325fffdea0c61aaae3eda46f6',
                        address: '0x40e5e70826ecf94325fffdea0c61aaae3eda46f6',
                        balance: '0.001749870235613294',
                        decimals: 18,
                        symbol: 'MFR',
                        denormWeight: '5.555',
                    },
                ],
            },
            {
                id: '0x9d0c90dae2715f281281dd5fcbce92919aa72888',
                publicSwap: true,
                finalized: false,
                crp: true,
                rights: [
                    'canPauseSwapping',
                    'canChangeSwapFee',
                    'canChangeWeights',
                    'canWhitelistLPs',
                    'canChangeCap',
                ],
                swapFee: '0.0015',
                totalWeight: '50',
                totalShares: '100',
                totalSwapVolume: '910.2606886935718867924075863825259',
                liquidity: '1116.18720875',
                tokensList: [
                    '0xde4539989309d3c59c10a4cf8ce307bc1bacd287',
                    '0x0457ad7b48d98e3cd463b9f9d14efed56332268d',
                ],
                swapsCount: '35',
                tokens: [
                    {
                        id:
                            '0x9d0c90dae2715f281281dd5fcbce92919aa72888-0x0457ad7b48d98e3cd463b9f9d14efed56332268d',
                        address: '0x0457ad7b48d98e3cd463b9f9d14efed56332268d',
                        balance: '892.949767',
                        decimals: 6,
                        symbol: 'USDC',
                        denormWeight: '40',
                    },
                    {
                        id:
                            '0x9d0c90dae2715f281281dd5fcbce92919aa72888-0xde4539989309d3c59c10a4cf8ce307bc1bacd287',
                        address: '0xde4539989309d3c59c10a4cf8ce307bc1bacd287',
                        balance: '2.806146545073247472',
                        decimals: 18,
                        symbol: 'DAI',
                        denormWeight: '10',
                    },
                ],
            },
            {
                id: '0x956a183a2779c34a9cd14c5258b7af685a5a4ebf',
                publicSwap: true,
                finalized: false,
                crp: true,
                rights: [
                    'canPauseSwapping',
                    'canChangeSwapFee',
                    'canChangeWeights',
                    'canAddRemoveTokens',
                    'canChangeCap',
                ],
                swapFee: '0.0015',
                totalWeight: '41.67',
                totalShares: '149.9583333333333331',
                totalSwapVolume: '76.61856608393733281595609684856146',
                liquidity: '969.9245391585420728963551822408879',
                tokensList: [
                    '0x0457ad7b48d98e3cd463b9f9d14efed56332268d',
                    '0xa46cbb65da27fcf00344c0ae57a2b2d06770cae9',
                ],
                swapsCount: '13',
                tokens: [
                    {
                        id:
                            '0x956a183a2779c34a9cd14c5258b7af685a5a4ebf-0x0457ad7b48d98e3cd463b9f9d14efed56332268d',
                        address: '0x0457ad7b48d98e3cd463b9f9d14efed56332268d',
                        balance: '775.916355',
                        decimals: 6,
                        symbol: 'USDC',
                        denormWeight: '33.335',
                    },
                    {
                        id:
                            '0x956a183a2779c34a9cd14c5258b7af685a5a4ebf-0xa46cbb65da27fcf00344c0ae57a2b2d06770cae9',
                        address: '0xa46cbb65da27fcf00344c0ae57a2b2d06770cae9',
                        balance: '0.299910464719635576',
                        decimals: 18,
                        symbol: 'AIFA',
                        denormWeight: '8.335',
                    },
                ],
            },
            {
                id: '0x72f7c9518250c5b1a5bfdceda3a177ddc9210197',
                publicSwap: true,
                finalized: false,
                crp: true,
                rights: [
                    'canPauseSwapping',
                    'canChangeSwapFee',
                    'canChangeWeights',
                    'canAddRemoveTokens',
                    'canWhitelistLPs',
                    'canChangeCap',
                ],
                swapFee: '0.0015',
                totalWeight: '23.33',
                totalShares: '100',
                totalSwapVolume: '29.11196963297888735021228441733532',
                liquidity: '278.6977355397357258977820741260304',
                tokensList: [
                    '0xde4539989309d3c59c10a4cf8ce307bc1bacd287',
                    '0x6a46a749abda4f4bd8959b5c3be0a0aaded1738e',
                    '0x01c463c45d18d4c04c14ede5a30b67b1207dd9f7',
                ],
                swapsCount: '24',
                tokens: [
                    {
                        id:
                            '0x72f7c9518250c5b1a5bfdceda3a177ddc9210197-0xde4539989309d3c59c10a4cf8ce307bc1bacd287',
                        address: '0xde4539989309d3c59c10a4cf8ce307bc1bacd287',
                        balance: '102.266479114984224327',
                        decimals: 18,
                        symbol: 'DAI',
                        denormWeight: '10',
                    },
                    {
                        id:
                            '0x72f7c9518250c5b1a5bfdceda3a177ddc9210197-0x6a46a749abda4f4bd8959b5c3be0a0aaded1738e',
                        address: '0x6a46a749abda4f4bd8959b5c3be0a0aaded1738e',
                        balance: '0.924032920526605563',
                        decimals: 18,
                        symbol: 'SUS',
                        denormWeight: '6.665',
                    },
                    {
                        id:
                            '0x72f7c9518250c5b1a5bfdceda3a177ddc9210197-0x01c463c45d18d4c04c14ede5a30b67b1207dd9f7',
                        address: '0x01c463c45d18d4c04c14ede5a30b67b1207dd9f7',
                        balance: '0.566244580614778927',
                        decimals: 18,
                        symbol: 'MOAR',
                        denormWeight: '6.665',
                    },
                ],
            },
            {
                id: '0xfc66dca4ccf85d9e0fea0c2e9cfed5b41a47da44',
                publicSwap: true,
                finalized: false,
                crp: true,
                rights: [
                    'canPauseSwapping',
                    'canChangeSwapFee',
                    'canChangeWeights',
                    'canAddRemoveTokens',
                    'canChangeCap',
                ],
                swapFee: '0.0015',
                totalWeight: '30.77',
                totalShares: '100',
                totalSwapVolume: '6.333678815320722782537558546941628',
                liquidity: '234.9272802087926878359354502370788',
                tokensList: [
                    '0xa46cbb65da27fcf00344c0ae57a2b2d06770cae9',
                    '0x366f8716bc83692e98f172bd7e28363aa6013d33',
                ],
                swapsCount: '7',
                tokens: [
                    {
                        id:
                            '0xfc66dca4ccf85d9e0fea0c2e9cfed5b41a47da44-0xa46cbb65da27fcf00344c0ae57a2b2d06770cae9',
                        address: '0xa46cbb65da27fcf00344c0ae57a2b2d06770cae9',
                        balance: '0.181486446052832816',
                        decimals: 18,
                        symbol: 'AIFA',
                        denormWeight: '15.385',
                    },
                    {
                        id:
                            '0xfc66dca4ccf85d9e0fea0c2e9cfed5b41a47da44-0x366f8716bc83692e98f172bd7e28363aa6013d33',
                        address: '0x366f8716bc83692e98f172bd7e28363aa6013d33',
                        balance: '0.142195831663608855',
                        decimals: 18,
                        symbol: 'TCDG',
                        denormWeight: '15.385',
                    },
                ],
            },
            {
                id: '0xa5fa249f1045eebf12977917bc50c285c1ab9ff9',
                publicSwap: true,
                finalized: false,
                crp: true,
                rights: [
                    'canPauseSwapping',
                    'canChangeSwapFee',
                    'canChangeWeights',
                    'canAddRemoveTokens',
                    'canChangeCap',
                ],
                swapFee: '0.0015',
                totalWeight: '30.77',
                totalShares: '100',
                totalSwapVolume: '11.91385509292127221117999576763782',
                liquidity: '39.39035735185328188796377253199523',
                tokensList: [
                    '0x01c463c45d18d4c04c14ede5a30b67b1207dd9f7',
                    '0xa46cbb65da27fcf00344c0ae57a2b2d06770cae9',
                ],
                swapsCount: '11',
                tokens: [
                    {
                        id:
                            '0xa5fa249f1045eebf12977917bc50c285c1ab9ff9-0xa46cbb65da27fcf00344c0ae57a2b2d06770cae9',
                        address: '0xa46cbb65da27fcf00344c0ae57a2b2d06770cae9',
                        balance: '0.181592574368706299',
                        decimals: 18,
                        symbol: 'AIFA',
                        denormWeight: '15.385',
                    },
                    {
                        id:
                            '0xa5fa249f1045eebf12977917bc50c285c1ab9ff9-0x01c463c45d18d4c04c14ede5a30b67b1207dd9f7',
                        address: '0x01c463c45d18d4c04c14ede5a30b67b1207dd9f7',
                        balance: '0.14007',
                        decimals: 18,
                        symbol: 'MOAR',
                        denormWeight: '15.385',
                    },
                ],
            },
            {
                id: '0xefffffc0ab2815cfd93b4dbc4292ad8a0e24f7a1',
                publicSwap: true,
                finalized: false,
                crp: true,
                rights: [
                    'canPauseSwapping',
                    'canChangeSwapFee',
                    'canChangeWeights',
                    'canAddRemoveTokens',
                    'canChangeCap',
                ],
                swapFee: '0.0015',
                totalWeight: '27.775',
                totalShares: '133.3333333333333332',
                totalSwapVolume: '0',
                liquidity: '0',
                tokensList: [
                    '0xde4539989309d3c59c10a4cf8ce307bc1bacd287',
                    '0x01c463c45d18d4c04c14ede5a30b67b1207dd9f7',
                ],
                swapsCount: '0',
                tokens: [
                    {
                        id:
                            '0xefffffc0ab2815cfd93b4dbc4292ad8a0e24f7a1-0xde4539989309d3c59c10a4cf8ce307bc1bacd287',
                        address: '0xde4539989309d3c59c10a4cf8ce307bc1bacd287',
                        balance: '215.784213333333333118',
                        decimals: 18,
                        symbol: 'DAI',
                        denormWeight: '22.22',
                    },
                    {
                        id:
                            '0xefffffc0ab2815cfd93b4dbc4292ad8a0e24f7a1-0x01c463c45d18d4c04c14ede5a30b67b1207dd9f7',
                        address: '0x01c463c45d18d4c04c14ede5a30b67b1207dd9f7',
                        balance: '0.4',
                        decimals: 18,
                        symbol: 'MOAR',
                        denormWeight: '5.555',
                    },
                ],
            },
            {
                id: '0x85200d1c2c68779f1a7edfc06aea40411bfd677d',
                publicSwap: true,
                finalized: false,
                crp: true,
                rights: [
                    'canPauseSwapping',
                    'canChangeSwapFee',
                    'canChangeWeights',
                    'canAddRemoveTokens',
                    'canChangeCap',
                ],
                swapFee: '0.0015',
                totalWeight: '25',
                totalShares: '100',
                totalSwapVolume: '0',
                liquidity: '0',
                tokensList: [
                    '0xa95aa7229aaf354ca18fb8f9a5aa3e78b88a2806',
                    '0xa46cbb65da27fcf00344c0ae57a2b2d06770cae9',
                ],
                swapsCount: '0',
                tokens: [
                    {
                        id:
                            '0x85200d1c2c68779f1a7edfc06aea40411bfd677d-0xa46cbb65da27fcf00344c0ae57a2b2d06770cae9',
                        address: '0xa46cbb65da27fcf00344c0ae57a2b2d06770cae9',
                        balance: '0.97778',
                        decimals: 18,
                        symbol: 'AIFA',
                        denormWeight: '20',
                    },
                    {
                        id:
                            '0x85200d1c2c68779f1a7edfc06aea40411bfd677d-0xa95aa7229aaf354ca18fb8f9a5aa3e78b88a2806',
                        address: '0xa95aa7229aaf354ca18fb8f9a5aa3e78b88a2806',
                        balance: '0.1',
                        decimals: 18,
                        symbol: 'WETH',
                        denormWeight: '5',
                    },
                ],
            },
            {
                id: '0x46ecae49798c95ae058e4c2f4ee0811fd0592b21',
                publicSwap: true,
                finalized: false,
                crp: true,
                rights: [
                    'canPauseSwapping',
                    'canChangeSwapFee',
                    'canChangeWeights',
                    'canAddRemoveTokens',
                    'canChangeCap',
                ],
                swapFee: '0.0015',
                totalWeight: '41.67',
                totalShares: '100',
                totalSwapVolume: '0',
                liquidity: '0',
                tokensList: [
                    '0x40dcb20b6b0d528d1206899f467d0f0339c7889d',
                    '0x0457ad7b48d98e3cd463b9f9d14efed56332268d',
                ],
                swapsCount: '0',
                tokens: [
                    {
                        id:
                            '0x46ecae49798c95ae058e4c2f4ee0811fd0592b21-0x0457ad7b48d98e3cd463b9f9d14efed56332268d',
                        address: '0x0457ad7b48d98e3cd463b9f9d14efed56332268d',
                        balance: '895.91311',
                        decimals: 6,
                        symbol: 'USDC',
                        denormWeight: '33.335',
                    },
                    {
                        id:
                            '0x46ecae49798c95ae058e4c2f4ee0811fd0592b21-0x40dcb20b6b0d528d1206899f467d0f0339c7889d',
                        address: '0x40dcb20b6b0d528d1206899f467d0f0339c7889d',
                        balance: '0.8',
                        decimals: 18,
                        symbol: 'MBMU',
                        denormWeight: '8.335',
                    },
                ],
            },
            {
                id: '0x1b85027f4783e84c100cee1e27646c9aa9d70ec6',
                publicSwap: true,
                finalized: false,
                crp: true,
                rights: [
                    'canPauseSwapping',
                    'canChangeSwapFee',
                    'canChangeWeights',
                    'canAddRemoveTokens',
                    'canChangeCap',
                ],
                swapFee: '0.0015',
                totalWeight: '27.27',
                totalShares: '100',
                totalSwapVolume: '0',
                liquidity: '0',
                tokensList: [
                    '0x40dcb20b6b0d528d1206899f467d0f0339c7889d',
                    '0x6a46a749abda4f4bd8959b5c3be0a0aaded1738e',
                ],
                swapsCount: '0',
                tokens: [
                    {
                        id:
                            '0x1b85027f4783e84c100cee1e27646c9aa9d70ec6-0x6a46a749abda4f4bd8959b5c3be0a0aaded1738e',
                        address: '0x6a46a749abda4f4bd8959b5c3be0a0aaded1738e',
                        balance: '0.18648',
                        decimals: 18,
                        symbol: 'SUS',
                        denormWeight: '18.18',
                    },
                    {
                        id:
                            '0x1b85027f4783e84c100cee1e27646c9aa9d70ec6-0x40dcb20b6b0d528d1206899f467d0f0339c7889d',
                        address: '0x40dcb20b6b0d528d1206899f467d0f0339c7889d',
                        balance: '0.1',
                        decimals: 18,
                        symbol: 'MBMU',
                        denormWeight: '9.09',
                    },
                ],
            },
        ];
        return { pools: allPools };
    }
    formatPoolsBigNumber(pools) {
        return __awaiter(this, void 0, void 0, function*() {
            let onChainPools = { pools: [] };
            for (let i = 0; i < pools.pools.length; i++) {
                let tokens = [];
                let p = {
                    id: pools.pools[i].id,
                    swapFee: bmath.scale(
                        bmath.bnum(pools.pools[i].swapFee),
                        18
                    ),
                    totalWeight: bmath.scale(
                        bmath.bnum(pools.pools[i].totalWeight),
                        18
                    ),
                    tokens: tokens,
                    tokensList: pools.pools[i].tokensList,
                };
                pools.pools[i].tokens.forEach(token => {
                    let decimals = Number(token.decimals);
                    p.tokens.push({
                        address: token.address,
                        balance: bmath.scale(
                            bmath.bnum(token.balance),
                            decimals
                        ),
                        decimals: decimals,
                        denormWeight: bmath.scale(
                            bmath.bnum(token.denormWeight),
                            18
                        ),
                    });
                });
                onChainPools.pools.push(p);
            }
            return onChainPools;
        });
    }
}
exports.POOLS = POOLS;
