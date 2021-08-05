import { BroadcastTxSuccess } from "@cosmjs/stargate/build/stargateclient";
import { Coin } from "@cosmjs/stargate";
import { ParameterChangeProposal } from "../cosmos/codec/cosmos/params/v1beta1/params";
import { CommunityPoolSpendProposal } from "@cosmjs/stargate/build/codec/cosmos/distribution/v1beta1/distribution";
import { TextProposal } from "../cosmos/codec/cosmos/gov/v1beta1/gov";

export type TProposals = TextProposal | ParameterChangeProposal | CommunityPoolSpendProposal;

export interface SubmitProposalState {
    // proposal: TProposals;
    // deposits: Coin[];
    broadcastResponse: BroadcastTxSuccess | null;
    error: string | null;
    fetching: boolean;
}

export enum SubmitProposalTypes {
    // SUBMIT_PROPOSAL_SAVE_DATA = "SUBMIT_PROPOSAL_SAVE_DATA",
    // SUBMIT_PROPOSAL_SAVE_DEPOSITS = "SUBMIT_PROPOSAL_SAVE_DEPOSITS",
    SUBMIT_PROPOSAL_CALL = "SUBMIT_PROPOSAL_CALL",
    SUBMIT_PROPOSAL_SUCCESS = "SUBMIT_PROPOSAL_SUCCESS",
    SUBMIT_PROPOSAL_ERROR = "SUBMIT_PROPOSAL_ERROR"
}

// interface SubmitProposalSaveDataAction {
//     type: SubmitProposalTypes.SUBMIT_PROPOSAL_SAVE_DATA;
//     payload: TProposals;
// }
// interface SubmitProposalSaveDepositsAction {
//     type: SubmitProposalTypes.SUBMIT_PROPOSAL_SAVE_DEPOSITS;
//     payload: Coin[];
// }
interface SubmitProposalCallAction {
    type: SubmitProposalTypes.SUBMIT_PROPOSAL_CALL;
}
interface SubmitProposalSuccessAction {
    type: SubmitProposalTypes.SUBMIT_PROPOSAL_SUCCESS;
    payload: BroadcastTxSuccess;
}
interface SubmitProposalErrorAction {
    type: SubmitProposalTypes.SUBMIT_PROPOSAL_ERROR;
    payload: string;
}

export type SubmitProposalAction =
    // | SubmitProposalSaveDataAction
    // | SubmitProposalSaveDepositsAction
    SubmitProposalCallAction | SubmitProposalSuccessAction | SubmitProposalErrorAction;
