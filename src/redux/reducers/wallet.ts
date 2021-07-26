import { WalletAction, WalletActionTypes, WalletState } from "../../types/wallet";

const initialState: WalletState = {
    keplr: null,
    isConnected: false,
    error: null
};

export const walletReducer = (state = initialState, action: WalletAction): WalletState => {
    switch (action.type) {
        case WalletActionTypes.WALLET_CONNECT:
            return { ...state, error: null };
        case WalletActionTypes.WALLET_DISCONNECT:
            return { ...state, keplr: null, isConnected: false, error: null };
        case WalletActionTypes.WALLET_SUCCESS:
            return { ...state, isConnected: true, keplr: action.payload };
        case WalletActionTypes.WALLET_ERROR:
            return { ...state, error: action.payload, isConnected: false, keplr: null };
        default:
            return state;
    }
};
