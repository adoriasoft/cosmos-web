import {ProposalAction, ProposalActionTypes, ProposalState} from "../../types/proposal";

const initialState: ProposalState = {
    proposals: null,
    proposalItem: null,
    loading: false,
    error: null
}

export const proposalReducer = (state = initialState, action: ProposalAction): ProposalState => {
    switch (action.type) {
        case ProposalActionTypes.PROPOSAL_CALL:
            return {...state, loading: true, error: null};
        case ProposalActionTypes.PROPOSAL_SUCCESS:
            return {...state, loading: false, proposals: action.payload};
        case ProposalActionTypes.PROPOSAL_ERROR:
            return {...state, loading: false, error: action.payload};

        case ProposalActionTypes.PROPOSAL_DETAIL_CALL:
            return {...state, loading: true, error: null};
        case ProposalActionTypes.PROPOSAL_DETAIL_SUCCESS:
            return {...state, loading: false, proposalItem: action.payload};
        case ProposalActionTypes.PROPOSAL_DETAIL_ERROR:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
}