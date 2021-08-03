import {
    TextProposalAction,
    TextProposalState,
    TextProposalTypes
} from "../../../types/submitProposal/textProposal";

const initialState: TextProposalState = {
    data: {
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
            return { ...state, data: action.payload };
        default:
            return state;
    }
};
