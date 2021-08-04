import {
    ParameterChangeProposalAction,
    ParameterChangeProposalState,
    ParameterChangeProposalTypes
} from "../../../types/submitProposal/parameterChangeProposal";

const initialState: ParameterChangeProposalState = {
    error: null,
    fetching: false,
    deposits: [],
    broadcastResponse: null,
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

        case ParameterChangeProposalTypes.PARAMETER_CHANGE_PROPOSAL_SAVE_DEPOSITS:
            return { ...state, deposits: action.payload };

        case ParameterChangeProposalTypes.PARAMETER_CHANGE_PROPOSAL_CALL:
            return { ...state, error: null, broadcastResponse: null, fetching: true };

        case ParameterChangeProposalTypes.PARAMETER_CHANGE_PROPOSAL_SUCCESS:
            return { ...state, fetching: false, broadcastResponse: action.payload };

        case ParameterChangeProposalTypes.PARAMETER_CHANGE_PROPOSAL_ERROR:
            return { ...state, fetching: false, error: action.payload };

        default:
            return state;
    }
};
