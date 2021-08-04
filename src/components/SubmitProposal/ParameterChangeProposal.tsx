import React from "react";
import { useTypedSelector } from "../../redux/useTypedSelector";
import { useDispatch } from "react-redux";
import {
    saveTextProposalData,
    saveTextProposalDeposits,
    submitTextProposal
} from "../../redux/action-creator/submitProposal/textProposal";
import { Coin } from "@cosmjs/stargate";
import DepositForm from "./InitialDeposit/DepositForm";
import DepositItem from "./InitialDeposit/DepositItem";
import {
    saveParameterChangeProposalData,
    saveParameterChangeProposalDeposits
} from "../../redux/action-creator/submitProposal/parameterChangeProposal";
import { ParamChange } from "../../cosmos/codec/cosmos/params/v1beta1/params";

const ParameterChangeProposal: React.FC = () => {
    const {
        proposal: { description, title, changes },
        deposits
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

export default ParameterChangeProposal;

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
