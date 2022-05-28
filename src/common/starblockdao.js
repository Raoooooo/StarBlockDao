
import * as Web3 from "web3";
import { DaoPort } from "./starblockdao-js/lib/daoport";
import { Network } from "./starblockdao-js/lib/types";
import { getRequestBaseUrl, getProdcutMode } from "@/common/starBlockConfig";

var network_Name = Network.Rinkeby;



export function setNetwork_Name(chaiIdNum) {

    if (chaiIdNum === 1) {
        network_Name = Network.Main;
        isEther = true;
    }

    if (chaiIdNum === 4) {
        network_Name = Network.Rinkeby;
        isEther = true;
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
    var web3;
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

export async function daoportAction(item, handleMasterChefInfo, index) {
    // var account = web3.eth.defaultAccount;
    // const provider = new Web3.providers.HttpProvider(getInfura());
    // alert(initWeb3().version);
    console.log(initWeb3());
    const daoport = new DaoPort(initWeb3(), network_Name);
    // dao.account = account;
    const nftMasterchef = "0x5B78867B0ecC41170e6A1A8A418B8dC1890b0F18";
    const pid = 0;
    // const pid = item.poolInfo.pid;
    const owner = "0xC2C304a0aA108428bA15BD5357EE069ea055e6F5";
    const maxTokenId = 100;
    var parameters = {
        pid,
        owner,
    };
    const masterChefInfo = await daoport.getNFTMasterChefInfos(parameters);
    // alert(masterChefInfo);

    // console.log("document=== masterchefinfo: pid", pid, masterChefInfo);
    if (handleMasterChefInfo) {
        handleMasterChefInfo(masterChefInfo, item, index);
    }
}

export async function approveNFTAction(item, getIsApproveNFT, index, isOnlyGetApprove) {
    const daoport = new DaoPort(initWeb3(), network_Name);
    const owner = "0xC2C304a0aA108428bA15BD5357EE069ea055e6F5";
    const operator = "0x1Eaf354dc6804da13F26E9Bf9300De296EFE59A0";
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
    } catch (error) { }
}


export async function approveWNFTAction(item, getIsApproveNFT, index, isOnlyGetApprove) {
    const daoport = new DaoPort(initWeb3(), network_Name);
    const owner = "0xC2C304a0aA108428bA15BD5357EE069ea055e6F5";
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
    } catch (error) { }
}


export async function getBonusRewardAction(item, handleGetBonusReward, index) {

    ///获取分红，奖励
    const owner = "0x979488515a1bcF8CFEcdDa28a3d0B818C8E888cB";
    const wnftContract = "0x1Eaf354dc6804da13F26E9Bf9300De296EFE59A0";
    const pid = 0;
    const maxTokenId = 100;
    var parameters = {
        wnftContract,
        owner,
        maxTokenId
    };
    const daoport = new DaoPort(initWeb3(), network_Name);
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






