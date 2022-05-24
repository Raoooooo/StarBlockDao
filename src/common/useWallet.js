import Web3, { utils } from 'web3';
import Web3Modal from 'web3modal';
// import { getChainData } from '@/web3/tools';
import { providerOptions } from '@/common/web3Config';




const INITIAL_STATE = {
    web3: null,
    provider: null,
    userAddress: '',
    connected: false,
    chainId: 1,
    networkId: 1,
};

var web3Modal = null;
var provider = null;
var web3 = null;
export function initWeb3Modal() {
    // if (!web3Modal) {
    web3Modal = new Web3Modal({
        theme: 'dark',
        network: "rinkeby",
        cacheProvider: true,
        providerOptions,
    });
    // provider = initWeb3Modal().connect();
    // web3 = new Web3(provider);
    return web3Modal;
    // } else {
    //     return web3Modal;
    // }
}

export async function resetApp() {
    const provider = await web3Modal.connect();
    web3 = new Web3(provider);
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
        await web3.currentProvider.close();
    }
    initWeb3Modal().clearCachedProvider();
};

export async function subscribeProvider(provider) {

    provider.on("connect", () => {
        console.log(info);
    });
    // if (!provider.on) {
    //     return;
    // }
    // provider.on('close', () => resetApp());
}


// export async function onBlockOut() {
//     const provider = await web3Modal.connect();
//     web3 = new Web3(provider);
//     var subscription = web3.eth.subscribe('newBlockHeaders', function (error, result) {
//         if (!error) {
//             console.log(result);

//             return;
//         }

//         console.error(error);
//     })
//         .on("connected", function (subscriptionId) {
//             console.log(subscriptionId);
//         })
//         .on("data", function (blockHeader) {
//             console.log(blockHeader);
//         })
//         .on("error", console.error);

//     // unsubscribes the subscription
//     subscription.unsubscribe(function (error, success) {
//         if (success) {
//             console.log('Successfully unsubscribed!');
//         }
//     });
// }

export async function onConnect(getAccount, isClickLogin) {
    const web3Modal = new Web3Modal({
        theme: 'dark',
        // network: getChainData(walletObj.chainId).network,
        network: "rinkeby",
        cacheProvider: true,
        providerOptions,
    });
    // if (web3Modal.cachedProvider) {
    // await web3Modal.connect();
    //   }
    const provider = await web3Modal.connect();
    await subscribeProvider(provider);

    web3 = new Web3(provider);
    const accounts = await web3.eth.getAccounts();
    if (accounts) {
        getAccount(accounts[0], isClickLogin);
    }
    // const address = accounts[0];

    // const networkId = await web3.eth.net.getId();
    // // alert(networkId);
    // const chainId = await web3.eth.getChainId(); // 坑逼 注意版本 chainId
    // // alert(chainId);
    // walletObj.web3 = web3;
    // walletObj.provider = provider;
    // walletObj.connected = true;
    // walletObj.userAddress = address;
    // walletObj.chainId = chainId;
    // walletObj.networkId = networkId;
    // await getAccountAssets();


};