import { Dispatch } from "redux";
import { WalletAction, WalletActionTypes } from "../../types/wallet";
import { chainInfo } from "../../config";
import { getKeplr } from "../../cosmos";

export const connectWallet = () => {
    return async (dispatch: Dispatch<WalletAction>) => {
        try {
            dispatch({ type: WalletActionTypes.WALLET_CONNECT });

            const keplr = await getKeplr();
            if (!keplr) {
                throw new Error("Keplr extension not found");
            }
            await keplr.enable(chainInfo.chainId);
            await keplr.experimentalSuggestChain(chainInfo);

            dispatch({ type: WalletActionTypes.WALLET_SUCCESS, payload: keplr });
        } catch (e) {
            dispatch({ type: WalletActionTypes.WALLET_ERROR, payload: e.message || "error" });
        }
    };
};

export const disconnectWallet = () => {
    return { type: WalletActionTypes.WALLET_DISCONNECT };
};
