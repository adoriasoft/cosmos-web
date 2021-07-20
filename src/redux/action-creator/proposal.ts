import {Dispatch} from "redux";
import {ProposalAction, ProposalActionTypes} from "../../types/proposal";
import {cosmosClient} from "../../cosmos";
import {Deposit} from "@cosmjs/launchpad/build/lcdapi/gov";

export const fetchProposals = () => {
    return async (dispatch: Dispatch<ProposalAction>) => {
        try {
            dispatch({type: ProposalActionTypes.PROPOSAL_CALL})
            const proposals = (await cosmosClient.gov.proposals()).result.slice().reverse();
            dispatch({type: ProposalActionTypes.PROPOSAL_SUCCESS, payload: proposals})
        } catch (e) {
            dispatch({type: ProposalActionTypes.PROPOSAL_ERROR, payload: e.message || 'error'});
        }
    }
}

export const fetchProposalDetail = (id: string) => {
    return async (dispatch: Dispatch<ProposalAction>) => {
        try {
            dispatch({type: ProposalActionTypes.PROPOSAL_DETAIL_CALL})
            const proposal = (await cosmosClient.gov.proposal(id)).result;
            const proposer = (await cosmosClient.gov.proposer(id)).result.proposer;
            const deposits = (await cosmosClient.gov.deposits(id)).result;

            dispatch({type: ProposalActionTypes.PROPOSAL_DETAIL_SUCCESS, payload: {proposal, proposer, deposits}})
        } catch (e) {
            dispatch({type: ProposalActionTypes.PROPOSAL_DETAIL_ERROR, payload: e.message || 'error'});
        }
    }
}

