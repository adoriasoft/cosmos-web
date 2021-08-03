import { TextProposalAction, TextProposalTypes } from "../../../types/submitProposal/textProposal";
import { TextProposal } from "../../../cosmos/codec/cosmos/gov/v1beta1/gov";

export const saveParameterChangeProposalData = (payload: TextProposal): TextProposalAction => {
    return {
        type: TextProposalTypes.TEXT_PROPOSAL_SAVE_DATA,
        payload
    };
};
