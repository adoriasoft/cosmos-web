import React, {useEffect} from 'react';
import {useRouteMatch, useHistory} from 'react-router-dom';
import {useTypedSelector} from "../../redux/useTypedSelector";
import {useDispatch} from "react-redux";
import {fetchProposalDetail, fetchProposals, proposalDetailReset} from "../../redux/action-creator/proposal";
import {routes} from "../../router";
import Spinner from "../Loader/Spinner";
import {Deposit, Tally} from "@cosmjs/launchpad/build/lcdapi/gov";
import {CoinPretty, Dec} from "@keplr-wallet/unit";

const ProposalDetail: React.FC = () => {
        const history = useHistory();
        const {params: {id}} = useRouteMatch<{ id: string }>();

        const {
            proposalItem,
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
                        <td>{isFetchingItem ? <Spinner/> : proposalItem?.proposer}</td>

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
                        <td>{isFetchingItem ? <Spinner/> : <Deposits deposits={proposalItem?.deposits}/>}</td>

                    </tr>
                    <tr>
                        <td>Tally Result</td>
                        <td>{<TallyResult results={proposal.final_tally_result}/>}</td>

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
                    </tbody>
                </table>)}
            </div>
        );
    }
;

const TallyResult: React.FC<{ results: Tally }> = ({results}) => {
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