import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import TextProposal from "./TextProposal";
import ParameterChangeProposal from "./ParameterChangeProposal/ParameterChangeProposal";
import CommunityPoolSpendProposal from "./CommunityPoolSpendProposal";
import { useTypedSelector } from "../../redux/useTypedSelector";
import { Coin } from "@cosmjs/stargate";
import DepositForm from "./InitialDeposit/DepositForm";
import DepositItem from "./InitialDeposit/DepositItem";
import { TBaseSPMsg } from "../../types/submitProposal";

const SubmitProposal: React.FC = () => {
    const { broadcastResponse, error, fetching } = useTypedSelector((s) => s.submitProposal);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [deposit, setDeposit] = useState<Coin[]>([]);

    const params: TBaseSPMsg = { title, description, deposit };
    return (
        <div>
            {JSON.stringify(broadcastResponse)}
            {error}
            {fetching}
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
            </div>

            <Tabs>
                <TabList>
                    <Tab>TextProposal</Tab>
                    <Tab>ParameterChangeProposal</Tab>
                    <Tab>CommunityPoolSpendProposal</Tab>
                </TabList>

                <TabPanel forceRender>
                    <TextProposal {...params} />
                </TabPanel>

                <TabPanel forceRender>
                    <ParameterChangeProposal {...params} />
                </TabPanel>

                <TabPanel forceRender>
                    <CommunityPoolSpendProposal {...params} />
                </TabPanel>
            </Tabs>

            <DepositForm addDeposit={(d) => setDeposit([...deposit, d])} />
            {deposit.map((d, i) => (
                <DepositItem
                    key={i}
                    deposit={d}
                    deleteDeposit={() =>
                        setDeposit([...deposit.slice(0, i), ...deposit.slice(i + 1)])
                    }
                />
            ))}
        </div>
    );
};

export default SubmitProposal;
