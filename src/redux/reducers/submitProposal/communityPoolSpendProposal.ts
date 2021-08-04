import {
    CommunityPoolSpendProposalAction,
    CommunityPoolSpendProposalState,
    CommunityPoolSpendProposalTypes
} from "../../../types/submitProposal/communityPoolSpendProposal";

const initialState: CommunityPoolSpendProposalState = {
    proposal: {
        title: "",
        description: "",
        amount: [],
        recipient: ""
    }
};

export const communityPoolSpendProposalReducer = (
    state = initialState,
    action: CommunityPoolSpendProposalAction
): CommunityPoolSpendProposalState => {
    switch (action.type) {
        case CommunityPoolSpendProposalTypes.COMMUNITY_POOL_SPEND_PROPOSAL_SAVE_DATA:
            return { ...state, proposal: action.payload };
        default:
            return state;
    }
};
