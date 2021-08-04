import { getKeplr } from "./keplr";
import { restApi } from "../config";
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
    { apiUrl: restApi },
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
