import { SOR } from '../../src';
import { JsonRpcProvider } from '@ethersproject/providers';
import BigNumber from 'bignumber.js';

const getPools = async () => {
    return [
        {
            id: '0xcc90e5a51d401998761559716cc7abf38620710d',
            publicSwap: true,
            finalized: false,
            crp: true,
            cap: '0',
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
            totalSwapVolume: '963.3539385339833014883354422844615',
            liquidity: '336653.0711133211744599332022024091',
            tokensList: [
                '0xde4539989309d3c59c10a4cf8ce307bc1bacd287',
                '0xa95aa7229aaf354ca18fb8f9a5aa3e78b88a2806',
            ],
            swapsCount: '8',
            tokens: [
                {
                    id:
                        '0xcc90e5a51d401998761559716cc7abf38620710d-0xde4539989309d3c59c10a4cf8ce307bc1bacd287',
                    address: '0xde4539989309d3c59c10a4cf8ce307bc1bacd287',
                    balance: '3385.665962854683945355',
                    decimals: 18,
                    symbol: 'DAI',
                    denormWeight: '15.385',
                    color: '#422940',
                    weightPercent: '80.0',
                },
                {
                    id:
                        '0xcc90e5a51d401998761559716cc7abf38620710d-0xa95aa7229aaf354ca18fb8f9a5aa3e78b88a2806',
                    address: '0xa95aa7229aaf354ca18fb8f9a5aa3e78b88a2806',
                    balance: '0.454465008503958923',
                    decimals: 18,
                    symbol: 'WETH',
                    denormWeight: '3.845',
                    color: '#828384',
                    weightPercent: '20.0',
                },
            ],
            swaps: [],
            poolLiquidity: 336674.1,
        },
        {
            id: '0x72f7c9518250c5b1a5bfdceda3a177ddc9210197',
            publicSwap: true,
            finalized: false,
            crp: true,
            cap: '0',
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
            totalSwapVolume: '180.3606015616540389684263865454',
            liquidity: '19325.88125798652969292047071279296',
            tokensList: [
                '0xde4539989309d3c59c10a4cf8ce307bc1bacd287',
                '0x6a46a749abda4f4bd8959b5c3be0a0aaded1738e',
                '0x01c463c45d18d4c04c14ede5a30b67b1207dd9f7',
            ],
            swapsCount: '25',
            tokens: [
                {
                    id:
                        '0x72f7c9518250c5b1a5bfdceda3a177ddc9210197-0xde4539989309d3c59c10a4cf8ce307bc1bacd287',
                    address: '0xde4539989309d3c59c10a4cf8ce307bc1bacd287',
                    balance: '104.128084287657284268',
                    decimals: 18,
                    symbol: 'DAI',
                    denormWeight: '10',
                    color: '#422940',
                    weightPercent: '42.9',
                },
                {
                    id:
                        '0x72f7c9518250c5b1a5bfdceda3a177ddc9210197-0x6a46a749abda4f4bd8959b5c3be0a0aaded1738e',
                    address: '0x6a46a749abda4f4bd8959b5c3be0a0aaded1738e',
                    balance: '0.899394273750317085',
                    decimals: 18,
                    symbol: 'SUS',
                    denormWeight: '6.665',
                    color: '#8d4f8d',
                    weightPercent: '28.6',
                },
                {
                    id:
                        '0x72f7c9518250c5b1a5bfdceda3a177ddc9210197-0x01c463c45d18d4c04c14ede5a30b67b1207dd9f7',
                    address: '0x01c463c45d18d4c04c14ede5a30b67b1207dd9f7',
                    balance: '0.566244580614778927',
                    decimals: 18,
                    symbol: 'MOAR',
                    denormWeight: '6.665',
                    color: '#6ddbfd',
                    weightPercent: '28.6',
                },
            ],
            swaps: [],
            poolLiquidity: 19306.55,
        },
        {
            id: '0xf63eb82b52cdb6ea9fca0c11be8a5ff9be097230',
            publicSwap: true,
            finalized: false,
            crp: true,
            cap: '0',
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
            totalSwapVolume: '167.8721852541393974980439427482665',
            liquidity: '7656.223483331033448327583620818957',
            tokensList: [
                '0x40dcb20b6b0d528d1206899f467d0f0339c7889d',
                '0x0457ad7b48d98e3cd463b9f9d14efed56332268d',
            ],
            swapsCount: '17',
            tokens: [
                {
                    id:
                        '0xf63eb82b52cdb6ea9fca0c11be8a5ff9be097230-0x0457ad7b48d98e3cd463b9f9d14efed56332268d',
                    address: '0x0457ad7b48d98e3cd463b9f9d14efed56332268d',
                    balance: '6124.795052',
                    decimals: 6,
                    symbol: 'USDC',
                    denormWeight: '33.335',
                    color: '#5eb8aa',
                    weightPercent: '80.0',
                },
                {
                    id:
                        '0xf63eb82b52cdb6ea9fca0c11be8a5ff9be097230-0x40dcb20b6b0d528d1206899f467d0f0339c7889d',
                    address: '0x40dcb20b6b0d528d1206899f467d0f0339c7889d',
                    balance: '0.913240875069993096',
                    decimals: 18,
                    symbol: 'MBMU',
                    denormWeight: '8.335',
                    color: '#8d4f8d',
                    weightPercent: '20.0',
                },
            ],
            swaps: [],
            poolLiquidity: 7656.22,
        },
        {
            id: '0x4b957c4dbda47712a6118c442b29f99e82f97ba1',
            publicSwap: true,
            finalized: false,
            crp: true,
            cap: '0',
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
                    color: '#5eb8aa',
                    weightPercent: '80.0',
                },
                {
                    id:
                        '0x4b957c4dbda47712a6118c442b29f99e82f97ba1-0x40e5e70826ecf94325fffdea0c61aaae3eda46f6',
                    address: '0x40e5e70826ecf94325fffdea0c61aaae3eda46f6',
                    balance: '0.001749870235613294',
                    decimals: 18,
                    symbol: 'MFR',
                    denormWeight: '5.555',
                    color: '#8d4f8d',
                    weightPercent: '20.0',
                },
            ],
            swaps: [],
            poolLiquidity: 5077.5,
        },
        {
            id: '0x1b85027f4783e84c100cee1e27646c9aa9d70ec6',
            publicSwap: true,
            finalized: false,
            crp: true,
            cap: '0',
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
            totalSwapVolume: '36.81116237312224916818771627432249',
            liquidity: '1943.982970502058995672935463300477',
            tokensList: [
                '0x40dcb20b6b0d528d1206899f467d0f0339c7889d',
                '0x6a46a749abda4f4bd8959b5c3be0a0aaded1738e',
            ],
            swapsCount: '1',
            tokens: [
                {
                    id:
                        '0x1b85027f4783e84c100cee1e27646c9aa9d70ec6-0x6a46a749abda4f4bd8959b5c3be0a0aaded1738e',
                    address: '0x6a46a749abda4f4bd8959b5c3be0a0aaded1738e',
                    balance: '0.211118646776288478',
                    decimals: 18,
                    symbol: 'SUS',
                    denormWeight: '18.18',
                    color: '#7ada6a',
                    weightPercent: '66.7',
                },
                {
                    id:
                        '0x1b85027f4783e84c100cee1e27646c9aa9d70ec6-0x40dcb20b6b0d528d1206899f467d0f0339c7889d',
                    address: '0x40dcb20b6b0d528d1206899f467d0f0339c7889d',
                    balance: '0.07804829149613662',
                    decimals: 18,
                    symbol: 'MBMU',
                    denormWeight: '9.09',
                    color: '#8d4f8d',
                    weightPercent: '33.3',
                },
            ],
            swaps: [],
            poolLiquidity: 1426.87,
        },
        {
            id: '0x9d0c90dae2715f281281dd5fcbce92919aa72888',
            publicSwap: true,
            finalized: false,
            crp: true,
            cap: '0',
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
            totalSwapVolume: '910.2611406935718867924075863825259',
            liquidity: '1116.18664375',
            tokensList: [
                '0xde4539989309d3c59c10a4cf8ce307bc1bacd287',
                '0x0457ad7b48d98e3cd463b9f9d14efed56332268d',
            ],
            swapsCount: '36',
            tokens: [
                {
                    id:
                        '0x9d0c90dae2715f281281dd5fcbce92919aa72888-0x0457ad7b48d98e3cd463b9f9d14efed56332268d',
                    address: '0x0457ad7b48d98e3cd463b9f9d14efed56332268d',
                    balance: '892.949315',
                    decimals: 6,
                    symbol: 'USDC',
                    denormWeight: '40',
                    color: '#5eb8aa',
                    weightPercent: '80.0',
                },
                {
                    id:
                        '0x9d0c90dae2715f281281dd5fcbce92919aa72888-0xde4539989309d3c59c10a4cf8ce307bc1bacd287',
                    address: '0xde4539989309d3c59c10a4cf8ce307bc1bacd287',
                    balance: '2.806152238216407761',
                    decimals: 18,
                    symbol: 'DAI',
                    denormWeight: '10',
                    color: '#422940',
                    weightPercent: '20.0',
                },
            ],
            swaps: [],
            poolLiquidity: 1116.19,
        },
        {
            id: '0x956a183a2779c34a9cd14c5258b7af685a5a4ebf',
            publicSwap: true,
            finalized: false,
            crp: true,
            cap: '0',
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
                    color: '#5eb8aa',
                    weightPercent: '80.0',
                },
                {
                    id:
                        '0x956a183a2779c34a9cd14c5258b7af685a5a4ebf-0xa46cbb65da27fcf00344c0ae57a2b2d06770cae9',
                    address: '0xa46cbb65da27fcf00344c0ae57a2b2d06770cae9',
                    balance: '0.299910464719635576',
                    decimals: 18,
                    symbol: 'AIFA',
                    denormWeight: '8.335',
                    color: '#8d4f8d',
                    weightPercent: '20.0',
                },
            ],
            swaps: [],
            poolLiquidity: 969.92,
        },
        {
            id: '0xfc66dca4ccf85d9e0fea0c2e9cfed5b41a47da44',
            publicSwap: true,
            finalized: false,
            crp: true,
            cap: '0',
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
                    color: '#7ada6a',
                    weightPercent: '50.0',
                },
                {
                    id:
                        '0xfc66dca4ccf85d9e0fea0c2e9cfed5b41a47da44-0x366f8716bc83692e98f172bd7e28363aa6013d33',
                    address: '0x366f8716bc83692e98f172bd7e28363aa6013d33',
                    balance: '0.142195831663608855',
                    decimals: 18,
                    symbol: 'TCDG',
                    denormWeight: '15.385',
                    color: '#8d4f8d',
                    weightPercent: '50.0',
                },
            ],
            swaps: [],
            poolLiquidity: 234.8,
        },
        {
            id: '0xa5fa249f1045eebf12977917bc50c285c1ab9ff9',
            publicSwap: true,
            finalized: false,
            crp: true,
            cap: '0',
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
                    color: '#7ada6a',
                    weightPercent: '50.0',
                },
                {
                    id:
                        '0xa5fa249f1045eebf12977917bc50c285c1ab9ff9-0x01c463c45d18d4c04c14ede5a30b67b1207dd9f7',
                    address: '0x01c463c45d18d4c04c14ede5a30b67b1207dd9f7',
                    balance: '0.14007',
                    decimals: 18,
                    symbol: 'MOAR',
                    denormWeight: '15.385',
                    color: '#8d4f8d',
                    weightPercent: '50.0',
                },
            ],
            swaps: [],
            poolLiquidity: 1483.2,
        },
        {
            id: '0xefffffc0ab2815cfd93b4dbc4292ad8a0e24f7a1',
            publicSwap: true,
            finalized: false,
            crp: true,
            cap: '0',
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
                    color: '#422940',
                    weightPercent: '80.0',
                },
                {
                    id:
                        '0xefffffc0ab2815cfd93b4dbc4292ad8a0e24f7a1-0x01c463c45d18d4c04c14ede5a30b67b1207dd9f7',
                    address: '0x01c463c45d18d4c04c14ede5a30b67b1207dd9f7',
                    balance: '0.4',
                    decimals: 18,
                    symbol: 'MOAR',
                    denormWeight: '5.555',
                    color: '#8d4f8d',
                    weightPercent: '20.0',
                },
            ],
            swaps: [],
            poolLiquidity: 21066.39,
        },
        {
            id: '0x85200d1c2c68779f1a7edfc06aea40411bfd677d',
            publicSwap: true,
            finalized: false,
            crp: true,
            cap: '0',
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
                    color: '#7ada6a',
                    weightPercent: '80.0',
                },
                {
                    id:
                        '0x85200d1c2c68779f1a7edfc06aea40411bfd677d-0xa95aa7229aaf354ca18fb8f9a5aa3e78b88a2806',
                    address: '0xa95aa7229aaf354ca18fb8f9a5aa3e78b88a2806',
                    balance: '0.1',
                    decimals: 18,
                    symbol: 'WETH',
                    denormWeight: '5',
                    color: '#828384',
                    weightPercent: '20.0',
                },
            ],
            swaps: [],
            poolLiquidity: 790.64,
        },
        {
            id: '0x6fa649647196c64a5eaa50f5da16d2898ff92b1b',
            publicSwap: true,
            finalized: false,
            crp: true,
            cap: '0',
            rights: [
                'canPauseSwapping',
                'canChangeSwapFee',
                'canChangeWeights',
                'canAddRemoveTokens',
                'canChangeCap',
            ],
            swapFee: '0.0015',
            totalWeight: '50',
            totalShares: '100',
            totalSwapVolume: '0',
            liquidity: '0',
            tokensList: [
                '0xde4539989309d3c59c10a4cf8ce307bc1bacd287',
                '0x0457ad7b48d98e3cd463b9f9d14efed56332268d',
            ],
            swapsCount: '0',
            tokens: [
                {
                    id:
                        '0x6fa649647196c64a5eaa50f5da16d2898ff92b1b-0xde4539989309d3c59c10a4cf8ce307bc1bacd287',
                    address: '0xde4539989309d3c59c10a4cf8ce307bc1bacd287',
                    balance: '200',
                    decimals: 18,
                    symbol: 'DAI',
                    denormWeight: '25',
                    color: '#422940',
                    weightPercent: '50.0',
                },
                {
                    id:
                        '0x6fa649647196c64a5eaa50f5da16d2898ff92b1b-0x0457ad7b48d98e3cd463b9f9d14efed56332268d',
                    address: '0x0457ad7b48d98e3cd463b9f9d14efed56332268d',
                    balance: '200',
                    decimals: 6,
                    symbol: 'USDC',
                    denormWeight: '25',
                    color: '#5eb8aa',
                    weightPercent: '50.0',
                },
            ],
            swaps: [],
            poolLiquidity: 16110.56,
        },
        {
            id: '0x46ecae49798c95ae058e4c2f4ee0811fd0592b21',
            publicSwap: true,
            finalized: false,
            crp: true,
            cap: '0',
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
                    color: '#5eb8aa',
                    weightPercent: '80.0',
                },
                {
                    id:
                        '0x46ecae49798c95ae058e4c2f4ee0811fd0592b21-0x40dcb20b6b0d528d1206899f467d0f0339c7889d',
                    address: '0x40dcb20b6b0d528d1206899f467d0f0339c7889d',
                    balance: '0.8',
                    decimals: 18,
                    symbol: 'MBMU',
                    denormWeight: '8.335',
                    color: '#8d4f8d',
                    weightPercent: '20.0',
                },
            ],
            swaps: [],
            poolLiquidity: 2237.45,
        },
    ];
};
const provider = new JsonRpcProvider(
    'https://rpc-mumbai.maticvigil.com/v1/c1947560c824b65dcc8774279fe1225b3c835d35'
);
const gasPrice = new BigNumber('30000000000');
const swapCost = new BigNumber('100000');
let sor;
// const assetInAddress = '0x0457Ad7b48d98E3CD463B9F9d14EfED56332268D';
// const assetOutAddress = '0xde4539989309d3c59C10A4cF8CE307BC1bacD287';

const assetInAddress = '0xA95aA7229Aaf354CA18FB8f9A5aA3e78B88a2806';
// const assetOutAddress = '0x40dcb20b6b0d528d1206899f467d0f0339c7889d';  // MBMU
const assetOutAddress = '0x6a46a749abda4f4bd8959b5c3be0a0aaded1738e'; // SUS
//

const getSwap = async () => {
    const pools = await getPools();

    sor = new SOR(
        provider,
        gasPrice,
        4,
        80001,
        'https://',
        '0xA95aA7229Aaf354CA18FB8f9A5aA3e78B88a2806'
    );

    sor.pools.getAllPublicSwapPools = function(url: any): any {
        return { pools };
    };
    await sor.fetchPools();
    sor.MULTIADDR[80001] = '0xAFdbA29203159a16b38Be3e42Bb6bbB0C39a73Ba';
    await sor.setCostOutputToken(assetOutAddress);
    await sor.fetchFilteredPairPools(assetInAddress, assetOutAddress);
    await onInAmountChange();
};

const onInAmountChange = async () => {
    console.log('on in amount change');
    console.log('in amount change', sor);
    if (!sor || !sor.hasDataForPair(assetInAddress, assetOutAddress)) {
        // swapsLoading.value = true;
        console.log('back sor');
        return;
    }

    if (sor) {
        console.log('sor=======', sor);
    }

    const assetInAmount = new BigNumber(10000000000); // scal
    console.log('assetInAmount', assetInAmount);

    console.time(`[SOR] getSwaps ${assetInAddress} ${assetOutAddress} exactIn`);
    let [tradeSwaps, tradeAmount, spotPrice] = await sor.getSwaps(
        assetInAddress,
        assetOutAddress,
        'swapExactIn',
        assetInAmount
    );
    console.log(
        'tradeSwaps',
        tradeSwaps,
        tradeAmount.toString(),
        spotPrice.toString()
    );

    console.log('tradeSwaps', tradeSwaps);
};

getSwap();
