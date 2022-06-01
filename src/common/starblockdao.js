
import * as Web3 from "web3";
import { DaoPort } from "./starblockdao-js/lib/daoport";
import { Network } from "./starblockdao-js/lib/types";
import { getRequestBaseUrl, getProdcutMode } from "@/common/starBlockConfig";
import Web3Modal from "web3modal";
import { providerOptions } from "@/common/web3Config";
var utils = require('web3-utils')

var network_Name = Network.Main;
var accounts;
var daoport;
var web3;

export function setNetwork_Name(chaiIdNum) {

    if (chaiIdNum === 1) {
        network_Name = Network.Main;
        // isEther = true;
    }

    if (chaiIdNum === 4) {
        network_Name = Network.Rinkeby;
        // isEther = true;
    }
    // if (chaiIdNum === 56) {
    //     network_Name = Network.BSC_Main;
    //     isEther = false;
    // }
    // if (chaiIdNum === 97) {
    //     network_Name = Network.BSC_Test;
    //     isEther = false;
    // }
    // alert(network_Name);
}
export function initWeb3() {
    if (web3) {
        return web3;
    } else {
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            // 请求用户授权
            window.ethereum.enable();
        } else if (typeof web3 !== "undefined") {
            web3 = new Web3(web3.currentProvider);
            // web3.eth.defaultAccount = web3.eth.accounts[0];
            // console.log(web3.eth.defaultAccount);
        } else {
            // set the provider you want from Web3.providers
            // web3 = new Web3(new Web3.providers.HttpProvider("http://192.168.1.61:8080"));
            var PROVIDER_URL = "";
            if (getProdcutMode() == 1) {
                PROVIDER_URL = "https://mainnet.infura.io/v3/7581b5aab9b4489ba1517a3e06e84280"
            } else {
                PROVIDER_URL = "https://rinkeby.infura.io/v3/7581b5aab9b4489ba1517a3e06e84280";
            }
            web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL));
        }
        return web3;
    }

}

export async function daoportAction(item, handleMasterChefInfo, index) {
    if (!accounts) {
        await getAccounts();
    }

    if (!daoport) {
        getDaoPort(accounts[0]);
    }
    const pid = item.poolInfo.pid;
    const owner = accounts[0];
    const maxTokenId = 10000;

    var parameters = {
        pid,
        owner,
        maxTokenId
    };
    const masterChefInfo = await daoport.getNFTMasterChefInfos(parameters);
    // alert(masterChefInfo);

    // console.log("document=== masterchefinfo: pid", pid, masterChefInfo);
    if (handleMasterChefInfo) {
        handleMasterChefInfo(masterChefInfo, item, index);
    }
}

export async function approveNFTAction(item, getIsApproveNFT, index, isOnlyGetApprove, faildHandle) {
    if (!accounts) {
        await getAccounts();
    }

    if (!daoport) {
        getDaoPort(accounts[0]);
    }
    const owner = accounts[0];
    const wnftContract = item.poolInfo.wnft;
    const isApproveNFT = true;
    let parameters = {
        owner,
        wnftContract,
        isApproveNFT
    };
    const isApprove = await daoport.isApprovedForAll(parameters);
    console.log("daoporApprovedtAction==", isApprove);
    if (isOnlyGetApprove) {
        if (getIsApproveNFT) {
            getIsApproveNFT(isApprove, item, index);
        }
        return;
    }

    try {
        const txHash = await daoport.setApprovalForAll(parameters);
        console.log("daoporApprovedtAction --txHash", txHash);
        if (getIsApproveNFT) {
            getIsApproveNFT(true, item, index);
        }
    } catch (error) {
        var reg = RegExp(/Transaction was not mined within/);
        if (error.message.match(reg)) {

        } else {
            if (faildHandle) {
                faildHandle(item)
            }
        }
    }
}


export async function approveWNFTAction(item, getIsApproveNFT, index, isOnlyGetApprove, faildHandle) {
    if (!accounts) {
        await getAccounts();
    }

    if (!daoport) {
        getDaoPort(accounts[0]);
    }
    const owner = accounts[0];
    // var operator = "0x5B78867B0ecC41170e6A1A8A418B8dC1890b0F18";
    const wnftContract = item.poolInfo.wnft;
    const isApproveNFT = false;
    // if (!isApproveNFT) {
    //解抵押授权
    // nftMasterchef 合约
    // operator = "0x5B78867B0ecC41170e6A1A8A418B8dC1890b0F18";
    // }
    let parameters = {
        owner,
        wnftContract,
        isApproveNFT
    };


    const isApprove = await daoport.isApprovedForAll(parameters);
    console.log("daoporApprovedtAction==", isApprove);

    if (isOnlyGetApprove) {
        if (getIsApproveNFT) {
            getIsApproveNFT(isApprove, item, index);
        }
        return;
    }

    try {
        const txHash = await daoport.setApprovalForAll(parameters);
        console.log("daoporApprovedtAction --txHash", txHash);
        if (getIsApproveNFT) {
            getIsApproveNFT(true, item, index);
        }
    } catch (error) {
        var reg = RegExp(/Transaction was not mined within/);
        if (error.message.match(reg)) {

        } else {
            if (faildHandle) {
                faildHandle(item)
            }
        }
    }
}

export async function getNFTTokenIDs(item, handleGetNFTTokenIDs, index) {
    if (!accounts) {
        await getAccounts();
    }

    if (!daoport) {
        getDaoPort(accounts[0]);
    }
    const owner = accounts[0];
    //获取可抵押tokens
    // var contractAddress = await daoport.getNFTContractAddress(item.poolInfo.wnft);
    var contractAddress = item.nft;
    item.collection.contractAddress = contractAddress;
    const maxTokenId = item.poolInfo.maxTokenId;
    var parameters = {
        contractAddress,
        owner,
        maxTokenId
    };
    const tokenIds = await daoport.ownedNFTTokens(parameters);
    console.log("daoportAction=== tokenIds:", tokenIds);
    if (handleGetNFTTokenIDs) {
        handleGetNFTTokenIDs(tokenIds, item, index);
    }
}

export async function getWNFTTokenIDs(item, handleGetWNFTTokenIDs, isHarvest) {
    if (!accounts) {
        await getAccounts();
    }
    if (!daoport) {
        getDaoPort(accounts[0]);
    }
    const owner = accounts[0];
    const maxTokenId = item.poolInfo.maxTokenId;
    //获取可抵押tokens
    var contractAddress = item.poolInfo.wnft;
    var parameters = {
        contractAddress,
        owner,
        maxTokenId
    };
    const tokenIds = await daoport.ownedNFTTokens(parameters);
    console.log("daoportAction=== tokenIds:", tokenIds);
    if (handleGetWNFTTokenIDs) {
        handleGetWNFTTokenIDs(tokenIds, item, isHarvest);
    }
}


export async function daoporDeposit(item, handleDeposit, tokenIds, faildHandle) {
    if (!accounts) {
        await getAccounts();
    }
    if (!daoport) {
        getDaoPort(accounts[0]);
    }
    const pid = item.poolInfo.pid;
    // const tokenIds = [4, 5];
    const parameters = {
        pid,
        tokenIds
    };

    try {
        const txHash = await daoport.deposit(parameters);
        console.log("daoporDeposit==txhash", txHash);
        if (handleDeposit) {
            handleDeposit(txHash, item);
        }
    } catch (error) {
        var reg = RegExp(/Transaction was not mined within/);
        if (error.message.match(reg)) {

        } else {
            if (faildHandle) {
                faildHandle(item)
            }
        }
    }
}

export async function daoporWithdraw(item, handleWithdraw, tokenIds, faildHandle) {
    if (!accounts) {
        await getAccounts();
    }

    if (!daoport) {
        getDaoPort(accounts[0]);
    }
    const pid = item.poolInfo.pid;
    // const tokenIds = [4, 5];
    const parameters = {
        pid,
        tokenIds
    };

    try {
        const txHash = await daoport.withdraw(parameters);
        console.log("daoporDeposit==txhash", txHash);
        if (handleWithdraw) {
            handleWithdraw(txHash, item);
        }
    } catch (error) {
        var reg = RegExp(/Transaction was not mined within/);
        if (error.message.match(reg)) {

        } else {
            if (faildHandle) {
                faildHandle(item)
            }
        }
    }
}
export async function daoporHarvest(item, handleHarvest, tokenIds, faildHandle) {
    if (!accounts) {
        await getAccounts();
    }

    if (!daoport) {
        getDaoPort(accounts[0]);
    }
    const owner = accounts[0];
    const pid = item.poolInfo.pid;
    const to = owner;
    const wnftTokenIds = tokenIds;
    const parameters = {
        pid,
        to,
        wnftTokenIds
    };

    try {
        const txHash = await daoport.harvest(parameters);
        console.log("daoporHarvest==txhash", txHash);
        if (handleHarvest) {
            handleHarvest(txHash, item)
        }
    } catch (error) {

        var reg = RegExp(/Transaction was not mined within/);
        if (error.message.match(reg)) {

        } else {
            if (faildHandle) {
                faildHandle(item)
            }
        }

    }
}


export async function getBonusRewardAction(item, handleGetBonusReward, index) {

    ///获取分红，奖励

    if (!accounts) {
        await getAccounts();
    }

    if (!daoport) {
        getDaoPort(accounts[0]);
    }
    const owner = accounts[0];
    const wnftContract = item.poolInfo.wnft;
    const pid = item.poolInfo.pid;
    const maxTokenId = 100;
    var parameters = {
        wnftContract,
        owner,
        maxTokenId
    };
    const tokenIds = await daoport.ownedTokens(parameters);
    console.log("daoportAction=== tokenIds:", tokenIds);

    if (tokenIds && tokenIds.length) {
        parameters = {
            pid,
            tokenIds
        };
        await daoport.pending(parameters, function (error, result) {

            console.log("daoportAction=== error/result:", error, result);
            if (handleGetBonusReward) {
                handleGetBonusReward(result, item, index);
            }
        });
    }
}



export function getInfura() {
    let infura;
    if (network_Name === Network.Main) {
        infura = "https://mainnet.infura.io/";
    } else if (network_Name === Network.Rinkeby) {
        infura = "https://rinkeby.infura.io/";
    }
    infura += "v3/c1b0dbb2fcf445278b966cc102873180";
    return infura;
}

export function getBlockNumber(updateBlockData) {
    initWeb3().eth.getBlockNumber()
        .then((blockNumber) => {
            if (updateBlockData) {
                updateBlockData(blockNumber);
            }
        });
}



export function onBlockNumberChange(updateBlockData) {
    var subscription = initWeb3().eth.subscribe('newBlockHeaders', function (error, result) {
        if (!error) {
            // console.log("result", result);
            if (updateBlockData) {
                updateBlockData(result.number, initWeb3());
            }
            return;
        }

        console.error(error);
    })
        .on("connected", function (subscriptionId) {
            // console.log(subscriptionId);
        })
        .on("data", function (blockHeader) {
            // if (updateBlockData) {
            //     updateBlockData(blockHeader);
            // }
            // console.log("blockHeader", blockHeader);
        })
        .on("error", console.error);

    // unsubscribes the subscription
    subscription.unsubscribe(function (error, success) {
        if (success) {
            console.log('Successfully unsubscribed!');
        }
    });
}

export async function getAccounts() {
    const web3Modal = new Web3Modal({
        theme: "dark",
        // network: getChainData(walletObj.chainId).network,
        network: network_Name,
        cacheProvider: true,
        providerOptions
    });

    const provider = await web3Modal.connect();
    // await subscribeProvider(provider);

    web3 = new Web3(provider);
    accounts = await web3.eth.getAccounts();
    return accounts;
    // if (getAccountHandle) {
    //     getAccountHandle(accounts)
    // }
}

export async function getDaoPort(account) {
    daoport = new DaoPort(initWeb3(), network_Name);
    daoport.setAccount(account);
}


export async function getCurrentChainId(handle) {
    const chainId = await ethereum.request({ method: 'eth_chainId' });
    if (handle && chainId) {
        handle(utils.hexToNumber(chainId));
    }
    console.log(utils.hexToNumber(chainId));
}




export function getEtherscanOfCollection(contractAddress) {
    if (network_Name == Network.Rinkeby) {
        return "https://rinkeby.etherscan.io/address/" + contractAddress;
    } else {
        return "https://etherscan.io/address/" + contractAddress;
    }
}

export function getEtherscanOfNFT(contractAddress, tokenID) {
    if (network_Name == Network.Rinkeby) {
        return "https://rinkeby.etherscan.io/token/" + contractAddress + "?" + "@={" + tokenID + "}" + "#inventory";
    } else {
        return "https://etherscan.io/token/" + contractAddress + "?" + "@={" + tokenID + "}" + "#inventory";
    }
}

export function getOpenSeaOfCollection(name) {
    if (network_Name == Network.Rinkeby) {
        return "https://testnets.opensea.io/collection/" + name;
    } else {
        return "https://opensea.io/collection/" + name;
    }
}

export function getOpenSeaOfNFT(contractAddress, tokenID) {
    if (network_Name == Network.Rinkeby) {
        return "https://testnets.opensea.io/assets/rinkeby/" + contractAddress + "/" + tokenID;
    } else {
        return "https://opensea.io/collection/assets/" + contractAddress + "/" + tokenID;
    }
}


export function getStarBlockOfCollection(contractAddress) {
    if (network_Name == Network.Rinkeby) {
        return "http://192.168.1.182/collection/" + contractAddress;
    } else {
        return "https://www.starblock.io/collection/" + contractAddress;
    }
}

export function getStarBlockOfNFT(contractAddress, tokenID) {
    if (network_Name == Network.Rinkeby) {
        return "https://testnets.opensea.io/assets/rinkeby/" + contractAddress + "/" + tokenID;
    } else {
        return "https://opensea.io/collection/assets/" + contractAddress + "/" + tokenID;
    }
}

export function openseaApiBaseUrl() {
    if (network_Name == Network.Rinkeby) {
        return "https://testnets-api.opensea.io/api/v1/";
    } else {
        return "https://api.opensea.io/api/v1/";
    }
}

export function etherscanCountDownBase() {
    if (network_Name == Network.Rinkeby) {
        return "https://etherscan.io/block/countdown/";
    } else {
        return "https://etherscan.io/block/countdown/";
    }
}





