import { ParameterChangeProposal } from "../../cosmos/codec/cosmos/params/v1beta1/params";

export interface ParameterChangeProposalState {
    data: ParameterChangeProposal;
}

export enum ParameterChangeProposalTypes {
    PARAMETER_CHANGE_PROPOSAL_SAVE_DATA = "PARAMETER_CHANGE_PROPOSAL_SAVE_DATA"
}

interface ParameterChangeProposalSaveDataAction {
    type: ParameterChangeProposalTypes.PARAMETER_CHANGE_PROPOSAL_SAVE_DATA;
    payload: ParameterChangeProposal;
}

export type ParameterChangeProposalAction = ParameterChangeProposalSaveDataAction;
