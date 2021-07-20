import React from 'react';
import {Proposal} from "@cosmjs/launchpad/build/lcdapi/gov";
import {NavLink} from 'react-router-dom';
import {routes} from "../../router";

interface ProposalItemProps {
    proposal: Proposal
}

const ProposalItem: React.FC<ProposalItemProps> = ({proposal: {id, submit_time, content: {type, value: {title}},}}) => {
    return (
        <tr>
            <td>{id}</td>
            <td><NavLink to={`${routes.proposals}/${id}`}>{title}</NavLink></td>
            <td>{type}</td>
            <td>{submit_time}</td>
        </tr>
    );
};

export default ProposalItem;