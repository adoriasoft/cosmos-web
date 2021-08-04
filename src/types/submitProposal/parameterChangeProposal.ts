import { ParameterChangeProposal } from "../../cosmos/codec/cosmos/params/v1beta1/params";
import { Coin } from "@cosmjs/stargate";
import { BroadcastTxSuccess } from "@cosmjs/stargate/build/stargateclient";

export interface ParameterChangeProposalState {
    proposal: ParameterChangeProposal;
    deposits: Coin[];
    broadcastResponse: BroadcastTxSuccess | null;
    error: string | null;
    fetching: boolean;
}

export enum ParameterChangeProposalTypes {
    PARAMETER_CHANGE_PROPOSAL_SAVE_DATA = "PARAMETER_CHANGE_PROPOSAL_SAVE_DATA",
    PARAMETER_CHANGE_PROPOSAL_SAVE_DEPOSITS = "PARAMETER_CHANGE_PROPOSAL_SAVE_DEPOSITS",
    PARAMETER_CHANGE_PROPOSAL_CALL = "PARAMETER_CHANGE_PROPOSAL_CALL",
    PARAMETER_CHANGE_PROPOSAL_SUCCESS = "PARAMETER_CHANGE_PROPOSAL_SUCCESS",
    PARAMETER_CHANGE_PROPOSAL_ERROR = "PARAMETER_CHANGE_PROPOSAL_ERROR"
}

interface ParameterChangeProposalSaveDataAction {
    type: ParameterChangeProposalTypes.PARAMETER_CHANGE_PROPOSAL_SAVE_DATA;
    payload: ParameterChangeProposal;
}

interface ParameterChangeProposalSaveDepositsAction {
    type: ParameterChangeProposalTypes.PARAMETER_CHANGE_PROPOSAL_SAVE_DEPOSITS;
    payload: Coin[];
}
interface ParameterChangeProposalCallAction {
    type: ParameterChangeProposalTypes.PARAMETER_CHANGE_PROPOSAL_CALL;
}
interface ParameterChangeProposalSuccessAction {
    type: ParameterChangeProposalTypes.PARAMETER_CHANGE_PROPOSAL_SUCCESS;
    payload: BroadcastTxSuccess;
}
interface ParameterChangeProposalErrorAction {
    type: ParameterChangeProposalTypes.PARAMETER_CHANGE_PROPOSAL_ERROR;
    payload: string;
}

export type ParameterChangeProposalAction =
    | ParameterChangeProposalSaveDataAction
    | ParameterChangeProposalSaveDepositsAction
    | ParameterChangeProposalCallAction
    | ParameterChangeProposalSuccessAction
    | ParameterChangeProposalErrorAction;
