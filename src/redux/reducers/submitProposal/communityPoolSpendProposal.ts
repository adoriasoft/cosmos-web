import {
    CommunityPoolSpendProposalAction,
    CommunityPoolSpendProposalState,
    CommunityPoolSpendProposalTypes
} from "../../../types/submitProposal/communityPoolSpendProposal";
import { TextProposalTypes } from "../../../types/submitProposal/textProposal";

const initialState: CommunityPoolSpendProposalState = {
    deposits: [],
    broadcastResponse: null,
    error: null,
    fetching: false,
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

        case CommunityPoolSpendProposalTypes.COMMUNITY_POOL_SPEND_PROPOSAL_SAVE_DEPOSITS:
            return { ...state, deposits: action.payload };

        case CommunityPoolSpendProposalTypes.COMMUNITY_POOL_SPEND_PROPOSAL_CALL:
            return { ...state, error: null, broadcastResponse: null, fetching: true };

        case CommunityPoolSpendProposalTypes.COMMUNITY_POOL_SPEND_PROPOSAL_SUCCESS:
            return { ...state, fetching: false, broadcastResponse: action.payload };

        case CommunityPoolSpendProposalTypes.COMMUNITY_POOL_SPEND_PROPOSAL_ERROR:
            return { ...state, fetching: false, error: action.payload };

        default:
            return state;
    }
};
