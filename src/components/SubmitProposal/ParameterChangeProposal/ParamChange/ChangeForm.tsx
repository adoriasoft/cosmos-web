import React, { useState } from "react";
import { ParamChange } from "../../../../cosmos/codec/cosmos/params/v1beta1/params";
import { coin } from "@cosmjs/stargate";
import Select from "react-select";

interface IChangeFormProps {
    addChange: (change: ParamChange) => void;
}

const ChangeForm: React.FC<IChangeFormProps> = ({ addChange }) => {
    const [subspace, setSubspace] = useState("");
    const [key, setKey] = useState("");
    const [value, setValue] = useState("");

    const subOptions = Object.keys(paramOptions).map((key) => ({ value: key, label: key }));
    const keyOptions = paramOptions[subspace]
        ? paramOptions[subspace].map((key) => ({ value: key, label: key }))
        : [];

    return (
        <div className="parameter-change-form">
            <div className={"input-params"}>
                <div className={"input-param-elem"}>
                    <Select
                        menuPlacement={"top"}
                        options={subOptions}
                        onChange={(e) => {
                            setSubspace(e?.value || subspace);
                            setKey(paramOptions[e?.value || subspace][0]);
                        }}
                        placeholder={"Subspace"}
                    />
                </div>

                <div className={"input-param-elem"}>
                    <Select
                        menuPlacement={"top"}
                        options={keyOptions}
                        onChange={(e) => setKey(e?.value || key)}
                        defaultValue={keyOptions[0]}
                        value={keyOptions.find((elm) => elm.value === key) || null}
                        placeholder={"Key"}
                    />
                </div>

                <div className={"input-param-elem"}>
                    <input
                        value={value}
                        onChange={({ target }) => setValue(target.value)}
                        className="value-input"
                        placeholder="Value"
                        type="text"
                    />
                </div>
                <button
                    className={"btn-add-param"}
                    onClick={() => addChange({ key, value, subspace })}>
                    Add
                </button>
            </div>
        </div>
    );
};

export default ChangeForm;

type tParamOptions = {
    [key: string]: string[];
};

const paramOptions: tParamOptions = {
    auth: [
        "MaxMemoCharacters",
        "TxSigLimit",
        "TxSizeCostPerByte",
        "SigVerifyCostED25519",
        "SigVerifyCostSecp256k1"
    ],
    bank: ["sendenabled"],
    gov: ["depositparams", "votingparams", "tallyparams"],
    staking: ["UnbondingTime", "MaxValidators", "KeyMaxEntries", "HistoricalEntries", "BondDenom"],
    slashing: [
        "SignedBlocksWindow",
        "MinSignedPerWindow",
        "DowntimeJailDuration",
        "SlashFractionDoubleSign",
        "SlashFractionDowntime"
    ],
    distribution: [
        "communitytax",
        "secretfoundationtax",
        "secretfoundationaddress",
        "baseproposerreward",
        "bonusproposerreward",
        "withdrawaddrenabled"
    ],
    crisis: ["ConstantFee"],
    mint: [
        "MintDenom",
        "InflationRateChange",
        "InflationMax",
        "InflationMin",
        "GoalBonded",
        "BlocksPerYear"
    ],
    evidence: ["MaxEvidenceAge"]
};
