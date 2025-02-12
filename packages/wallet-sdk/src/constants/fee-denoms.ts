/**
 * TODO - Delete this file once all the platforms are using useFeeDenoms hook
 */

import { SupportedChain } from './chain-infos';
import { denoms, NativeDenom } from './denoms';

type Network = 'mainnet' | 'testnet';
type FeeDenom = Record<SupportedChain, NativeDenom>;

type FeeDenoms = Record<Network, FeeDenom>;

export const feeDenoms: FeeDenoms = {
  mainnet: {
    akash: denoms.uakt,
    axelar: denoms.uaxl,
    juno: denoms.ujuno,
    cosmos: denoms.uatom,
    osmosis: denoms.uosmo,
    secret: denoms.uscrt,
    persistenceNew: denoms.uxprt,
    persistence: denoms.uxprt,
    stargaze: denoms.ustars,
    emoney: denoms.ungm,
    sifchain: denoms.rowan,
    irisnet: denoms.uiris,
    sommelier: denoms.usomm,
    umee: denoms.uumee,
    starname: denoms.uiov,
    cryptoorg: denoms.basecro,
    comdex: denoms.ucmdx,
    assetmantle: denoms.umntl,
    crescent: denoms.ucre,
    kujira: denoms.ukuji,
    injective: denoms.inj,
    mars: denoms.umars,
    sei: denoms.usei,
    stride: denoms.ustrd,
    agoric: denoms.ubld,
    cheqd: denoms.ncheq,
    likecoin: denoms.nanolike,
    chihuahua: denoms.uhuahua,
    gravitybridge: denoms.ugraviton,
    fetchhub: denoms.afet,
    desmos: denoms.udsm,
    teritori: denoms.utori,
    jackal: denoms.ujkl,
    evmos: denoms.aevmos,
    bitsong: denoms.ubtsg,
    bitcanna: denoms.ubcna,
    canto: denoms.acanto,
    decentr: denoms.udec,
    carbon: denoms.swth,
    cudos: denoms.acudos,
    kava: denoms.ukava,
    omniflix: denoms.uflix,
    passage: denoms.upasg,
    terra: denoms.uluna,
    quasar: denoms['ibc/0471F1C4E7AFD3F07702BEF6DC365268D64570F7C1FDC98EA6098DD6DE59817B'],
    neutron: denoms.untrn,
    coreum: denoms.utestcore,
    mainCoreum: denoms.ucore,
    quicksilver: denoms.uqck,
    migaloo: denoms.uwhale,
    kyve: denoms.ukyve,
    seiTestnet2: denoms.usei,
    onomy: denoms.anom,
    noble: denoms.usdc,
    impacthub: denoms.uixo,
    planq: denoms.aplanq,
    nomic: denoms.unom,
    nolus: denoms.unls,
    archway: denoms.aarch,
    chain4energy: denoms.uc4e,
    gitopia: denoms.ulore,
    nibiru: denoms.unibi,
    mayachain: denoms.cacao,
    empowerchain: denoms.umpwr,
    dydx: denoms.adydx,
    celestia: denoms.utia,
    sge: denoms.usge,
    xpla: denoms.axpla,
    provenance: denoms.nhash,
    aura: denoms.uaura,
    kichain: denoms.uxki,
    sentinel: denoms.udvpn,
    bandchain: denoms.uband,
    composable: denoms.ppica,
    seiDevnet: denoms.usei,
    dymension: denoms.adym,
    pryzmtestnet: denoms.upryzm,
    thorchain: denoms.rune,
    odin: denoms.loki,
    saga: denoms.usaga,
  },
  testnet: {
    akash: denoms.uakt,
    axelar: denoms.uaxl,
    juno: denoms.ujunox,
    cosmos: denoms.uatom,
    osmosis: denoms.uosmo,
    secret: denoms.uscrt,
    persistenceNew: denoms.uxprt,
    persistence: denoms.uxprt,
    stargaze: denoms.ustars,
    emoney: denoms.ungm,
    sifchain: denoms.rowan,
    irisnet: denoms.uiris,
    sommelier: denoms.usomm,
    umee: denoms.uumee,
    starname: denoms.uiov,
    cryptoorg: denoms.basecro,
    comdex: denoms.ucmdx,
    assetmantle: denoms.umntl,
    crescent: denoms.ucre,
    injective: denoms.inj,
    kujira: denoms.ukuji,
    mars: denoms.umars,
    sei: denoms.usei,
    stride: denoms.ustrd,
    agoric: denoms.ubld,
    cheqd: denoms.ncheq,
    likecoin: denoms.nanolike,
    chihuahua: denoms.uhuahua,
    gravitybridge: denoms.ugraviton,
    fetchhub: denoms.afet,
    desmos: denoms.udsm,
    teritori: denoms.utori,
    jackal: denoms.ujkl,
    evmos: denoms.aevmos,
    bitsong: denoms.ubtsg,
    bitcanna: denoms.ubcna,
    canto: denoms.acanto,
    decentr: denoms.udec,
    carbon: denoms.swth,
    cudos: denoms.acudos,
    kava: denoms.ukava,
    omniflix: denoms.uflix,
    passage: denoms.upasg,
    terra: denoms.uluna,
    quasar: denoms.uqsr,
    neutron: denoms.untrn,
    coreum: denoms.utestcore,
    mainCoreum: denoms.ucore,
    quicksilver: denoms.uqck,
    migaloo: denoms.uwhale,
    kyve: denoms.tkyve,
    seiTestnet2: denoms.usei,
    onomy: denoms.anom,
    noble: denoms.usdc,
    impacthub: denoms.uixo,
    planq: denoms.aplanq,
    nomic: denoms.unom,
    nolus: denoms.unls,
    archway: denoms.aconst,
    chain4energy: denoms.uc4e,
    gitopia: denoms.ulore,
    nibiru: denoms.unibi,
    mayachain: denoms.cacao,
    empowerchain: denoms.umpwr,
    dydx: denoms.adydx,
    celestia: denoms.utia,
    sge: denoms.usge,
    xpla: denoms.axpla,
    provenance: denoms.nhash,
    aura: denoms.uaura,
    kichain: denoms.uxki,
    sentinel: denoms.udvpn,
    bandchain: denoms.uband,
    composable: denoms.ppica,
    seiDevnet: denoms.usei,
    dymension: denoms.adym,
    pryzmtestnet: denoms.upryzm,
    thorchain: denoms.rune,
    odin: denoms.loki,
    saga: denoms.usaga,
  },
};
