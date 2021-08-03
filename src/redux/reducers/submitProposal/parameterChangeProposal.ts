import {
    ParameterChangeProposalAction,
    ParameterChangeProposalState,
    ParameterChangeProposalTypes
} from "../../../types/submitProposal/parameterChangeProposal";

const initialState: ParameterChangeProposalState = {
    data: {
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
            return { ...state, data: action.payload };
        default:
            return state;
    }
};
