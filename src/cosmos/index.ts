import {getKeplr} from './keplr';
import {restApi} from "../config";
import {
    LcdClient,
    setupAuthExtension,
    setupBankExtension,
    setupDistributionExtension,
    setupGovExtension,
    setupMintExtension,
    setupSlashingExtension,
    setupStakingExtension,
    setupSupplyExtension
} from "@cosmjs/launchpad";
import {Proposal} from "@cosmjs/launchpad/build/lcdapi/gov";


const cosmosClient = LcdClient.withExtensions(
    {apiUrl: restApi},
    setupAuthExtension,
    setupBankExtension,
    setupDistributionExtension,
    setupGovExtension,
    setupMintExtension,
    setupSlashingExtension,
    setupStakingExtension,
    setupSupplyExtension,
);

export {cosmosClient, getKeplr, };