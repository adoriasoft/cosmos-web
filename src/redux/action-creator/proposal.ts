import {Dispatch} from "redux";
import {ProposalAction, ProposalActionTypes} from "../../types/proposal";
import {cosmosClient} from "../../cosmos";

export const fetchProposals = () => {
    return async (dispatch: Dispatch<ProposalAction>) => {
        try {
            dispatch({type: ProposalActionTypes.FETCH_PROPOSAL_CALL})
            const proposals = (await cosmosClient.gov.proposals()).result.slice().reverse();
            dispatch({type: ProposalActionTypes.FETCH_PROPOSAL_SUCCESS, payload: proposals})
        } catch (e) {
            dispatch({type: ProposalActionTypes.FETCH_PROPOSAL_ERROR, payload: e.message || 'error'});
        }
    }
}

