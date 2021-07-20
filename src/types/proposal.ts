import {Proposal} from "@cosmjs/launchpad/build/lcdapi/gov";

export interface ProposalState {
    proposals: Proposal[];
    loading: boolean;
    error: null | string;
}

export enum ProposalActionTypes {
    FETCH_PROPOSAL_CALL = 'FETCH_PROPOSAL_CALL',
    FETCH_PROPOSAL_SUCCESS = 'FETCH_PROPOSAL_SUCCESS',
    FETCH_PROPOSAL_ERROR = 'FETCH_PROPOSAL_ERROR',
}

interface FetchProposalCallAction {
    type: ProposalActionTypes.FETCH_PROPOSAL_CALL
}

interface FetchProposalSuccessAction {
    type: ProposalActionTypes.FETCH_PROPOSAL_SUCCESS;
    payload: Proposal[];
}

interface FetchProposalErrorAction {
    type: ProposalActionTypes.FETCH_PROPOSAL_ERROR;
    payload: string;
}


export type ProposalAction =
    FetchProposalCallAction
    | FetchProposalSuccessAction
    | FetchProposalErrorAction;
