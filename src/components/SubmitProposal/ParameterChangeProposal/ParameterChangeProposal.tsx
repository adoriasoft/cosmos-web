import React, { useRef, useState } from "react";
import { useTypedSelector } from "../../../redux/useTypedSelector";
import { useDispatch } from "react-redux";
import { Coin } from "@cosmjs/stargate";
import DepositForm from "../InitialDeposit/DepositForm";
import DepositItem from "../InitialDeposit/DepositItem";
import {
    saveParameterChangeProposalData,
    saveParameterChangeProposalDeposits,
    submitParameterChangeProposal
} from "../../../redux/action-creator/submitProposal/parameterChangeProposal";
import { ParamChange } from "../../../cosmos/codec/cosmos/params/v1beta1/params";

const ParameterChangeProposal: React.FC = () => {
    const {
        proposal: { description, title, changes },
        deposits,
        ...data
    } = useTypedSelector((state) => state.submitProposal.parameterChangeProposal);
    const dispatch = useDispatch();
    const setTitle = (data: string) => {
        dispatch(saveParameterChangeProposalData({ title: data, description, changes }));
    };
    const setDescription = (data: string) => {
        dispatch(saveParameterChangeProposalData({ title, description: data, changes }));
    };
    const setChanges = (data: ParamChange[]) => {
        dispatch(saveParameterChangeProposalData({ title, description, changes: data }));
    };
    const setDeposits = (data: Coin[]) => {
        dispatch(saveParameterChangeProposalDeposits(data));
    };

    const [subspace, setSubspace] = useState("");
    const [key, setKey] = useState("");
    const [value, setValue] = useState("");

    // console.log(data);
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
                <button onClick={() => dispatch(submitParameterChangeProposal())}>Send</button>
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

            <input
                value={subspace}
                onChange={(e) => setSubspace(e.target.value)}
                type={"text"}
                placeholder={"Subspace"}
            />
            <input
                value={key}
                onChange={(e) => setKey(e.target.value)}
                type={"text"}
                placeholder={"Key"}
            />
            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                type={"text"}
                placeholder={"Value"}
            />
            <button onClick={() => setChanges([...changes, { key, subspace, value }])}>Save</button>
        </div>
    );
};

export default ParameterChangeProposal;
