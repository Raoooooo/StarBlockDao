
// 是否是生产环境 0否 1是(需手动修改)
export function getProdcutMode() {
    return 0;
}
// 是否是debug模式
export function getDebugMode() {
    return 1;
}

export function getRequestBaseUrl() {
    if (getProdcutMode() == 0) {
        return "/api";
    } else {

    }

}

export function web3ProviderUrl() {
    if (getProdcutMode() == 0) {
        if (window.location.href.startsWith("http://localhost:8080")) {
            return "http://localhost:8080";
        } if (window.location.href.startsWith("http://localhost:8081")) {
            return "http://localhost:8081";
        } else if (window.location.href.startsWith("http://192.168.1.61:8080")) {
            return "http://192.168.1.61:8080"
        }
        else if (window.location.href.startsWith("http://192.168.1.61:8081")) {
            return "http://192.168.1.61:8081"
        }

    } else {

    }
}


export function nftMasterchefAddress() {
    if (getProdcutMode() == 0) {
        return "0x5B78867B0ecC41170e6A1A8A418B8dC1890b0F18"

    } else {
        return "0x5B78867B0ecC41170e6A1A8A418B8dC1890b0F18"
    }
}

export function getChainWebUrl(chainID, transationHash) {
    if (chainID == 56) {
        return "https://bscscan.com/tx/" + transationHash;
    } else if (chainID == -17) {
        return "https://rinkeby.etherscan.io/tx/" + transationHash;
    } else {
        return "https://etherscan.io/tx/" + transationHash;
    }
}



export function getEtherscanOfCollection(chainID, contractAddress) {
    if (chainID == 4) {
        return "https://rinkeby.etherscan.io/address/" + contractAddress;
    } else {
        return "https://etherscan.io/address/" + contractAddress;
    }
}

export function getEtherscanOfNFT(chainID, contractAddress, tokenID) {
    if (chainID == 4) {
        return "https://rinkeby.etherscan.io/token/" + contractAddress + tokenID + "#inventory";
    } else {
        return "https://etherscan.io/address/" + contractAddress + tokenID + "#inventory";
    }
}

export function getOpenSeaOfCollection(chainID, name) {
    if (chainID == 4) {
        return "https://testnets.opensea.io/collection/" + name;
    } else {
        return "https://opensea.io/collection/" + name;
    }
}

export function getOpenSeaOfNFT(chainID, tokenID) {
    if (chainID == 4) {
        return "https://testnets.opensea.io/assets/" + tokenID;
    } else {
        return "https://opensea.io/collection/assets/" + tokenID;
    }
}


export function getSurpportChainId() {
    if (getProdcutMode() == 1) {
        return 1;
    }
    if (getProdcutMode() == 0) {
        return 4;
    }
}



