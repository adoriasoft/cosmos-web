import React from "react";
import { useTypedSelector } from "../../redux/useTypedSelector";
import { useDispatch } from "react-redux";
import { Coin } from "@cosmjs/stargate";
import DepositForm from "./InitialDeposit/DepositForm";
import DepositItem from "./InitialDeposit/DepositItem";
import {
    saveCommunityPoolSpendProposalData,
    saveCommunityPoolSpendProposalDeposits,
    submitCommunityPoolSpendProposal
} from "../../redux/action-creator/submitProposal/communityPoolSpendProposal";

const CommunityPoolSpendProposal: React.FC = () => {
    const {
        proposal: { description, title, amount, recipient },
        deposits,
        ...data
    } = useTypedSelector((state) => state.submitProposal.communityPoolSpendProposal);
    const dispatch = useDispatch();
    const setTitle = (data: string) => {
        dispatch(
            saveCommunityPoolSpendProposalData({ title: data, description, amount, recipient })
        );
    };
    const setDescription = (data: string) => {
        dispatch(
            saveCommunityPoolSpendProposalData({ title, description: data, amount, recipient })
        );
    };
    const setRecipient = (data: string) => {
        dispatch(
            saveCommunityPoolSpendProposalData({ title, description, amount, recipient: data })
        );
    };
    const setAmount = (data: Coin[]) => {
        dispatch(
            saveCommunityPoolSpendProposalData({ title, description, amount: data, recipient })
        );
    };
    const setDeposits = (data: Coin[]) => {
        dispatch(saveCommunityPoolSpendProposalDeposits(data));
    };

    return (
        <div>
            {data.error}
            {data.broadcastResponse?.rawLog}
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
                <input
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    type={"text"}
                    placeholder={"Recipient"}
                />
                <button onClick={() => dispatch(submitCommunityPoolSpendProposal())}>Send</button>
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

            <DepositForm addDeposit={(d) => setAmount([...amount, d])} />
            {amount.map((d, i) => (
                <DepositItem
                    key={i}
                    deposit={d}
                    deleteDeposit={() => setAmount([...amount.slice(0, i), ...amount.slice(i + 1)])}
                />
            ))}
        </div>
    );
};

export default CommunityPoolSpendProposal;
