import {ProposalAction, ProposalActionTypes, ProposalState} from "../../types/proposal";

const initialState: ProposalState = {
    proposals: [],
    loading: false,
    error: null
}

export const proposalReducer = (state = initialState, action: ProposalAction): ProposalState => {
    switch (action.type) {
        case ProposalActionTypes.FETCH_PROPOSAL_CALL:
            return {...state, loading: true, error: null};
        case ProposalActionTypes.FETCH_PROPOSAL_SUCCESS:
            return {...state, loading: false, proposals: action.payload};
        case ProposalActionTypes.FETCH_PROPOSAL_ERROR:
            return {...state, loading: false, error: action.payload};
        default:
            return state;
    }
}