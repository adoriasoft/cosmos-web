import React, {useEffect} from 'react';
import {useRouteMatch, useHistory} from 'react-router-dom';
import {useTypedSelector} from "../../redux/useTypedSelector";
import {useDispatch} from "react-redux";
import {fetchProposalDetail, fetchProposals, proposalDetailReset} from "../../redux/action-creator/proposal";
import {routes} from "../../router";
import Spinner from "../Loader/Spinner";
import {Deposit, Tally} from "@cosmjs/launchpad/build/lcdapi/gov";
import {CoinPretty, Dec} from "@keplr-wallet/unit";
import {Change} from "../../types/proposal";

const ProposalDetail: React.FC = () => {
        const history = useHistory();
        const {params: {id}} = useRouteMatch<{ id: string }>();

        const {
            proposalDetail,
            proposals,
            isFetchingProposals,
            isFetchingItem,
            error
        } = useTypedSelector(state => state.proposal);
        const dispatch = useDispatch();

        useEffect(() => {
            if (!proposals) {
                dispatch(fetchProposals());
            }
            dispatch(fetchProposalDetail(id));
            return () => {
                dispatch(proposalDetailReset())
            };
        }, []);

        const proposal = proposals?.find(p => p.id === id);
        if (!proposal && !isFetchingProposals && proposals) {
            history.push(routes.proposals)
        }

        const toDate = (date: string): string => {
            return new Date(date).toUTCString();
        }


        return (
            <div className={'item-content'}>
                {isFetchingProposals && <Spinner/>}
                {error}
                {proposal && (<table>
                    <tbody>
                    <tr>
                        <td>Proposal ID</td>
                        <td>{proposal.id}</td>
                    </tr>

                    <tr>
                        <td>Proposer</td>
                        <td>{isFetchingItem ? <Spinner/> : proposalDetail?.proposer}</td>
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
                        <td>{proposal.proposal_status || proposal.status}</td>
                    </tr>

                    <tr>
                        <td>Deposit</td>
                        <td>{isFetchingItem ? <Spinner/> : <Deposits deposits={proposalDetail?.deposits}/>}</td>
                    </tr>

                    <tr>
                        <td>Tally Result</td>
                        <td>{<TallyResultTable results={proposal.final_tally_result}/>}</td>
                    </tr>

                    {proposal.content.value.changes &&
                    <tr>
                        <td>Changes</td>
                        <td><ChangesTable changes={proposal.content.value.changes}/></td>
                    </tr>}

                    <tr>
                        <td>Submit Time</td>
                        <td>{toDate(proposal.submit_time)}</td>
                    </tr>

                    <tr>
                        <td>Deposit End Time</td>
                        <td>{toDate(proposal.deposit_end_time)}</td>
                    </tr>

                    <tr>
                        <td>Voting Start Time</td>
                        <td>{toDate(proposal.voting_start_time)}</td>
                    </tr>

                    <tr>
                        <td>End Voting Time</td>
                        <td>{toDate(proposal.deposit_end_time)}</td>
                    </tr>


                    </tbody>
                </table>)}
            </div>
        );
    }
;

const TallyResultTable: React.FC<{ results: Tally }> = ({results}) => {
    return (<table>
        <tbody>
        <tr>
            <td>Yes</td>
            <td>{results.yes}</td>
        </tr>
        <tr>
            <td>No</td>
            <td>{results.no}</td>
        </tr>
        <tr>
            <td>Abstain</td>
            <td>{results.abstain}</td>
        </tr>
        <tr>
            <td>No with veto</td>
            <td>{results.no_with_veto}</td>
        </tr>
        </tbody>
    </table>);
}
const ChangesTable: React.FC<{ changes: Change[] }> = ({changes}) => {
    return (<table>
        <thead>
        <tr>
            <th>Subspace</th>
            <th>Key</th>
            <th>Value</th>
        </tr>
        </thead>
        <tbody>
        {changes.map(change => (
                <tr>
                    <td>{change.subspace}</td>
                    <td>{change.key}</td>
                    <td>{change.value}</td>
                </tr>
            )
        )}

        </tbody>
    </table>);
}


const Deposits: React.FC<{ deposits: readonly Deposit[] | null | undefined }> = ({deposits}) => {
    if (!deposits) {
        return <></>;
    }
    const decToCoin = (amount: Dec): string => {
        return new CoinPretty(
            {
                coinDenom: "ATOM",
                coinMinimalDenom: "uatom",
                coinDecimals: 6,
            },
            amount
        ).trim(true).toString()
    }
    let sum: Dec = new Dec(0);
    deposits.map(d => d.amount.map(a => sum = sum.add(new Dec(a.amount))))

    return (<div>
        {decToCoin(sum)}
        <ol>
            {
                deposits.map((d, i) => {
                    return (<li key={i}>
                        <div>{d.depositor}</div>
                        {d.amount.map((amount, j) => {
                            return <div key={j}>{
                                decToCoin(new Dec(amount.amount))
                            }</div>
                        })}
                    </li>)
                })
            }
        </ol>
    </div>);
}

export default ProposalDetail;