import { coins, defaultRegistryTypes, SigningStargateClient } from "@cosmjs/stargate";
import { EncodeObject, OfflineDirectSigner, Registry } from "@cosmjs/proto-signing";
import { chainInfo } from "../config";

export async function BroadcastMsg(
    wallet: OfflineDirectSigner,
    registry: Registry,
    msgAny: EncodeObject
) {
    defaultRegistryTypes.map((v) => {
        registry.register(v[0], v[1]);
    });

    const [account] = await wallet.getAccounts();
    const client = await SigningStargateClient.connectWithSigner(chainInfo.rpc, wallet, {
        registry: registry
    });

    const fee = {
        amount: coins(0, chainInfo.stakeCurrency.coinMinimalDenom),
        gas: "2000000"
    };

    return await client.signAndBroadcast(account.address, [msgAny], fee);
}
