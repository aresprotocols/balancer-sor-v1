import { SOR } from '../../src';
import { JsonRpcProvider } from '@ethersproject/providers';
import BigNumber from 'bignumber.js';

const getPools = async () => {
    return [
        {
            id: '0xdf5d614bd438afc1c1e06243a56b5aa436d18334',
            publicSwap: true,
            finalized: false,
            crp: true,
            cap: '100000000000000000000',
            rights: [
                'canPauseSwapping',
                'canChangeSwapFee',
                'canChangeWeights',
                'canAddRemoveTokens',
                'canChangeCap',
            ],
            swapFee: '0.0015',
            totalWeight: '43.75',
            totalShares: '100',
            totalSwapVolume: '45.40173261310743283930826911712211',
            liquidity: '3064.63127775',
            tokensList: [
                '0xd23bbe4386e2a738085990bad5773cc16561b910',
                '0x3c666c26baf19de73f9bacd1453894602d55a162',
            ],
            swapsCount: '4',
            tokens: [
                {
                    id:
                        '0xdf5d614bd438afc1c1e06243a56b5aa436d18334-0x3c666c26baf19de73f9bacd1453894602d55a162',
                    address: '0x3c666c26baf19de73f9bacd1453894602d55a162',
                    balance: '1751.217873',
                    decimals: 6,
                    symbol: 'USDC',
                    denormWeight: '25',
                    color: '#5eb8aa',
                    weightPercent: '57.1',
                },
                {
                    id:
                        '0xdf5d614bd438afc1c1e06243a56b5aa436d18334-0xd23bbe4386e2a738085990bad5773cc16561b910',
                    address: '0xd23bbe4386e2a738085990bad5773cc16561b910',
                    balance: '1.02504715474019074',
                    decimals: 18,
                    symbol: 'WETH',
                    denormWeight: '18.75',
                    color: '#828384',
                    weightPercent: '42.9',
                },
            ],
            swaps: [],
            poolLiquidity: 3064.63,
        },
        {
            id: '0x30fa82367f64d80d8f1f82472cdaac9767283005',
            publicSwap: true,
            finalized: false,
            crp: true,
            cap: '100000000000000000000',
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
            totalSwapVolume: '135.8865543791683604158879544196899',
            liquidity: '1399.271414070703535176758837941897',
            tokensList: [
                '0x948b2f671242cc12dda4abc7e9fd348f6cfaf3db',
                '0x3c666c26baf19de73f9bacd1453894602d55a162',
            ],
            swapsCount: '9',
            tokens: [
                {
                    id:
                        '0x30fa82367f64d80d8f1f82472cdaac9767283005-0x3c666c26baf19de73f9bacd1453894602d55a162',
                    address: '0x3c666c26baf19de73f9bacd1453894602d55a162',
                    balance: '799.543686',
                    decimals: 6,
                    symbol: 'USDC',
                    denormWeight: '28.57',
                    color: '#5eb8aa',
                    weightPercent: '57.1',
                },
                {
                    id:
                        '0x30fa82367f64d80d8f1f82472cdaac9767283005-0x948b2f671242cc12dda4abc7e9fd348f6cfaf3db',
                    address: '0x948b2f671242cc12dda4abc7e9fd348f6cfaf3db',
                    balance: '600.540383504859979449',
                    decimals: 18,
                    symbol: 'DAI',
                    denormWeight: '21.43',
                    color: '#422940',
                    weightPercent: '42.9',
                },
            ],
            swaps: [],
            poolLiquidity: 1399.27,
        },
        {
            id: '0x45fd07ad461e0548e1a4e1ebd2b81d22e6577646',
            publicSwap: true,
            finalized: false,
            crp: true,
            cap: '100000000000000000000',
            rights: [
                'canPauseSwapping',
                'canChangeSwapFee',
                'canChangeWeights',
                'canAddRemoveTokens',
                'canChangeCap',
            ],
            swapFee: '0.0012',
            totalWeight: '31.815',
            totalShares: '107.6923076923076922',
            totalSwapVolume: '231.864693182089086233338833712947',
            liquidity: '949.0897357726784931651763665316543',
            tokensList: [
                '0x948b2f671242cc12dda4abc7e9fd348f6cfaf3db',
                '0x04dac410a1838c20719783cdfe8f88fdfddf4d32',
            ],
            swapsCount: '6',
            tokens: [
                {
                    id:
                        '0x45fd07ad461e0548e1a4e1ebd2b81d22e6577646-0x948b2f671242cc12dda4abc7e9fd348f6cfaf3db',
                    address: '0x948b2f671242cc12dda4abc7e9fd348f6cfaf3db',
                    balance: '533.164507869189871659',
                    decimals: 18,
                    symbol: 'DAI',
                    denormWeight: '18.18',
                    color: '#422940',
                    weightPercent: '57.1',
                },
                {
                    id:
                        '0x45fd07ad461e0548e1a4e1ebd2b81d22e6577646-0x04dac410a1838c20719783cdfe8f88fdfddf4d32',
                    address: '0x04dac410a1838c20719783cdfe8f88fdfddf4d32',
                    balance: '1.400022368485697727',
                    decimals: 18,
                    symbol: 'MOAR',
                    denormWeight: '13.635',
                    color: '#8d4f8d',
                    weightPercent: '42.9',
                },
            ],
            swaps: [],
            poolLiquidity: 939.2,
        },
        {
            id: '0x4b08af8aa1e86c719d4cafc4c53331c4f6333803',
            publicSwap: true,
            finalized: false,
            crp: true,
            cap: '100000000000000000000',
            rights: [
                'canPauseSwapping',
                'canChangeSwapFee',
                'canChangeWeights',
                'canAddRemoveTokens',
                'canChangeCap',
            ],
            swapFee: '0.0015',
            totalWeight: '32.14',
            totalShares: '100',
            totalSwapVolume: '38.86476033640890004648107383961114',
            liquidity: '550.0861305752404142287250449651828',
            tokensList: [
                '0xfaf3da4041d98eead0d7b89582e451a33aa68f81',
                '0x04dac410a1838c20719783cdfe8f88fdfddf4d32',
            ],
            swapsCount: '2',
            tokens: [
                {
                    id:
                        '0x4b08af8aa1e86c719d4cafc4c53331c4f6333803-0xfaf3da4041d98eead0d7b89582e451a33aa68f81',
                    address: '0xfaf3da4041d98eead0d7b89582e451a33aa68f81',
                    balance: '1.056953623364749324',
                    decimals: 18,
                    symbol: 'MFER',
                    denormWeight: '17.855',
                    color: '#7ada6a',
                    weightPercent: '55.6',
                },
                {
                    id:
                        '0x4b08af8aa1e86c719d4cafc4c53331c4f6333803-0x04dac410a1838c20719783cdfe8f88fdfddf4d32',
                    address: '0x04dac410a1838c20719783cdfe8f88fdfddf4d32',
                    balance: '0.912661293969904469',
                    decimals: 18,
                    symbol: 'MOAR',
                    denormWeight: '14.285',
                    color: '#8d4f8d',
                    weightPercent: '44.4',
                },
            ],
            swaps: [],
            poolLiquidity: 597.2,
        },
        {
            id: '0x1d68f84c4b26c741466c91284237006604cfc076',
            publicSwap: true,
            finalized: false,
            crp: true,
            cap: '100000000000000000000',
            rights: [
                'canPauseSwapping',
                'canChangeSwapFee',
                'canChangeWeights',
                'canAddRemoveTokens',
                'canChangeCap',
            ],
            swapFee: '0.0015',
            totalWeight: '30',
            totalShares: '100',
            totalSwapVolume: '38.12470171820710409767722985710696',
            liquidity: '171.8326095886718720114839618868587',
            tokensList: [
                '0x04dac410a1838c20719783cdfe8f88fdfddf4d32',
                '0x948b2f671242cc12dda4abc7e9fd348f6cfaf3db',
            ],
            swapsCount: '4',
            tokens: [
                {
                    id:
                        '0x1d68f84c4b26c741466c91284237006604cfc076-0x948b2f671242cc12dda4abc7e9fd348f6cfaf3db',
                    address: '0x948b2f671242cc12dda4abc7e9fd348f6cfaf3db',
                    balance: '86.827833096425857765',
                    decimals: 18,
                    symbol: 'DAI',
                    denormWeight: '15',
                    color: '#422940',
                    weightPercent: '50.0',
                },
                {
                    id:
                        '0x1d68f84c4b26c741466c91284237006604cfc076-0x04dac410a1838c20719783cdfe8f88fdfddf4d32',
                    address: '0x04dac410a1838c20719783cdfe8f88fdfddf4d32',
                    balance: '0.295719574933009772',
                    decimals: 18,
                    symbol: 'MOAR',
                    denormWeight: '15',
                    color: '#8d4f8d',
                    weightPercent: '50.0',
                },
            ],
            swaps: [],
            poolLiquidity: 172.63,
        },
        {
            id: '0x3ce4e9eb7f4281351001cf5a8e8ddee2cf4a10f1',
            publicSwap: true,
            finalized: false,
            crp: true,
            cap: '100000000000000000000',
            rights: [
                'canPauseSwapping',
                'canChangeSwapFee',
                'canChangeWeights',
                'canAddRemoveTokens',
                'canChangeCap',
            ],
            swapFee: '0.0015',
            totalWeight: '32.14',
            totalShares: '100',
            totalSwapVolume: '0',
            liquidity: '0',
            tokensList: [
                '0xfaf3da4041d98eead0d7b89582e451a33aa68f81',
                '0x44b695e96fbdba3212a55db67b0c2d23baeb2cdb',
            ],
            swapsCount: '0',
            tokens: [
                {
                    id:
                        '0x3ce4e9eb7f4281351001cf5a8e8ddee2cf4a10f1-0x44b695e96fbdba3212a55db67b0c2d23baeb2cdb',
                    address: '0x44b695e96fbdba3212a55db67b0c2d23baeb2cdb',
                    balance: '1.2',
                    decimals: 18,
                    symbol: 'SUBS',
                    denormWeight: '17.855',
                    color: '#7ada6a',
                    weightPercent: '55.6',
                },
                {
                    id:
                        '0x3ce4e9eb7f4281351001cf5a8e8ddee2cf4a10f1-0xfaf3da4041d98eead0d7b89582e451a33aa68f81',
                    address: '0xfaf3da4041d98eead0d7b89582e451a33aa68f81',
                    balance: '0.89193',
                    decimals: 18,
                    symbol: 'MFER',
                    denormWeight: '14.285',
                    color: '#8d4f8d',
                    weightPercent: '44.4',
                },
            ],
            swaps: [],
            poolLiquidity: 0,
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

const assetInAddress = '0xd23BBE4386e2a738085990Bad5773CC16561b910'; // WETH
// const assetOutAddress = '0x40dcb20b6b0d528d1206899f467d0f0339c7889d';  // MBMU
const assetOutAddress = '0xfaf3da4041d98eead0d7b89582e451a33aa68f81'; // MOAR
//

const getSwap = async () => {
    const pools = await getPools();

    sor = new SOR(
        provider,
        gasPrice,
        6,
        80001,
        'https://',
        '0xA95aA7229Aaf354CA18FB8f9A5aA3e78B88a2806'
    );
    sor.MULTIADDR[80001] = '0xAFdbA29203159a16b38Be3e42Bb6bbB0C39a73Ba';

    sor.pools.getAllPublicSwapPools = function(url: any): any {
        return { pools };
    };
    await sor.fetchPools();
    await sor.setCostOutputToken(assetOutAddress);
    await sor.fetchFilteredPairPools(assetInAddress, assetOutAddress);
    await onInAmountChange();
};

const onInAmountChange = async () => {
    console.log('on in amount change');
    if (!sor || !sor.hasDataForPair(assetInAddress, assetOutAddress)) {
        // swapsLoading.value = true;
        console.log('back sor');
        return;
    }

    if (sor) {
        console.log('sor=======');
    }

    const assetInAmount = new BigNumber(100000000000000); // scal
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
