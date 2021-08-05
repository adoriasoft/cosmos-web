import React, { useState } from "react";
import { coin, Coin } from "@cosmjs/stargate";

interface ICoinsFormProps {
    addCoin: (coin: Coin) => void;
    title: string;
}

const CoinsForm: React.FC<ICoinsFormProps> = ({ addCoin, title }) => {
    const [amount, setAmount] = useState("");
    const [denom, setDenom] = useState("");

    return (
        <div className="admin-page__form">
            <label className="admin-page__form__label" htmlFor="new-admin">
                {title}
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
                onClick={() => addCoin(coin(+amount, denom))}
                className="admin-page__form__save-btn">
                Add
            </button>
        </div>
    );
};

export default CoinsForm;
