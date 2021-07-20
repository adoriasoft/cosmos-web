import React, {useEffect} from 'react';
import ProposalItem from "./ProposalItem";
import {useTypedSelector} from "../../redux/useTypedSelector";
import {useDispatch} from "react-redux";
import {fetchProposals} from "../../redux/action-creator/proposal";


const ProposalsPage: React.FC = () => {
    const {loading, proposals, error} = useTypedSelector(state => state.proposal);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProposals());
    }, []);

    return (
        <div className="proposals">
            <h4 className="title">Proposals</h4>
            <div className="container">
                {loading ? "Loading" : null}
                {error ? error : null}
                <table>
                    <thead>
                    <tr>
                        <th>Proposal ID</th>
                        <th>Title</th>
                        <th>Proposal Type</th>
                        <th>Submit Time (UTC)</th>
                    </tr>
                    </thead>
                    <tbody>
                    {proposals && (
                        proposals.map((p) => <ProposalItem proposal={p} key={p.id}/>))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ProposalsPage;