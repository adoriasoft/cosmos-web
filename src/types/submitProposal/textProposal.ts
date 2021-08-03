import { TextProposal } from "../../cosmos/codec/cosmos/gov/v1beta1/gov";
export interface TextProposalState {
    data: TextProposal;
}

export enum TextProposalTypes {
    TEXT_PROPOSAL_SAVE_DATA = "TEXT_PROPOSAL_SAVE_DATA"
}

interface TextProposalSaveDataAction {
    type: TextProposalTypes.TEXT_PROPOSAL_SAVE_DATA;
    payload: TextProposal;
}

export type TextProposalAction = TextProposalSaveDataAction;
