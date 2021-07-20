import {combineReducers} from "redux";
import {proposalReducer} from "./proposal";

export const rootReducer = combineReducers({
    proposal: proposalReducer,
})

export type RootState = ReturnType<typeof rootReducer>;

