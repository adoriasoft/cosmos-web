import React, { useState } from "react";
import { ParamChange } from "../../../../cosmos/codec/cosmos/params/v1beta1/params";
import { coin } from "@cosmjs/stargate";

interface IChangeFormProps {
    addChange: (change: ParamChange) => void;
}

const ChangeForm = () => {
    const [subspace, setSubspace] = useState("");
    const [key, setKey] = useState("");
    const [value, setValue] = useState("");

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

export default ChangeForm;

const paramChanges = {
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
