import { CommunityPoolSpendProposal } from "@cosmjs/stargate/build/codec/cosmos/distribution/v1beta1/distribution";

export interface CommunityPoolSpendProposalState {
    data: CommunityPoolSpendProposal;
}
export enum CommunityPoolSpendProposalTypes {
    COMMUNITY_POOL_SPEND_PROPOSAL_SAVE_DATA = "COMMUNITY_POOL_SPEND_PROPOSAL_SAVE_DATA"
}

interface CommunityPoolSpendProposalSaveDataAction {
    type: CommunityPoolSpendProposalTypes.COMMUNITY_POOL_SPEND_PROPOSAL_SAVE_DATA;
    payload: CommunityPoolSpendProposal;
}

export type CommunityPoolSpendProposalAction = CommunityPoolSpendProposalSaveDataAction;
