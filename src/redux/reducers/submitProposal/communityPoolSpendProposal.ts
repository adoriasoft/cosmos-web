import {
    CommunityPoolSpendProposalAction,
    CommunityPoolSpendProposalState,
    CommunityPoolSpendProposalTypes
} from "../../../types/submitProposal/communityPoolSpendProposal";

const initialState: CommunityPoolSpendProposalState = {
    data: {
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
            return { ...state, data: action.payload };
        default:
            return state;
    }
};
