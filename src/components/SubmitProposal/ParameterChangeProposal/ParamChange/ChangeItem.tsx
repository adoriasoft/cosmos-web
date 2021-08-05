import React from "react";
import { Coin } from "@cosmjs/stargate";
import { ParamChange } from "../../../../cosmos/codec/cosmos/params/v1beta1/params";

interface IChangeItem {
    change: ParamChange;
    deleteChange: () => void;
}

const ChangeItem: React.FC<IChangeItem> = ({ change, deleteChange }) => {
    return (
        <div className="admin-card">
            {`${change.subspace} | ${change.value} | ${change.key}`}
            <div className="admin-card__buttons">
                <button className="admin-card__delete-btn" onClick={deleteChange}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default ChangeItem;
