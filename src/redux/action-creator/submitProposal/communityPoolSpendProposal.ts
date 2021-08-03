import {
    CommunityPoolSpendProposalAction,
    CommunityPoolSpendProposalTypes
} from "../../../types/submitProposal/communityPoolSpendProposal";
import { CommunityPoolSpendProposal } from "@cosmjs/stargate/build/codec/cosmos/distribution/v1beta1/distribution";

export const saveCommunityPoolSpendProposalData = (
    payload: CommunityPoolSpendProposal
): CommunityPoolSpendProposalAction => {
    return {
        type: CommunityPoolSpendProposalTypes.COMMUNITY_POOL_SPEND_PROPOSAL_SAVE_DATA,
        payload
    };
};
