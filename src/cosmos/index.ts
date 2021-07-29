import { getKeplr } from "./keplr";
import { chainInfo } from "../config";
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

const cosmosClient = LcdClient.withExtensions(
    { apiUrl: chainInfo.rest },
    setupAuthExtension,
    setupBankExtension,
    setupDistributionExtension,
    setupGovExtension,
    setupMintExtension,
    setupSlashingExtension,
    setupStakingExtension,
    setupSupplyExtension
);

export { cosmosClient, getKeplr };
