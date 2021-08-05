import React from "react";
import { IBaseSPMsgProps } from "./index";
import { useDispatch } from "react-redux";
import { submitProposal } from "../../redux/action-creator/submitProposal";

const TextProposal: React.FC<IBaseSPMsgProps> = ({ baseParams }) => {
    const dispatch = useDispatch();
    const sumbitTextProposal = () => {
        dispatch(
            submitProposal(
                {
                    typeUrl: "/cosmos.gov.v1beta1.TextProposal",
                    value: TextProposal.encode({
                        title: "TEST TextProposals",
                        description: "test description"
                    }).finish()
                },
                baseParams.deposit
            )
        );
    };
    return <div>TextProposal</div>;
};

export default TextProposal;
