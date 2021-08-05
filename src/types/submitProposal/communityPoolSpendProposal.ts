import { CommunityPoolSpendProposal } from "@cosmjs/stargate/build/codec/cosmos/distribution/v1beta1/distribution";
import { Coin } from "@cosmjs/stargate";
import { BroadcastTxSuccess } from "@cosmjs/stargate/build/stargateclient";

export interface CommunityPoolSpendProposalState {
    proposal: CommunityPoolSpendProposal;
    deposits: Coin[];
    broadcastResponse: BroadcastTxSuccess | null;
    error: string | null;
    fetching: boolean;
}
export enum CommunityPoolSpendProposalTypes {
    COMMUNITY_POOL_SPEND_PROPOSAL_SAVE_DATA = "COMMUNITY_POOL_SPEND_PROPOSAL_SAVE_DATA",
    COMMUNITY_POOL_SPEND_PROPOSAL_SAVE_DEPOSITS = "COMMUNITY_POOL_SPEND_PROPOSAL_SAVE_DEPOSITS",
    COMMUNITY_POOL_SPEND_PROPOSAL_CALL = "COMMUNITY_POOL_SPEND_PROPOSAL_CALL",
    COMMUNITY_POOL_SPEND_PROPOSAL_SUCCESS = "COMMUNITY_POOL_SPEND_PROPOSAL_SUCCESS",
    COMMUNITY_POOL_SPEND_PROPOSAL_ERROR = "COMMUNITY_POOL_SPEND_PROPOSAL_ERROR"
}

interface CommunityPoolSpendProposalSaveDataAction {
    type: CommunityPoolSpendProposalTypes.COMMUNITY_POOL_SPEND_PROPOSAL_SAVE_DATA;
    payload: CommunityPoolSpendProposal;
}

interface CommunityPoolSpendProposalSaveDepositsAction {
    type: CommunityPoolSpendProposalTypes.COMMUNITY_POOL_SPEND_PROPOSAL_SAVE_DEPOSITS;
    payload: Coin[];
}
interface CommunityPoolSpendProposalCallAction {
    type: CommunityPoolSpendProposalTypes.COMMUNITY_POOL_SPEND_PROPOSAL_CALL;
}
interface CommunityPoolSpendProposalSuccessAction {
    type: CommunityPoolSpendProposalTypes.COMMUNITY_POOL_SPEND_PROPOSAL_SUCCESS;
    payload: BroadcastTxSuccess;
}
interface CommunityPoolSpendProposalErrorAction {
    type: CommunityPoolSpendProposalTypes.COMMUNITY_POOL_SPEND_PROPOSAL_ERROR;
    payload: string;
}

export type CommunityPoolSpendProposalAction =
    | CommunityPoolSpendProposalSaveDataAction
    | CommunityPoolSpendProposalSaveDepositsAction
    | CommunityPoolSpendProposalCallAction
    | CommunityPoolSpendProposalSuccessAction
    | CommunityPoolSpendProposalErrorAction;
