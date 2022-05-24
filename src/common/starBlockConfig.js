
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
        }if (window.location.href.startsWith("http://localhost:8081")) {
            return "http://localhost:8081";
        }else if(window.location.href.startsWith("http://192.168.1.61:8080")){
            return "http://192.168.1.61:8080"
        }
        else if(window.location.href.startsWith("http://192.168.1.61:8081")){
            return "http://192.168.1.61:8081"
        }

    } else {

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


