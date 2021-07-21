import {Dispatch} from "redux";
import {ProposalAction, ProposalActionTypes} from "../../types/proposal";
import {cosmosClient} from "../../cosmos";
import {Deposit, Proposal} from "@cosmjs/launchpad/build/lcdapi/gov";
import {RootState} from "../reducers";

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

            const proposer = await cosmosClient.gov.proposer(id)
                .then(data => data.result.proposer)
                .catch(e => null);

            const deposits = await cosmosClient.gov.deposits(id)
                .then(data => data.result)
                .catch(e => null);

            dispatch({type: ProposalActionTypes.PROPOSAL_DETAIL_SUCCESS, payload: {proposer, deposits}})
        } catch (e) {
            dispatch({type: ProposalActionTypes.PROPOSAL_DETAIL_ERROR, payload: e.message || 'error'});
        }
    }
}

export const proposalDetailReset = () => {
    return {type: ProposalActionTypes.PROPOSAL_DETAIL_RESET}
}

