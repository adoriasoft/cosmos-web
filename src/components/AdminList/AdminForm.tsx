import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveAdminAction } from "../../redux/action-creator/adminList";
import { useTypedSelector } from "../../redux/useTypedSelector";

const AdminForm = () => {
    const [address, setAddress] = useState("");
    const dispatch = useDispatch();
    function addAdmin(adminAddress: string) {
        dispatch(saveAdminAction(adminAddress));
        setAddress("");
    }
    const walletConnected = useTypedSelector((state) => state.wallet.isConnected);
    return (
        <div className="admin-page__form">
            <label className="admin-page__form__label" htmlFor="new-admin">
                Add new admin{" "}
                <input
                    value={address}
                    onChange={({ target }) => setAddress(target.value)}
                    className="admin-page__form__address-input"
                    disabled={!walletConnected}
                    placeholder="Address"
                    type="text"
                    name="new-admin"
                    id="new-admin"
                />
            </label>{" "}
            <button
                onClick={() => addAdmin(address)}
                className="admin-page__form__save-btn"
                disabled={!walletConnected}>
                Save
            </button>
        </div>
    );
};

export default AdminForm;
