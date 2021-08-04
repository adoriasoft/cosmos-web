import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import TextProposal from "./TextProposal";
import ParameterChangeProposal from "./ParameterChangeProposal/ParameterChangeProposal";
import CommunityPoolSpendProposal from "./CommunityPoolSpendProposal";

const SubmitProposal: React.FC = () => {
    return (
        <Tabs>
            <TabList>
                <Tab>TextProposal</Tab>
                <Tab>ParameterChangeProposal</Tab>
                <Tab>CommunityPoolSpendProposal</Tab>
            </TabList>

            <TabPanel forceRender>
                <TextProposal />
            </TabPanel>

            <TabPanel forceRender>
                <ParameterChangeProposal />
            </TabPanel>

            <TabPanel forceRender>
                <CommunityPoolSpendProposal />
            </TabPanel>
        </Tabs>
    );
};

export default SubmitProposal;
