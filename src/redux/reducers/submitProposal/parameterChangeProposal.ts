import {
    ParameterChangeProposalAction,
    ParameterChangeProposalState,
    ParameterChangeProposalTypes
} from "../../../types/submitProposal/parameterChangeProposal";

const initialState: ParameterChangeProposalState = {
    proposal: {
        title: "",
        description: "",
        changes: []
    }
};

export const parameterChangeProposalReducer = (
    state = initialState,
    action: ParameterChangeProposalAction
): ParameterChangeProposalState => {
    switch (action.type) {
        case ParameterChangeProposalTypes.PARAMETER_CHANGE_PROPOSAL_SAVE_DATA:
            return { ...state, proposal: action.payload };
        default:
            return state;
    }
};
