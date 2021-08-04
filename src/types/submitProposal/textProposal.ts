import { TextProposal } from "../../cosmos/codec/cosmos/gov/v1beta1/gov";
import { BroadcastTxSuccess } from "@cosmjs/stargate/build/stargateclient";
import { Coin } from "@cosmjs/stargate";
export interface TextProposalState {
    proposal: TextProposal;
    deposits: Coin[];
    broadcastResponse: BroadcastTxSuccess | null;
    error: string | null;
    fetching: boolean;
}

export enum TextProposalTypes {
    TEXT_PROPOSAL_SAVE_DATA = "TEXT_PROPOSAL_SAVE_DATA",
    TEXT_PROPOSAL_SAVE_DEPOSITS = "TEXT_PROPOSAL_SAVE_DEPOSITS",
    TEXT_PROPOSAL_CALL = "TEXT_PROPOSAL_CALL",
    TEXT_PROPOSAL_SUCCESS = "TEXT_PROPOSAL_SUCCESS",
    TEXT_PROPOSAL_ERROR = "TEXT_PROPOSAL_ERROR"
}

interface TextProposalSaveDataAction {
    type: TextProposalTypes.TEXT_PROPOSAL_SAVE_DATA;
    payload: TextProposal;
}
interface TextProposalSaveDepositsAction {
    type: TextProposalTypes.TEXT_PROPOSAL_SAVE_DEPOSITS;
    payload: Coin[];
}
interface TextProposalCallAction {
    type: TextProposalTypes.TEXT_PROPOSAL_CALL;
}
interface TextProposalSuccessAction {
    type: TextProposalTypes.TEXT_PROPOSAL_SUCCESS;
    payload: BroadcastTxSuccess;
}
interface TextProposalErrorAction {
    type: TextProposalTypes.TEXT_PROPOSAL_ERROR;
    payload: string;
}

export type TextProposalAction =
    | TextProposalSaveDataAction
    | TextProposalSaveDepositsAction
    | TextProposalCallAction
    | TextProposalSuccessAction
    | TextProposalErrorAction;
