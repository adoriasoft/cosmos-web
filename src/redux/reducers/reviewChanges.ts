import { StakingParams } from "@keplr-wallet/stores/build/query/cosmos/staking/types";
import {
    ReviewChangesActions,
    ReviewChangesActionTypes,
    ReviewChangesState
} from "../../types/reviewChanges";

const initialState: ReviewChangesState = {
    bank: null!,
    distribution: null!,
    gov: null!,
    slashing: null!,
    staking: null!,
    error: null,
    loading: false
};

export const reviewChangesReducer = (
    state = initialState,
    action: ReviewChangesActions
): ReviewChangesState => {
    switch (action.type) {
        case ReviewChangesActionTypes.SET_PARAMS:
            return { ...state, ...action.payload };
        case ReviewChangesActionTypes.SET_LOADING:
            return { ...state, loading: action.payload.loading };
        case ReviewChangesActionTypes.ERROR:
            return { ...state, error: action.payload.error };
        case ReviewChangesActionTypes.CLEAR_ERROR:
            return { ...state, error: null };
        default:
            return state;
    }
};
