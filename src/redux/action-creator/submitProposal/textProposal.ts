import { TextProposalAction, TextProposalTypes } from "../../../types/submitProposal/textProposal";
import { TextProposal } from "../../../cosmos/codec/cosmos/gov/v1beta1/gov";
import { Dispatch } from "redux";
import { RootState } from "../../reducers";
import { chainInfo } from "../../../config";
import { Coin, coins } from "@cosmjs/stargate";
import { getWalletAddress } from "../../../cosmos/keplr";
import { BroadcastTxSuccess } from "@cosmjs/stargate/build/stargateclient";

export const saveTextProposalData = (payload: TextProposal): TextProposalAction => {
    return {
        type: TextProposalTypes.TEXT_PROPOSAL_SAVE_DATA,
        payload
    };
};

export const saveTextProposalDeposits = (payload: Coin[]): TextProposalAction => {
    return {
        type: TextProposalTypes.TEXT_PROPOSAL_SAVE_DEPOSITS,
        payload
    };
};

export const submitTextProposal = () => {
    return async (dispatch: Dispatch<TextProposalAction>, getState: () => RootState) => {
        try {
            dispatch({ type: TextProposalTypes.TEXT_PROPOSAL_CALL });
            const {
                submitProposal: {
                    textProposal: { proposal, deposits }
                },
                wallet: { stargateClient, isConnected, keplr }
            } = getState();
            if (!isConnected || !stargateClient || !keplr) {
                return dispatch(errorTextProposalData("Wallet is not connected"));
            }
            const address = await getWalletAddress(keplr);
            const msg = {
                content: {
                    typeUrl: "/cosmos.gov.v1beta1.TextProposal",
                    value: TextProposal.encode(proposal).finish()
                },
                initialDeposit: deposits,
                proposer: address
            };

            const msgAny = {
                typeUrl: "/cosmos.gov.v1beta1.MsgSubmitProposal",
                value: msg
            };

            const fee = {
                amount: coins(0, chainInfo.stakeCurrency.coinMinimalDenom),
                gas: "2000000"
            };

            const broadcastRes = await stargateClient.signAndBroadcast(address, [msgAny], fee);

            if ((<any>broadcastRes)?.code == 0) {
                dispatch({
                    type: TextProposalTypes.TEXT_PROPOSAL_SUCCESS,
                    payload: broadcastRes as BroadcastTxSuccess
                });
            } else {
                dispatch(errorTextProposalData(broadcastRes.rawLog || "error"));
            }
        } catch (e) {
            dispatch(errorTextProposalData(e.message || "error"));
        }
    };
};

const errorTextProposalData = (error: string): TextProposalAction => {
    return {
        type: TextProposalTypes.TEXT_PROPOSAL_ERROR,
        payload: error
    };
};
