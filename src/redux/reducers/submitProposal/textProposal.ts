import {
    TextProposalAction,
    TextProposalState,
    TextProposalTypes
} from "../../../types/submitProposal/textProposal";

const initialState: TextProposalState = {
    error: null,
    broadcastResponse: null,
    fetching: false,
    deposits: [],
    proposal: {
        title: "",
        description: ""
    }
};

export const textProposalReducer = (
    state = initialState,
    action: TextProposalAction
): TextProposalState => {
    switch (action.type) {
        case TextProposalTypes.TEXT_PROPOSAL_SAVE_DATA:
            return { ...state, proposal: action.payload };

        case TextProposalTypes.TEXT_PROPOSAL_SAVE_DEPOSITS:
            return { ...state, deposits: action.payload };

        case TextProposalTypes.TEXT_PROPOSAL_CALL:
            return { ...state, error: null, broadcastResponse: null, fetching: true };

        case TextProposalTypes.TEXT_PROPOSAL_SUCCESS:
            return { ...state, fetching: false, broadcastResponse: action.payload };

        case TextProposalTypes.TEXT_PROPOSAL_ERROR:
            return { ...state, fetching: false, error: action.payload };

        default:
            return state;
    }
};
