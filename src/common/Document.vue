<template>
  <div class="contentBack">
    <button @click="sendTransactionAction">发起交易</button>

    <h2 id="info"></h2>

    <button id="button" @click="getInfoAction">获取</button>
    <button id="button" @click="collectionContrantAction">collection合约部署</button>
    <button id="button" @click="mintAction">mint</button>

    <button id="button" @click="getHashAction">获取hash</button>
    <button id="button" @click="loginOutAction">退出登录</button>

    <button id="button" @click="webContrantAction1">web部署合约1</button>
    <button id="button" @click="exchangeAction">交易合约</button>
    <button id="button" @click="createSellOrderAction">生成sell订单</button>
    <button id="button" @click="createWallet">初始化钱包</button>
    <button id="button" @click="ethSignButtonAction(true)">盲盒/白名单签名</button>
    <button id="button" @click="recipientButtonAction">指定领取签名</button>
    <button id="button" @click="cancelOrderAction">取消订单</button>
    <button id="button" @click="batchCancleOrderAction">批量取消订单</button>
    <button id="button" @click="getFromTokenIdAction">获取FromTokenId</button>
    <button id="button" @click="validateOrder">验证订单</button>
    <button id="button" @click="ethSignMarket(true)">二级市场签名</button>
    <button id="button" @click="approveHandle">授权操作</button>
    <button id="button" @click="approveERC20Handle">授权ERC20</button>
    <button id="button" @click="daoportAction">dao获取 pool数据</button>
    <button id="button" @click="daoporApprovedtAction">dao授权</button>
    <button id="button" @click="daoporDeposit">dao deposit</button>
    <button id="button" @click="daoporWithdraw">dao withdraw</button>
    <button id="button" @click="daoporHarvest">dao 领取奖励分红</button>
    <button id="button" @click="daoportPending">dao pending</button>
  </div>
</template>

<script>
import * as Web3 from "web3";

// var web3  = require('web3')

import { DaoPort } from "./starblockdao-js/lib/daoport";
import { Network, Web3Callback } from "./starblockdao-js/lib/types";

var network_Name = Network.Rinkeby;

import { getLocalStorage, setLocalStorage, isLogin } from "@/common/utils";
import AppVue from "../App.vue";
import Web3Modal from "web3modal";
import { providerOptions } from "@/common/web3Config";

export var wyvernExchange;
export var providerInstance;
export var protocolInstance;
var accounts;
var daoport;

export default {
  created() {
    console.log("ContractAbi*****11111", ContractAbi);
  },
  data() {
    return {
      dialogVisible: false,
      imgDataUrl: ""
    };
  },

  components: {
    // 'my-upload': myUpload
  },

  methods: {
    initWeb3() {
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
        // web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8080"));
        const PROVIDER_URL = "https://rinkeby.infura.io/v3/7581b5aab9b4489ba1517a3e06e84280";
        web3 = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL));
      }
      return web3;
    },

    async getDaoPort(account) {
      //主网 1： 测试：4
      daoport = new DaoPort(this.initWeb3(), 4);
      daoport.setAccount(account);
      const PROVIDER_URL = "https://rinkeby.infura.io/v3/7581b5aab9b4489ba1517a3e06e84280";
      const onlyReadWeb3 = new Web3(new Web3.providers.HttpProvider(PROVIDER_URL));
      daoport.setOnlyReadWeb3Provider(onlyReadWeb3);
    },

    async getAccounts() {
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
    },

    async exchangeAction() {
      const { web3 } = window;
      var initWeb3 = this.initWeb3();
      var accountAddress = web3.eth.defaultAccount;

      if (!providerInstance) {
        providerInstance = new Web3.providers.HttpProvider(
          "https://rinkeby.infura.io/v3/c1b0dbb2fcf445278b966cc102873180"
        );
      }

      if (!protocolInstance) {
        protocolInstance = new WyvernProtocol(providerInstance, {
          network: network_Name
        });
      }

      const provider = new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/v3/c1b0dbb2fcf445278b966cc102873180"
      );

      const seaport = new OpenSeaPort(provider, {
        networkName: network_Name
      });

      //版权费用接收地址，一级市场没有版权费
      //seaport.feeRecipientAddress = NULL_ADDRESS
      seaport.feeRecipientAddress = "0x594676b9d1E84e986d161849082afCFB3718e439".toLowerCase();

      //获取order
      var order;
      //获取签名order
      var signOrder = JSON.parse(getLocalStorage("orderSignature"));
      //指定购买签名order
      var buyAddressSignOrder = JSON.parse(getLocalStorage("buyerAddressOrderSignature"));

      //二级市场
      var signMarket = JSON.parse(getLocalStorage("signMarket"));
      signMarket = null;

      //erc20授权
      if (!isEther) {
        const erc20Approve = await this.approveERC20Handle();
        if (!erc20Approve) {
          console.log("erc20 token 授权失败！！！");
          return;
        }
      }

      if (RecipientCollectionAddress != NULL_ADDRESS && OrderSaleKind == 0) {
        await this.createBuyAddressSellOrderAction();
        order = JSON.parse(getLocalStorage("BuyAddressSellOrder"));
        order = {
          ...order,
          r: buyAddressSignOrder.r,
          s: buyAddressSignOrder.s,
          v: buyAddressSignOrder.v
        };
      } else if (signMarket && OrderSaleKind == 0) {
        //二级市场

        await this.ethSignMarket(false);
        order = JSON.parse(getLocalStorage("noSignMarketOrder"));
        order = {
          ...order,
          r: signMarket.r,
          s: signMarket.s,
          v: signMarket.v
        };
      } else {
        // 随机购买

        await this.ethSignButtonAction(false);
        order = JSON.parse(getLocalStorage("noOrderSignature"));
        order = {
          ...order,
          r: signOrder.r,
          s: signOrder.s,
          v: signOrder.v
        };
      }

      var recipientAddress = accountAddress;

      const matchingOrder = await seaport._makeMatchingOrder({
        order,
        accountAddress,
        recipientAddress
      });
      const { buy, sell } = assignOrdersToSides(order, matchingOrder);
      console.log("buy/sell **********", buy, sell);

      const metadata = await seaport._getMetadata(order);
      const args = await seaport._atomicMatch({ buy, sell, accountAddress, metadata });

      if (args == null) {
        console.log("StarBlock交易失败");
        return;
      }

      var uintsArr = args[1].map(function(elem) {
        let e;
        if (typeof elem === "string" || elem instanceof String) {
          e = new BigNumber(elem);
          elem = e;
        }
        return elem.toFixed();
      });

      var len = args.length - 1;
      if (args[len].hasOwnProperty("value")) {
        // if (typeof args[len]["value"] != undefined) {
        //  let value = args[len]["value"]
        //   args[len]["value"] = value.toFixed()
        // }
        // args[len]["value"] = "0x0"
      }

      if (args[len].hasOwnProperty("gasPrice")) {
        let gasPrice = args[len]["gasPrice"];
        args[len]["gasPrice"] = gasPrice.toFixed();
      }
      console.log("arges/uintsArr**********", args, uintsArr);

      const web3ContractInstance = protocolInstance.wyvernExchange.web3ContractInstance;
      var MyContract = new initWeb3.eth.Contract(
        web3ContractInstance.abi,
        web3ContractInstance.address
      );

      // const estimatedGas = await MyContract.methods
      //   .atomicMatch_(
      //     args[0],
      //     uintsArr,
      //     args[2],
      //     args[3],
      //     args[4],
      //     args[5],
      //     args[6],
      //     args[7],
      //     args[8],
      //     args[9],
      //     args[10]
      //   )
      //   .estimateGas(args[len]);

      // var number = new BigNumber(3);
      // number = number.toFixed();
      // const meanGas = await getCurrentGasPrice(initWeb3);
      // const weiToAdd = initWeb3.utils.toWei(number, "gwei");

      // const gasPrice = parseInt(meanGas) + parseInt(weiToAdd);
      // const gas = Math.ceil(estimatedGas * DEFAULT_GAS_INCREASE_FACTOR);

      var txnData = args[len];
      // txnData = {
      //   ...txnData,
      //   gas,
      //   gasPrice
      // };

      MyContract.methods
        .atomicMatch_(
          args[0],
          uintsArr,
          args[2],
          args[3],
          args[4],
          args[5],
          args[6],
          args[7],
          args[8],
          args[9],
          args[10]
        )
        .send(txnData)
        .then(function(receipt) {
          console.log("transactionHash*********", receipt);
          const recipient = { isRecipient: false };
          setLocalStorage("recipient", recipient);
        });
    },

    getInfura() {
      let infura;
      if (network_Name === Network.Main) {
        infura = "https://mainnet.infura.io/";
      } else if (network_Name === Network.Rinkeby) {
        infura = "https://rinkeby.infura.io/";
      }
      infura += "v3/c1b0dbb2fcf445278b966cc102873180";
      return infura;
    },

    async createWallet() {
      const { web3 } = window;
      var initWeb3 = this.initWeb3();
      var accountAddress = web3.eth.defaultAccount;

      if (!providerInstance) {
        providerInstance = new Web3.providers.HttpProvider(this.getInfura());
      }

      if (!protocolInstance) {
        protocolInstance = new WyvernProtocol(providerInstance, {
          network: network_Name
        });
      }

      const provider = new Web3.providers.HttpProvider(this.getInfura());
      const seaport = new OpenSeaPort(provider, {
        networkName: network_Name
      });

      const web3ContractInstance = protocolInstance.wyvernProxyRegistry.web3ContractInstance;
      var MyContract = new initWeb3.eth.Contract(
        web3ContractInstance.abi,
        web3ContractInstance.address
      );

      ///取链上钱包地址
      const proxyAddress = await seaport._getProxy(accountAddress);

      if (!proxyAddress) {
        ///初始化钱包
        var txnData = { from: accountAddress };
        // const estimatedGas = await MyContract.methods.registerProxy().estimateGas(txnData);

        // var number = new BigNumber(3);
        // number = number.toFixed();
        // const meanGas = await getCurrentGasPrice(initWeb3);
        // const weiToAdd = initWeb3.utils.toWei(number, "gwei");

        // const gasPrice = parseInt(meanGas) + parseInt(weiToAdd);
        // const gas = Math.ceil(estimatedGas * DEFAULT_GAS_INCREASE_FACTOR);
        // console.log("*****gasprice*****", gasPrice, gas);

        // txnData = {
        //   ...txnData,
        //   gas: gas,
        //   gasPrice: gasPrice
        // };

        MyContract.methods
          .registerProxy()
          .send(txnData)
          .on("error", function(error) {
            console.log("error*********", error);
          })
          .then(function(receipt) {
            console.log("transactionHash*********", receipt);
          });
      } else {
        console.log("已有钱包地址");
      }
    },

    async createBuyAddressSellOrderAction() {
      const { web3 } = window;
      var initWeb3 = this.initWeb3();
      var from = web3.eth.defaultAccount;

      const provider = new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/v3/c1b0dbb2fcf445278b966cc102873180"
      );
      const seaport = new OpenSeaPort(provider, {
        networkName: network_Name
      });

      //版权费用接收地址，一级市场没有版权费
      //seaport.feeRecipientAddress = NULL_ADDRESS
      seaport.feeRecipientAddress = "0x594676b9d1E84e986d161849082afCFB3718e439".toLowerCase();

      const startAmount = 0.002;
      const accountAddress = CreaterCollectionAddress;
      const listingTime = buyAddressListingTime;
      const expirationTime = 0;
      const orderSaleKind = OrderSaleKind;
      const salt = makeBigNumber("984331428158744064");
      const orderNoSignature = true;
      const buyerAddress = RecipientCollectionAddress.toLowerCase();

      const asset = {
        quantity: 1,
        tokenAddress: CollectionAddress,
        defaultColletion: DefaultColletion,
        tokenId: FromTokenId,
        saleQuantity: SaleQuantity,
        maxPerAddressDuringMint: MaxPerAddressDuringMint,
        callFunctionName: CallFunctionName
      };

      var parameters = {
        asset,
        accountAddress,
        startAmount,
        listingTime,
        expirationTime,
        orderSaleKind,
        salt,
        orderNoSignature,
        buyerAddress
      };

      const order = await seaport.createSellOrder(parameters);
      console.log("BuyAddressSellOrder**********", order);
      setLocalStorage("BuyAddressSellOrder", order);
    },

    async recipientButtonAction() {
      const { web3 } = window;
      var initWeb3 = this.initWeb3();
      var from = web3.eth.defaultAccount;

      const provider = new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/v3/c1b0dbb2fcf445278b966cc102873180"
      );
      const seaport = new OpenSeaPort(provider, {
        networkName: network_Name
      });

      //版权费用接收地址，一级市场没有版权费
      //seaport.feeRecipientAddress = NULL_ADDRESS
      seaport.feeRecipientAddress = "0x594676b9d1E84e986d161849082afCFB3718e439".toLowerCase();

      const startAmount = 0.002;
      const accountAddress = CreaterCollectionAddress;
      const listingTime = buyAddressListingTime;
      const expirationTime = 0;
      const orderSaleKind = OrderSaleKind;
      const salt = makeBigNumber("984331428158744064");
      const orderNoSignature = false;
      const buyerAddress = RecipientCollectionAddress.toLowerCase();

      const asset = {
        quantity: 1,
        tokenAddress: CollectionAddress,
        defaultColletion: DefaultColletion,
        tokenId: FromTokenId,
        saleQuantity: SaleQuantity,
        maxPerAddressDuringMint: MaxPerAddressDuringMint,
        callFunctionName: CallFunctionName
      };

      if (DefaultColletion) {
        asset = {
          ...asset,
          collectionId: 1239030300
        };
      }

      var parameters = {
        asset,
        accountAddress,
        startAmount,
        listingTime,
        expirationTime,
        orderSaleKind,
        salt,
        orderNoSignature,
        buyerAddress
      };

      if (!isEther) {
        parameters = {
          ...parameters,
          paymentTokenAddress
        };
      }

      const order = await seaport.createSellOrder(parameters);

      console.log("buyerAddressOrderSignature**********", order);
      setLocalStorage("buyerAddressOrderSignature", order);
    },

    //一级市场签名 参数：isSign（是否签名）
    async ethSignButtonAction(isSign) {
      const { web3 } = window;
      var initWeb3 = this.initWeb3();
      var from = web3.eth.defaultAccount;

      const provider = new Web3.providers.HttpProvider(this.getInfura());
      const seaport = new OpenSeaPort(provider, {
        networkName: network_Name
      });

      //版权费用接收地址，一级市场没有版权费
      seaport.feeRecipientAddress = "0x594676b9d1E84e986d161849082afCFB3718e439".toLowerCase();
      seaport.feeRecipientfee = 0;
      seaport.makerProtocolFee = 0;

      let asset = {
        quantity: Quantity,
        tokenAddress: CollectionAddress,
        defaultColletion: DefaultColletion,
        tokenId: FromTokenId,
        saleQuantity: SaleQuantity,
        maxPerAddressDuringMint: MaxPerAddressDuringMint,
        callFunctionName: CallFunctionName
      };

      //统一collection
      if (DefaultColletion) {
        asset = {
          ...asset,
          collectionId: 1239030300
        };
      }

      var startAmount = 0.001;
      if (!isEther) {
        startAmount = 30;
      }

      const accountAddress = CreaterCollectionAddress;
      const listingTime = 1641950350;
      const expirationTime = 0;
      const orderSaleKind = OrderSaleKind;
      const salt = makeBigNumber("554331428158744064");
      const orderNoSignature = !isSign;

      let parameters = {
        asset,
        accountAddress,
        startAmount,
        listingTime,
        expirationTime,
        orderSaleKind,
        salt,
        orderNoSignature
      };

      if (isWhiteList) {
        parameters = {
          ...parameters,
          buyerAddress: WhiteListAddress
        };
      }

      if (!isEther) {
        parameters = {
          ...parameters,
          paymentTokenAddress
        };
      }

      const order = await seaport.createSellOrder(parameters);

      if (!order) {
        console.log("签名失败");
        return;
      }

      if (isSign) {
        setLocalStorage("orderSignature", order);
      } else {
        setLocalStorage("noOrderSignature", order);
      }
      console.log("signOrder**********", order);
    },

    //二级市场签名 参数：isSign（是否签名）
    async ethSignMarket(isSign) {
      const { web3 } = window;
      var initWeb3 = this.initWeb3();
      var from = web3.eth.defaultAccount;

      const provider = new Web3.providers.HttpProvider(this.getInfura());
      const seaport = new OpenSeaPort(provider, {
        networkName: network_Name
      });

      seaport.feeRecipientAddress = "0x594676b9d1E84e986d161849082afCFB3718e439".toLowerCase();
      //版权费*10000 （如果版权费是10%，则10%*10000 = 1000）
      seaport.feeRecipientfee = 1000;
      seaport.makerProtocolFee = 2000;
      seaport.isMarket = true;
      const startAmount = 0.01;
      const accountAddress = CreaterCollectionAddress;
      const listingTime = ethSignMarketListingTime;
      const expirationTime = 1651161600;
      const orderSaleKind = OrderSaleKind;
      const salt = makeBigNumber("930658657940496516");
      const orderNoSignature = !isSign;

      const asset = {
        tokenAddress: CollectionAddress,
        tokenId: FromTokenId,
        callFunctionName: "transferFrom"
      };

      var parameters = {
        asset,
        accountAddress,
        startAmount,
        listingTime,
        expirationTime,
        orderSaleKind,
        salt,
        orderNoSignature
      };

      if (!isEther) {
        parameters = {
          ...parameters,
          paymentTokenAddress
        };
      }

      if (isSign) {
        const order = await seaport.createSellOrder(parameters);
        console.log("signMarket**********", order);
        setLocalStorage("signMarket", order);
      } else {
        const order = await seaport.createSellOrder(parameters);
        console.log("noSignMarketOrder**********", order);
        setLocalStorage("noSignMarketOrder", order);
      }
    },

    //验证Sell订单
    async validateOrder() {
      const provider = new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/v3/c1b0dbb2fcf445278b966cc102873180"
      );

      const seaport = new OpenSeaPort(provider, {
        networkName: network_Name
      });

      var signMarket = JSON.parse(getLocalStorage("signMarket"));
      await this.ethSignMarket(false);
      var order = JSON.parse(getLocalStorage("noSignMarketOrder"));
      order = {
        ...order,
        r: signMarket.r,
        s: signMarket.s,
        v: signMarket.v
      };

      const validate = await seaport._validateOrder(order);
      console.log("validate**********", validate);

      if (validate) {
        //订单验证成功
      } else {
        //订单验证失败
      }
    },

    //授权
    async approveHandle() {
      const provider = new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/v3/c1b0dbb2fcf445278b966cc102873180"
      );

      const seaport = new OpenSeaPort(provider, {
        networkName: network_Name
      });

      const asset = {
        tokenAddress: CollectionAddress,
        tokenId: FromTokenId,
        callFunctionName: "transferFrom"
      };

      const accountAddress = CreaterCollectionAddress;

      //获取

      //取链上钱包地址
      const proxyAddress = await seaport._getProxy(accountAddress);

      if (!proxyAddress) {
        console.log("请初始化钱包");
        return;
      }

      //查看链上资产
      const wyAsset = getWyvernAsset(seaport._getSchema(asset.schemaName), asset);
      const schemaName = "ERC721";
      const chainOptions = {
        accountAddress,
        proxyAddress,
        wyAsset,
        schemaName
      };

      let isCheckAsset = false;
      try {
        const checkAsset = await seaport._ownsAssetOnChain(chainOptions);
        console.log("checkAsset callback ==", checkAsset);
        isCheckAsset = checkAsset;
      } catch (err) {
        // 捕获异常错误，返回错误

        console.log("try--catch-checkAsset-", err);
      }

      if (!isCheckAsset) {
        console.log("-----checkAsset is false---");
        return;
      }

      console.log("-----checkAsset is true---");

      const contractsWithApproveAll = new Set();
      const options = {
        tokenId: asset.tokenId.toString(),
        tokenAddress: asset.tokenAddress,
        accountAddress,
        proxyAddress,
        schemaName,
        skipApproveAllIfTokenAddressIn: contractsWithApproveAll
      };
      seaport.checkApproved = true;
      const isApprove = await seaport.approveSemiOrNonFungibleToken(options);

      console.log("isApprove = ", isApprove);
      if (isApprove) {
        // 已授权
      } else {
        // 未已授权

        try {
          seaport.checkApproved = false;
          const txHash = await seaport.approveSemiOrNonFungibleToken(options);
          console.log("txHash = ", txHash);
        } catch (err) {
          // 授权失败，捕获到错误，返回错误

          console.log("try--catch--", err);
        }
      }
    },

    async approveERC20Handle() {
      if (paymentTokenAddress === NULL_ADDRESS) return;

      var initWeb3 = this.initWeb3();
      var myAccount = web3.eth.defaultAccount;

      let startAmount = 30;
      startAmount = Number(initWeb3.utils.toWei(startAmount.toFixed(), "ether"));

      var wyvernTokenTransferProxy = WyvernProtocol.getTokenTransferProxyAddress(network_Name);
      //是否授权
      let approvedAmount = await contract.methods
        .allowance(myAccount, wyvernTokenTransferProxy)
        .call();
      approvedAmount = Number(approvedAmount);

      if (approvedAmount >= startAmount) {
        console.log("账户已授权");
        return true;
      }

      //
      var txnData = { from: myAccount };
      return await contract.methods
        .approve(wyvernTokenTransferProxy, WyvernProtocol.MAX_UINT_256.toString())
        .send(txnData);
    },

    async webContrantAction1() {
      // web部署
      const { web3 } = window;
      var from = web3.eth.accounts[0];
      var initWeb3 = this.initWeb3();
      var from = web3.eth.defaultAccount;
      console.log(initWeb3);
      console.log(from);

      const contractABI = BytecodeJson.abi;
      const bytecode = "0x" + BytecodeJson.object;
      console.log("byteCode*****", bytecode, contractABI);
      // let gasEstimate = web3.eth.estimateGas({data: bytecode});
      // console.log("gasEstimate*****", gasEstimate);
      // return;
      //2.3 异步方式，部署合约

      let infura;
      if (network_Name === Network.Main) {
        infura = "https://mainnet.infura.io/";
      } else if (network_Name === Network.Rinkeby) {
        infura = "https://rinkeby.infura.io/";
      }
      infura += "v3/c1b0dbb2fcf445278b966cc102873180";

      if (!providerInstance) {
        providerInstance = new Web3.providers.HttpProvider(infura);
      }

      if (!protocolInstance) {
        protocolInstance = new WyvernProtocol(providerInstance, {
          network: network_Name
        });
      }
      const web3ContractInstance = protocolInstance.wyvernProxyRegistry.web3ContractInstance;

      const contract = new initWeb3.eth.Contract(contractABI);

      let options = {
        data: bytecode,
        arguments: [
          "Demo10100",
          "Demo10100",
          web3ContractInstance.address,
          100,
          10000,
          "https://meta.rebelkidsparade.com/meta/"
        ]
      };

      const provider = new Web3.providers.HttpProvider(infura);
      const seaport = new OpenSeaPort(provider, {
        networkName: network_Name
      });

      const estimatedGas = await contract.deploy(options).estimateGas();

      // var number = new BigNumber(3);
      // number = number.toFixed();
      // const meanGas = await getCurrentGasPrice(initWeb3);
      // const weiToAdd = initWeb3.utils.toWei(number, "gwei");

      // const gasPrice = parseInt(meanGas) + parseInt(weiToAdd);
      // const gas = Math.ceil(estimatedGas * DEFAULT_GAS_INCREASE_FACTOR * 1.1);
      // console.log("*****gasprice*****", gasPrice, gas);

      const gas = seaport._correctGasAmount(estimatedGas);

      var txnData = { from: from };
      // txnData = {
      //   ...txnData,
      //   gas
      //   // gasPrice
      // };

      const deploy = async () => {
        // Get access to all accounts linked to mnemonic
        // Make sure you have metamask installed.
        // const accounts = await web3.eth.getAccounts();
        // console.log("Attempting to deploy from account", accounts[0]);

        // Pass initial gas and account to use in the send function
        const result = await contract
          .deploy(options)
          .send(txnData)
          .on("transactionHash", tH => console.log("on--transactionHash:==>", tH))
          .then(function(res) {
            console.log("then--", res.options.address.toLowerCase());
          })
          .catch(function(err) {
            console.log("catch--", err);
          });
      };
      deploy();
    },

    async cancelOrderAction() {
      const { web3 } = window;
      var initWeb3 = this.initWeb3();
      var from = web3.eth.defaultAccount;

      const provider = new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/v3/c1b0dbb2fcf445278b966cc102873180"
      );
      const seaport = new OpenSeaPort(provider, {
        networkName: network_Name
      });

      //获取签名order
      var order = JSON.parse(getLocalStorage("signMarket"));
      var accountAddress = from;

      try {
        const cancelOrder = await seaport.cancelOrder({ order, accountAddress });

        if (cancelOrder) {
          console.log("cancelOrder--", cancelOrder);
        }
      } catch (err) {
        //捕获到错误，返回错误，该订单若已取消过，重复取消，会报异常

        console.log("try--catch--", err);
      }
    },

    async batchCancleOrderAction() {
      const { web3 } = window;
      var initWeb3 = this.initWeb3();
      var from = web3.eth.defaultAccount;

      const provider = new Web3.providers.HttpProvider(
        "https://rinkeby.infura.io/v3/c1b0dbb2fcf445278b966cc102873180"
      );
      const seaport = new OpenSeaPort(provider, {
        networkName: network_Name
      });

      var accountAddress = from;

      try {
        const bulkCancel = await seaport.bulkCancelExistingOrders({ accountAddress });

        if (bulkCancel) {
          console.log("bulkCancel--", bulkCancel);
        }
      } catch (err) {
        // 捕获到错误，返回错误，该订单若已取消过，重复取消，会报异常

        console.log("try--catch--", err);
      }
    },

    async getFromTokenIdAction() {
      const { web3 } = window;
      var initWeb3 = this.initWeb3();
      var from = web3.eth.defaultAccount;

      var MyContract = new initWeb3.eth.Contract(BytecodeJson.abi, CollectionAddress);
      MyContract.methods
        .totalSupply()
        .call()
        .then(function(res) {
          console.log("Contract result", res);
          //FromTokenId值在res基础上加1
          var FromTokenId = res + 1;
        })
        .catch(function(err) {
          console.log(err);
        });

      // MyContract.methods.numberMinted("0x31f8838f91617091Ec2d8303AA08f88967613bb1").call().then(function(res){
      //    console.log("numberMinted", res);
      //  }).catch(function(err) {
      //     console.log(err);
      //  });
    },

    async daoportAction() {
      if (!accounts) {
        await this.getAccounts();
      }

      if (!daoport) {
        this.getDaoPort(accounts[0]);
      }

      let owner = "0x0000000000000000000000000000000000000000";

      //正式
      // let poolsRangeTokenIds = [
      //   [0, 9999],
      //   [0, 4999],
      //   [0, 4999],
      //   [0, 9999],
      //   [1, 8584],
      //   [0, 9999],
      //   [0, 9998],
      //   [1, 8888],
      //   [0, 9999],
      //   [0, 9999]
      // ];

      //测试

      let poolsRangeTokenIds = [
        [0, 99],
        [0, 99],
        [0, 99],
        [0, 99],
        [0, 99],
        [0, 99],
        [0, 99],
        [1, 100],
        [0, 99],
        [0, 99]
      ];

      for (var i = 0; i < poolsRangeTokenIds.length; i++) {
        const rangeTokenIds = poolsRangeTokenIds[i];
        const pid = i;
        let parameters = {
          pid,
          owner,
          rangeTokenIds
        };
        const masterChefInfo = await daoport.getNFTMasterChefInfos(parameters);
        console.log("第个daoportAction=== masterchefinfo:", i, masterChefInfo);

        //获取可抵押tokens
        const contractAddress = masterChefInfo.nft;
        owner = "0x0000000000000000000000000000000000000000";
        parameters = {
          contractAddress,
          owner,
          rangeTokenIds
        };
        const tokenIds = await daoport.ownedNFTTokens(parameters);
        console.log("第个 daoportAction=== tokenIds:", i, tokenIds);
        //  setLocalStorage("masterChefInfo", masterChefInfo);
      }

      // const masterChefInfo = await daoport.getNFTMasterChefInfos(parameters);
      // // console.log("daoportAction=== masterchefinfo:", masterChefInfo);
      // // // 获取解抵押tokens
      // // let contractAddress = masterChefInfo.poolInfo[0];

      // //  //获取可抵押tokens
      // let contractAddress = masterChefInfo.nft;

      // parameters = {
      //   contractAddress,
      //   owner,
      //   maxTokenId
      // };
      // const tokenIds = await daoport.ownedNFTTokens(parameters);
      // console.log("daoportAction=== tokenIds:", tokenIds);
    },

    async daoporApprovedtAction() {
      if (!accounts) {
        await this.getAccounts();
      }
      if (!daoport) {
        this.getDaoPort(accounts[0]);
      }

      const masterChefInfo = JSON.parse(getLocalStorage("masterChefInfo"));
      const owner = accounts[0];
      const nftContract = masterChefInfo.nft;
      const wnftContract = masterChefInfo.poolInfo[0];
      const isApproveNFT = true;

      const parameters = {
        owner,
        nftContract,
        wnftContract,
        isApproveNFT
      };

      // const isApprove = await daoport.isApprovedForAll(parameters);
      // console.log("daoporApprovedtAction==", isApprove);

      // if (isApprove) {
      //   console.log("已授权wnft合约");
      //   return true;
      // }

      try {
        const txHash = await daoport.setApprovalForAll(parameters);
        console.log("daoporApprovedtAction --txHash", txHash);
      } catch (error) {}
    },

    async daoporDeposit() {
      if (!accounts) {
        await this.getAccounts();
      }

      if (!daoport) {
        this.getDaoPort(accounts[0]);
      }
      const owner = accounts[0];
      const pid = 0;
      const tokenIds = [4, 5];
      const parameters = {
        pid,
        tokenIds
      };

      try {
        const txHash = await daoport.deposit(parameters);
        console.log("daoporDeposit==txhash", txHash);
      } catch (error) {}
    },

    async daoporWithdraw() {
      if (!accounts) {
        await this.getAccounts();
      }
      if (!daoport) {
        this.getDaoPort(accounts[0]);
      }
      const owner = accounts[0];
      const pid = 0;
      const tokenIds = [2, 3];
      const parameters = {
        pid,
        tokenIds
      };

      try {
        const txHash = await daoport.withdraw(parameters);
        console.log("daoporWithdraw==txhash", txHash);
      } catch (error) {}
    },

    async daoporHarvest() {
      if (!accounts) {
        await this.getAccounts();
      }
      if (!daoport) {
        this.getDaoPort(accounts[0]);
      }
      const pid = 0;
      const to = accounts[0];
      const wnftTokenIds = [2, 3];
      const parameters = {
        pid,
        to,
        wnftTokenIds
      };

      try {
        const txHash = await daoport.harvest(parameters);
        console.log("daoporHarvest==txhash", txHash);
      } catch (error) {}
    },

    async daoportPending() {
      if (!accounts) {
        await this.getAccounts();
      }
      if (!daoport) {
        this.getDaoPort(accounts[0]);
      }
      const owner = accounts[0];
      const pid = 1;
      const tokenIds = [0];
      const parameters = {
        pid,
        tokenIds
      };

      await daoport.pending(parameters, function handle(error, result) {
        console.log("error result==txhash", error, result);
      });
    },

    toggleShow() {
      this.show = !this.show;
      alert(this.show);
    },
    sendTransactionAction() {
      sendTransactionAction();
    },

    loginOutAction() {
      setLocalStorage("account", "");
      setLocalStorage("isLogin", "");
      // setLocalStorage("isLogin", "");
      // this.$emit("loginOut");
      //触发全局事件globalEvent
      this.$bus.$emit("loginOut", "1");
    },
    /**
     * crop success
     *
     * [param] imgDataUrl
     * [param] field
     */
    cropSuccess(imgDataUrl, field) {
      console.log("-------- crop success --------");
      this.imgDataUrl = imgDataUrl;
    },
    /**
     * upload success
     *
     * [param] jsonData  server api return data, already json encode
     * [param] field
     */
    cropUploadSuccess(jsonData, field) {
      console.log("-------- upload success --------");
      console.log(jsonData);
      console.log("field: " + field);
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log(status);
      console.log("field: " + field);
    },
    cutDown(file, fileName, dataURL) {
      console.log("file**********", file);
      this.dialogVisible = false;
      this.imgDataUrl = file.dataURL;
      var data = this.convertBase64UrlToBlob(file.dataURL);
      console.log("imgData***********", data);
    },
    cutImg(data) {
      console.log("cutimg", data);
      // this.result = data
    },
    beforeUploadVideo(file) {
      console.log("file*********", file);
      var fileSize = file.size / 1024 / 1024 < 50;
      // if (
      //   [
      //     "video/mp4",
      //     "video/ogg",
      //     "video/flv",
      //     "video/avi",
      //     "video/wmv",
      //     "video/rmvb",
      //     "video/mov"
      //   ].indexOf(file.type) == -1
      // ) {
      //   this.$message.error("请上传正确的视频格式");
      //   return false;
      // }
      if (!fileSize) {
        this.$message.error("视频大小不能超过50MB");
        return false;
      }
      this.isShowUploadVideo = false;
    },

    //base64转Blob
    convertBase64UrlToBlob(urlData) {
      //去掉url的头，并转换为byte
      var split = urlData.split(",");
      var bytes = window.atob(split[1]);
      //处理异常,将ascii码小于0的转换为大于0
      var ab = new ArrayBuffer(bytes.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
      }
      return new Blob([ab], { type: split[0] });
    },
    change(event) {
      let image = document.getElementById("img"); //预览对象
      this.clip(event, {
        resultObj: image,
        aspectRatio: 1
      });
    }
  }
};
</script>

<style scoped>
.contentBack {
  margin-top: 2.5rem;
  width: 100%;
  height: 100%;

  /* background-color: aqua; */
}
.pText {
  margin-top: 2rem;
  margin-left: 0.75rem;
  margin-right: 0.75rem;
  font-size: 0.4rem;
}
.testImg {
  width: 180px;
  height: 180px;
  background-color: aqua;
}
img {
  display: block;
  width: 120px;
  height: 120px;
}
h3 {
  text-align: center;
}
h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
