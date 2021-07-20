import React from 'react';
import {useRouteMatch} from 'react-router-dom';
import {Proposal} from "@cosmjs/launchpad/build/lcdapi/gov";

const ProposalDetail: React.FC = () => {
    const match = useRouteMatch<{
        id: string;
    }>();
     const proposal: Proposal = {} as Proposal;

    return (
        <div className={'item-content'}>
            <table>
                <tr>
                    <td>Proposal ID</td>
                    <td>{proposal.id}</td>
                </tr>
                <tr>
                    <td>Proposer</td>
                    <td>{'*************'}</td>

                </tr>
                <tr>
                    <td>Title</td>
                    <td>{proposal.content.value.title}</td>

                </tr>
                <tr>
                    <td>Description</td>
                    <td>{proposal.content.value.description}</td>

                </tr>
                <tr>
                    <td>Proposal Type</td>
                    <td>{proposal.content.type}</td>

                </tr>
                <tr>
                    <td>Proposal Status</td>
                    <td>{proposal.proposal_status}</td>

                </tr>
                <tr>
                    <td>Deposit</td>
                    <td>{'*************'}</td>

                </tr>
                <tr>
                    <td>Tally Result</td>
                    <td>{JSON.stringify(proposal.final_tally_result)}</td>

                </tr>
                <tr>
                    <td>Submit Time</td>
                    <td>{proposal.submit_time}</td>

                </tr>
                <tr>
                    <td>Deposit End Time</td>
                    <td>{proposal.deposit_end_time}</td>

                </tr>
                <tr>
                    <td>Voting Start Time</td>
                    <td>{proposal.voting_start_time}</td>

                </tr>
                <tr>
                    <td>End Voting Time</td>
                    <td>{proposal.deposit_end_time}</td>

                </tr>
            </table>
        </div>
    );
};

export default ProposalDetail;