import React from "react";
import { Coin } from "@cosmjs/stargate";

interface IDepositItemProps {
    deposit: Coin;
    deleteDeposit: () => void;
}

const DepositItem: React.FC<IDepositItemProps> = ({ deposit, deleteDeposit }) => {
    return (
        <div className="admin-card">
            {`${deposit.amount}${deposit.denom}`}
            <div className="admin-card__buttons">
                <button className="admin-card__delete-btn" onClick={deleteDeposit}>
                    Delete
                </button>
            </div>
        </div>
    );
};

export default DepositItem;
