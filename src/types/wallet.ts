import { Keplr } from "@keplr-wallet/types";

export interface WalletState {
    keplr: Keplr | null;
    isConnected: boolean;
    error: string | null;
}

export enum WalletActionTypes {
    WALLET_CONNECT = "WALLET_CONNECT",
    WALLET_DISCONNECT = "WALLET_DISCONNECT",
    WALLET_SUCCESS = "WALLET_SUCCESS",
    WALLET_ERROR = "WALLET_ERROR"
}

interface WalletConnectAction {
    type: WalletActionTypes.WALLET_CONNECT;
}

interface WalletDisconnectAction {
    type: WalletActionTypes.WALLET_DISCONNECT;
}

interface WalletSuccessAction {
    type: WalletActionTypes.WALLET_SUCCESS;
    payload: Keplr;
}

interface WalletErrorAction {
    type: WalletActionTypes.WALLET_ERROR;
    payload: string;
}

export type WalletAction =
    | WalletConnectAction
    | WalletDisconnectAction
    | WalletSuccessAction
    | WalletErrorAction;
