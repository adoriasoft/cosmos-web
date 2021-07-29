import { ChainInfo } from "@keplr-wallet/types";
import { Bech32Address } from "@keplr-wallet/cosmos";

const chainInfo: ChainInfo = {
    rpc: "https://rpc-cosmoshub.keplr.app",
    rest: "https://lcd-cosmoshub.keplr.app",
    chainId: "cosmoshub-4",
    chainName: "Cosmos Hub",
    stakeCurrency: {
        coinDenom: "ATOM",
        coinMinimalDenom: "uatom",
        coinDecimals: 6,
        coinGeckoId: "cosmos",
        coinImageUrl: window.location.origin + "/public/assets/tokens/cosmos.svg"
    },
    bip44: {
        coinType: 118
    },
    bech32Config: Bech32Address.defaultBech32Config("cosmos"),
    currencies: [
        {
            coinDenom: "ATOM",
            coinMinimalDenom: "uatom",
            coinDecimals: 6,
            coinGeckoId: "cosmos",
            coinImageUrl: window.location.origin + "/public/assets/tokens/cosmos.svg"
        }
    ],
    feeCurrencies: [
        {
            coinDenom: "ATOM",
            coinMinimalDenom: "uatom",
            coinDecimals: 6,
            coinGeckoId: "cosmos",
            coinImageUrl: window.location.origin + "/public/assets/tokens/cosmos.svg"
        }
    ],
    coinType: 118,
    features: ["stargate", "ibc-transfer"]
};
// const chainInfo: ChainInfo = {
//     rpc: "https://rpc-cosmoshub.keplr.app",
//     rest: "https://lcd-cosmoshub.keplr.app",
//     chainId: "cosmoshub-4",
//     chainName: "Cosmos Hub",
//     stakeCurrency: {
//         coinDenom: "ATOM",
//         coinMinimalDenom: "uatom",
//         coinDecimals: 6,
//         coinGeckoId: "cosmos",
//         coinImageUrl: window.location.origin + "/public/assets/tokens/cosmos.svg"
//     },
//     bip44: {
//         coinType: 118
//     },
//     bech32Config: Bech32Address.defaultBech32Config("cosmos"),
//     currencies: [
//         {
//             coinDenom: "ATOM",
//             coinMinimalDenom: "uatom",
//             coinDecimals: 6,
//             coinGeckoId: "cosmos",
//             coinImageUrl: window.location.origin + "/public/assets/tokens/cosmos.svg"
//         }
//     ],
//     feeCurrencies: [
//         {
//             coinDenom: "ATOM",
//             coinMinimalDenom: "uatom",
//             coinDecimals: 6,
//             coinGeckoId: "cosmos",
//             coinImageUrl: window.location.origin + "/public/assets/tokens/cosmos.svg"
//         }
//     ],
//     coinType: 118,
//     features: ["stargate", "ibc-transfer"]
// };

export { chainInfo };
