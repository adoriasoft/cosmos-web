import {combineReducers} from "redux";
import {proposalReducer} from "./proposal";
import {walletReducer} from "./wallet";

export const rootReducer = combineReducers({
    proposal: proposalReducer,
    wallet: walletReducer
})

export type RootState = ReturnType<typeof rootReducer>;

