import React, { useEffect, useRef, useState } from "react";
import { useTypedSelector } from "../../redux/useTypedSelector";
import { useDispatch } from "react-redux";
import {
    saveTextProposalData,
    saveTextProposalDeposits,
    submitTextProposal
} from "../../redux/action-creator/submitProposal/textProposal";
import DepositForm from "./InitialDeposit/DepositForm";
import { Coin } from "@cosmjs/stargate";
import DepositItem from "./InitialDeposit/DepositItem";

const TextProposal: React.FC = () => {
    const {
        proposal: { description, title },
        deposits
    } = useTypedSelector((state) => state.submitProposal.textProposal);
    const dispatch = useDispatch();
    const setTitle = (data: string) => {
        dispatch(saveTextProposalData({ title: data, description }));
    };
    const setDescription = (data: string) => {
        dispatch(saveTextProposalData({ title, description: data }));
    };
    const setDeposits = (data: Coin[]) => {
        dispatch(saveTextProposalDeposits(data));
    };

    return (
        <div>
            <div>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type={"text"}
                    placeholder={"Title"}
                />
                <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    type={"text"}
                    placeholder={"Description"}
                />
                <button onClick={() => dispatch(submitTextProposal())}>Send</button>
            </div>
            <DepositForm addDeposit={(d) => setDeposits([...deposits, d])} />
            {deposits.map((d, i) => (
                <DepositItem
                    key={i}
                    deposit={d}
                    deleteDeposit={() =>
                        setDeposits([...deposits.slice(0, i), ...deposits.slice(i + 1)])
                    }
                />
            ))}
        </div>
    );
};

export default TextProposal;
