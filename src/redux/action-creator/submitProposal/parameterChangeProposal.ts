import {
    ParameterChangeProposalAction,
    ParameterChangeProposalTypes
} from "../../../types/submitProposal/parameterChangeProposal";
import { ParameterChangeProposal } from "../../../cosmos/codec/cosmos/params/v1beta1/params";
import { Coin, coins } from "@cosmjs/stargate";
import { Dispatch } from "redux";
import { RootState } from "../../reducers";
import { getWalletAddress } from "../../../cosmos/keplr";
import { chainInfo } from "../../../config";
import { BroadcastTxSuccess } from "@cosmjs/stargate/build/stargateclient";

export const saveParameterChangeProposalData = (
    payload: ParameterChangeProposal
): ParameterChangeProposalAction => {
    return {
        type: ParameterChangeProposalTypes.PARAMETER_CHANGE_PROPOSAL_SAVE_DATA,
        payload
    };
};

export const saveParameterChangeProposalDeposits = (
    payload: Coin[]
): ParameterChangeProposalAction => {
    return {
        type: ParameterChangeProposalTypes.PARAMETER_CHANGE_PROPOSAL_SAVE_DEPOSITS,
        payload
    };
};

export const submitParameterChangeProposal = () => {
    return async (dispatch: Dispatch<ParameterChangeProposalAction>, getState: () => RootState) => {
        try {
            dispatch({ type: ParameterChangeProposalTypes.PARAMETER_CHANGE_PROPOSAL_CALL });
            const {
                submitProposal: {
                    parameterChangeProposal: { proposal, deposits }
                },
                wallet: { stargateClient, isConnected, keplr }
            } = getState();
            if (!isConnected || !stargateClient || !keplr) {
                return dispatch(errorParameterChangeProposalData("Wallet is not connected"));
            }
            const address = await getWalletAddress(keplr);
            const msg = {
                content: {
                    typeUrl: "/cosmos.params.v1beta1.ParameterChangeProposal",
                    value: ParameterChangeProposal.encode(proposal).finish()
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
                    type: ParameterChangeProposalTypes.PARAMETER_CHANGE_PROPOSAL_SUCCESS,
                    payload: broadcastRes as BroadcastTxSuccess
                });
            } else {
                dispatch(errorParameterChangeProposalData(broadcastRes.rawLog || "error"));
            }
        } catch (e) {
            dispatch(errorParameterChangeProposalData(e.message || "error"));
        }
    };
};

const errorParameterChangeProposalData = (error: string): ParameterChangeProposalAction => {
    return {
        type: ParameterChangeProposalTypes.PARAMETER_CHANGE_PROPOSAL_ERROR,
        payload: error
    };
};
