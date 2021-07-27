import { Dispatch } from "redux";
import { lcdClient, getKeplr } from "../../cosmos";
import { Bech32 } from "@cosmjs/encoding";
import { getWalletAddress } from "../../cosmos/keplr";
import {
    AdminActions,
    AdminListActionTypes,
    ClearErrorAction,
    ErrorAction
} from "../../types/adminList";

export let MOCK_ADMINS = [
    "cosmos106ljn6kasd12312x0w4jnend97fdm123asfg52",
    "cosmosasd123123gsds124124wegfeg345342fsdgh345",
    "cosmosyy6ljdfgd5464564jfhfs73hd97fdm50yec59vq"
];

export const sendErrorNotification = (
    errMessage: string,
    dispatch: Dispatch<ErrorAction | ClearErrorAction>
): void => {
    dispatch({
        type: AdminListActionTypes.ERROR,
        payload: { error: errMessage }
    });
    setTimeout(() => {
        dispatch({
            type: AdminListActionTypes.CLEAR_ERROR
        });
    }, 5000);
};

export const fetchAdminList = () => {
    return async (dispatch: Dispatch<AdminActions>): Promise<void> => {
        try {
            dispatch({ type: AdminListActionTypes.SET_LOADING, payload: { loading: true } });
            // cosmosclient test
            // TODO: replace with fetch admins
            const resp = await lcdClient.get("/node_info");
            console.log("node resp", resp);

            // TODO: replace mock data with fetch from cosmos node
            const admins = MOCK_ADMINS;
            dispatch({ type: AdminListActionTypes.SET_LIST, payload: { admins } });

            dispatch({ type: AdminListActionTypes.SET_LOADING, payload: { loading: false } });
        } catch (error) {
            console.log("[Admin fetching error]", error);
            sendErrorNotification("Error fetching admins: " + error.message, dispatch);
        }
    };
};

export const deleteAdminAction = (adminAddress: string) => {
    return async (dispatch: Dispatch<AdminActions>): Promise<void> => {
        try {
            const kepler = await getKeplr();
            if (kepler) {
                const sender = await getWalletAddress(kepler);
                const msgDeleteAdminRequest = {
                    admin: adminAddress,
                    requester: sender
                };
                console.log("sending", msgDeleteAdminRequest);
                // TODO: add deletion request + fetch new admins
                const admins = MOCK_ADMINS.filter((adm) => adm !== adminAddress);
                MOCK_ADMINS = admins;
                dispatch({ type: AdminListActionTypes.SET_LIST, payload: { admins } });
            } else {
                sendErrorNotification("No Keplr wallet logged in", dispatch);
            }
        } catch (error) {
            console.log("[Admin deletion error]", error);
            dispatch({
                type: AdminListActionTypes.ERROR,
                payload: { error: "Error during admin deletion: " + error.message }
            });
        }
    };
};

export const saveAdminAction = (adminAddress: string) => {
    return async (dispatch: Dispatch<AdminActions>): Promise<void> => {
        try {
            console.log("in saving action", adminAddress);
            // Address validation
            const resp = Bech32.decode(adminAddress);
            console.log("decoding", resp);
            const kepler = await getKeplr();
            if (kepler) {
                const sender = await getWalletAddress(kepler);
                const msgAddAdminRequest = {
                    admin: adminAddress,
                    requester: sender
                };
                // TODO: add request to node to add admin and fetch new admin list
                console.log("sending", msgAddAdminRequest);
                MOCK_ADMINS.push(adminAddress);
                dispatch({
                    type: AdminListActionTypes.SET_LIST,
                    payload: { admins: MOCK_ADMINS }
                });
            } else {
                dispatch({
                    type: AdminListActionTypes.ERROR,
                    payload: { error: "No Keplr wallet logged in" }
                });
            }
        } catch (error) {
            console.log("[Admin saving error]", error);
            sendErrorNotification("Error saving new admin: " + error.message, dispatch);
        }
    };
};
