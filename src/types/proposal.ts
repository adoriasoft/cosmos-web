import {Deposit, Proposal} from "@cosmjs/launchpad/build/lcdapi/gov";

interface IProposalDetail {
    proposal: Proposal,
    proposer: string,
    deposits: readonly Deposit[]
}

export interface ProposalState {
    proposals: Proposal[] | null;
    proposalItem: IProposalDetail | null;
    loading: boolean;
    error: null | string;
}

export enum ProposalActionTypes {
    PROPOSAL_CALL = 'PROPOSAL_CALL',
    PROPOSAL_SUCCESS = 'PROPOSAL_SUCCESS',
    PROPOSAL_ERROR = 'PROPOSAL_ERROR',

    PROPOSAL_DETAIL_CALL = 'PROPOSAL_DETAIL_CALL',
    PROPOSAL_DETAIL_SUCCESS = 'PROPOSAL_DETAIL_SUCCESS',
    PROPOSAL_DETAIL_ERROR = 'PROPOSAL_DETAIL_ERROR',
}

interface ProposalCallAction {
    type: ProposalActionTypes.PROPOSAL_CALL
}

interface ProposalSuccessAction {
    type: ProposalActionTypes.PROPOSAL_SUCCESS;
    payload: Proposal[];
}

interface ProposalErrorAction {
    type: ProposalActionTypes.PROPOSAL_ERROR;
    payload: string;
}

interface ProposalDetailCallAction {
    type: ProposalActionTypes.PROPOSAL_DETAIL_CALL
}

interface ProposalDetailSuccessAction {
    type: ProposalActionTypes.PROPOSAL_DETAIL_SUCCESS;
    payload: IProposalDetail;
}

interface ProposalDetailErrorAction {
    type: ProposalActionTypes.PROPOSAL_DETAIL_ERROR;
    payload: string;
}


export type ProposalAction =
    ProposalCallAction
    | ProposalSuccessAction
    | ProposalErrorAction
    | ProposalDetailCallAction
    | ProposalDetailSuccessAction
    | ProposalDetailErrorAction;
