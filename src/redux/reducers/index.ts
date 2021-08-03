import { combineReducers } from "redux";
import { adminListReducer } from "./adminList";
import { proposalReducer } from "./proposal";
import { walletReducer } from "./wallet";
import { textProposalReducer } from "./submitProposal/textProposal";
import { parameterChangeProposalReducer } from "./submitProposal/parameterChangeProposal";
import { communityPoolSpendProposalReducer } from "./submitProposal/communityPoolSpendProposal";

export const rootReducer = combineReducers({
    proposal: proposalReducer,
    wallet: walletReducer,
    admin: adminListReducer,

    submitProposal: combineReducers({
        textProposal: textProposalReducer,
        parameterChangeProposal: parameterChangeProposalReducer,
        communityPoolSpendProposal: communityPoolSpendProposalReducer
    })
});

export type RootState = ReturnType<typeof rootReducer>;
