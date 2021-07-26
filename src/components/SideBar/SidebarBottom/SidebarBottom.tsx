import React, {useEffect, useState} from 'react';
import {useAccountConnection} from "../../../hooks/useAccountConnection";
import {useTypedSelector} from "../../../redux/useTypedSelector";
import {chainInfo} from "../../../config";
import {cosmosClient} from "../../../cosmos";
import {toPrettyCoin} from "../../../utills/toPrettyCoin";

const SidebarBottom = () => {
    const {isConnected, connectAccount, disconnectAccount} = useAccountConnection();
    const {keplr, error} = useTypedSelector(state => state.wallet);

    const [coin, setCoin] = useState<string>('');
    const [name, setName] = useState<string>('');
    useEffect(() => {
        async function setData() {
            if (isConnected && keplr) {
                const key = await keplr.getKey(chainInfo.chainId);
                setName(key.name);
                const coins = await cosmosClient.bank.balances(key.bech32Address).then(data => data.result)
                const res = coins.find(c => c.denom === chainInfo.stakeCurrency.coinMinimalDenom);
                setCoin(toPrettyCoin(res?.amount || '0').trim(true).toString());
            }
        }

        setData();

    }, [keplr, isConnected]);


    return (
        <div className='sidebar-bottom'>

            <div className='container'>
                {isConnected ? (
                    <div>
                        <div className='account-data'>
                            <p className='account-name'>{name}</p>
                            <p className='amount'>{coin}</p>
                        </div>

                        <button
                            className='btn-disconnect'
                            onClick={disconnectAccount}>
                            <p>
                                Sign Out
                            </p>
                        </button>
                    </div>
                ) : (
                    <button
                        className='btn-connect'
                        onClick={connectAccount}>
                        <p>
                            Connect Wallet
                        </p>
                    </button>
                )}
            </div>
        </div>
    );
};

export default SidebarBottom;