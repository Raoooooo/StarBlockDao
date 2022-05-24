
import * as Web3 from "web3";
import { DaoPort } from "./starblockdao-js/lib/daoport";
import { Network } from "./starblockdao-js/lib/types";
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
        web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8080"));
        // const PROVIDER_URL = "https://rinkeby.infura.io/v3/c1b0dbb2fcf445278b966cc102873180";
        // web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL));
    }
    return web3;
}

export async function daoportAction() {
    // var account = web3.eth.defaultAccount;
    const provider = new Web3.providers.HttpProvider(getInfura());
    const daoport = new DaoPort(initWeb3(), network_Name);
    // dao.account = account;
    const nftMasterchef = "0x5B78867B0ecC41170e6A1A8A418B8dC1890b0F18";
    const pid = 0;
    const owner = "0x979488515a1bcF8CFEcdDa28a3d0B818C8E888cB";
    const maxTokenId = 100;
    var parameters = {
        nftMasterchef,
        pid,
        owner,
        maxTokenId
    };
    const masterChefInfo = await daoport.getNFTMasterChefInfos(parameters);
    // alert(masterChefInfo);
    console.log("document=== masterchefinfo:", masterChefInfo);
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