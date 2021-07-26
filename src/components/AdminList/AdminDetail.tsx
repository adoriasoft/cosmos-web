import React from "react";
import { useDispatch } from "react-redux";
import { deleteAdminAction } from "../../redux/action-creator/adminList";
import { useTypedSelector } from "../../redux/useTypedSelector";

interface AdminDetailProps {
    accountAddress: string;
    orderNum: number;
}

const AdminDetail = ({ accountAddress, orderNum }: AdminDetailProps) => {
    const walletConnected = useTypedSelector((state) => state.wallet.isConnected);
    const dispatch = useDispatch();
    function deleteAdmin(address: string) {
        const res = window.confirm(`Delete "${address}"?`);
        if (res) {
            console.log("delete", address);
            dispatch(deleteAdminAction(address));
        }
    }

    return (
        <div className="admin-card">
            {orderNum}. {accountAddress}
            <div className="admin-card__buttons">
                <button
                    disabled={!walletConnected}
                    className="admin-card__delete-btn"
                    onClick={() => deleteAdmin(accountAddress)}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default AdminDetail;
