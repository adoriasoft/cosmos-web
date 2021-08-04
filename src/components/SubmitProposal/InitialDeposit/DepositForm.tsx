import React, { useState } from "react";
import { coin, Coin } from "@cosmjs/stargate";

interface IDepositFormProps {
    addDeposit: (deposit: Coin) => void;
}

const DepositForm: React.FC<IDepositFormProps> = ({ addDeposit }) => {
    const [amount, setAmount] = useState("");
    const [denom, setDenom] = useState("");

    return (
        <div className="admin-page__form">
            <label className="admin-page__form__label" htmlFor="new-admin">
                Add deposit
                <input
                    value={amount}
                    onChange={({ target }) => setAmount(target.value)}
                    className="admin-page__form__address-input"
                    placeholder="Amount"
                    type="number"
                />
                <input
                    value={denom}
                    onChange={({ target }) => setDenom(target.value)}
                    className="admin-page__form__address-input"
                    placeholder="Denom"
                    type="text"
                />
            </label>{" "}
            <button
                onClick={() => addDeposit(coin(+amount, denom))}
                className="admin-page__form__save-btn">
                Add
            </button>
        </div>
    );
};

export default DepositForm;
