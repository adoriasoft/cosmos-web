import {
    ParameterChangeProposalAction,
    ParameterChangeProposalTypes
} from "../../../types/submitProposal/parameterChangeProposal";
import { ParameterChangeProposal } from "../../../cosmos/codec/cosmos/params/v1beta1/params";

export const saveParameterChangeProposalData = (
    payload: ParameterChangeProposal
): ParameterChangeProposalAction => {
    return {
        type: ParameterChangeProposalTypes.PARAMETER_CHANGE_PROPOSAL_SAVE_DATA,
        payload
    };
};
