import {
    CommunityPoolSpendProposalAction,
    CommunityPoolSpendProposalTypes
} from "../../../types/submitProposal/communityPoolSpendProposal";
import { CommunityPoolSpendProposal } from "@cosmjs/stargate/build/codec/cosmos/distribution/v1beta1/distribution";
import { Coin, coins } from "@cosmjs/stargate";
import { Dispatch } from "redux";
import { RootState } from "../../reducers";
import { getWalletAddress } from "../../../cosmos/keplr";
import { chainInfo } from "../../../config";
import { BroadcastTxSuccess } from "@cosmjs/stargate/build/stargateclient";

export const saveCommunityPoolSpendProposalData = (
    payload: CommunityPoolSpendProposal
): CommunityPoolSpendProposalAction => {
    return {
        type: CommunityPoolSpendProposalTypes.COMMUNITY_POOL_SPEND_PROPOSAL_SAVE_DATA,
        payload
    };
};

export const saveCommunityPoolSpendProposalDeposits = (
    payload: Coin[]
): CommunityPoolSpendProposalAction => {
    return {
        type: CommunityPoolSpendProposalTypes.COMMUNITY_POOL_SPEND_PROPOSAL_SAVE_DEPOSITS,
        payload
    };
};

export const submitCommunityPoolSpendProposal = () => {
    return async (
        dispatch: Dispatch<CommunityPoolSpendProposalAction>,
        getState: () => RootState
    ) => {
        try {
            dispatch({ type: CommunityPoolSpendProposalTypes.COMMUNITY_POOL_SPEND_PROPOSAL_CALL });
            const {
                submitProposal: {
                    communityPoolSpendProposal: { proposal, deposits }
                },
                wallet: { stargateClient, isConnected, keplr }
            } = getState();
            if (!isConnected || !stargateClient || !keplr) {
                return dispatch(errorCommunityPoolSpendProposalData("Wallet is not connected"));
            }
            const address = await getWalletAddress(keplr);
            const msg = {
                content: {
                    typeUrl: "/cosmos.distribution.v1beta1.CommunityPoolSpendProposal",
                    value: CommunityPoolSpendProposal.encode(proposal).finish()
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
                    type: CommunityPoolSpendProposalTypes.COMMUNITY_POOL_SPEND_PROPOSAL_SUCCESS,
                    payload: broadcastRes as BroadcastTxSuccess
                });
            } else {
                dispatch(errorCommunityPoolSpendProposalData(broadcastRes.rawLog || "error"));
            }
        } catch (e) {
            dispatch(errorCommunityPoolSpendProposalData(e.message || "error"));
        }
    };
};

const errorCommunityPoolSpendProposalData = (error: string): CommunityPoolSpendProposalAction => {
    return {
        type: CommunityPoolSpendProposalTypes.COMMUNITY_POOL_SPEND_PROPOSAL_ERROR,
        payload: error
    };
};
