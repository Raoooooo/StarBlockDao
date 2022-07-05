<template>
  <div class="contentBack">
    <button @click="sendTransactionAction">发起交易</button>

    <h2 id="info"></h2>

    <button id="button" @click="getInfoAction">获取</button>
    <button id="button" @click="collectionContrantAction">collection合约部署</button>
    <button id="button" @click="mintAction">mint</button>

    <button id="button" @click="getHashAction">获取hash</button>
    <button id="button" @click="loginOutAction">退出登录</button>
    <button id="button" @click="daoportAction">dao获取 pool数据</button>
    <button id="button" @click="daoporApprovedtAction">dao授权</button>
    <button id="button" @click="daoporDeposit">deposit</button>
    <button id="button" @click="daoporWithdraw">withdraw</button>
    <button id="button" @click="daoporHarvest">领取奖励分红</button>
    <button id="button" @click="daoportPending">pending</button>
    <button id="button" @click="daoporClaim">claim</button>
    <button id="button" @click="daoportUpdateTradingRewards">updateTradingRewards</button>
    <button id="button" @click="daoportCanClaim">canClaim</button>
    <button id="button" @click="getTokenPrice">getTokenPrice</button>
    <button id="button" @click="getPoolInfo">getPoolInfo</button>
    <button id="button" @click="getAllPoolInfos">getAllPoolInfos</button>
    <button id="button" @click="getPoolInfosByNFTorWNFTs">getPoolInfosByNFTorWNFTs</button>
    <button id="button" @click="pendingAll">pendingAll</button>
    <button id="button" @click="harvestAll">harvestAll</button>
    <button id="button" @click="pendingByNFTorWNFT">pendingByNFTorWNFT</button>
    <button id="button" @click="pendingAllByWNFTTokenIds">pendingAllByWNFTTokenIds</button>
    <button id="button" @click="harvestAllByWNFTTokenIds">harvestAllByWNFTTokenIds</button>
    <button id="button" @click="ownedNFTsTokenIdsByPids">ownedNFTsTokenIdsByPids</button>
    <button id="button" @click="ownedWNFTsTokenIdsByPids">ownedWNFTsTokenIdsByPids</button>
    <button id="button" @click="ownedNFTsTokenIdsByNFTs">ownedNFTsTokenIdsByNFTs</button>
    <button id="button" @click="ownedNFTTokenIds">ownedNFTTokenIds</button>
    <button id="button" @click="getPoolInfosUserCanDeposit">getPoolInfosUserCanDeposit</button>
    <button id="button" @click="getPoolInfosUserDeposited">getPoolInfosUserDeposited</button>

    <button id="button" @click="deploy">部署合约</button>
    <button id="button" @click="getInfo">getInfo</button>
    <button id="button" @click="userCanMint">userCanMint</button>
    <button id="button" @click="updateWhitelistSaleConfig">updateWhitelistSaleConfig</button>
    <button id="button" @click="updatePublicSaleConfig">updatePublicSaleConfig</button>
    <button id="button" @click="addWhitelists">addWhitelists</button>
    <button id="button" @click="whitelistMint">whitelistMint</button>
    <button id="button" @click="publicMint">publicMint</button>
    <button id="button" @click="getCollectionInfo">getCollectionInfo</button>
  </div>
</template>

<script>
import * as Web3 from "web3";

// var web3  = require('web3')

import { DaoPort } from "./starblockdao-js/lib/daoport";
import { CollectionPort } from "./starblockdao-js/lib/collectionport";
import { Network, Web3Callback } from "./starblockdao-js/lib/types";

var network_Name = Network.Rinkeby;

import { getLocalStorage, setLocalStorage, isLogin } from "@/common/utils";
import AppVue from "../App.vue";
import Web3Modal from "web3modal";
import { providerOptions } from "@/common/web3Config";
import BigNumber from "bignumber.js";

export var wyvernExchange;
export var providerInstance;
export var protocolInstance;
var accounts;
var daoport;
var starblockport;

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

    async getStarBlockPort(account) {
      //主网 1： 测试：4
      starblockport = new CollectionPort(this.initWeb3(), 4);
      starblockport.setAccount(account);

      const starblockCollection = JSON.parse(getLocalStorage("starblockCollection"));
      const address = starblockCollection.address;
      if (!address || address.length === 0) {
        console.log("没有starblockCollection合约地址");
        return;
      }

      starblockport.setStarblockCollectionAddress(address);
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

    async daoporClaim() {
      if (!accounts) {
        await this.getAccounts();
      }
      if (!daoport) {
        this.getDaoPort(accounts[0]);
      }
      const treeIds = [0, 1];
      const amounts = [new BigNumber("1000000000000000000")];
      const merkleProofs = [
        [
          "0xcbcbac4280cffcff7f0ab9fbee42c2bde89eb7152a992f8dfa7869ab731dddd1",
          "0xe292aea4d359cc1769232f543ec72a01af30d6febc09444ee235930d4927e3cf"
        ]
      ];
      const parameters = {
        treeIds,
        amounts,
        merkleProofs
      };
      try {
        const txHash = await daoport.claim(parameters);
        console.log("daoporWithdraw==txhash", txHash);
      } catch (error) {}
    },

    async daoportUpdateTradingRewards() {
      if (!accounts) {
        await this.getAccounts();
      }
      if (!daoport) {
        this.getDaoPort(accounts[0]);
      }

      const treeIds = [0, 1];
      const merkleRoots = [
        "0x724fc33e3d1fa4521f25c4e7bbeadb2961478e44a3669bca2771ac4773524dd1",
        "0x2e199cb5c61a320d2aef610ede1658d0f13694285a9691e8f38b199ad781ebe2"
      ];
      const maxAmountsPerUser = [
        new BigNumber("1000000000000000000"),
        new BigNumber("1000000000000000000")
      ];
      const merkleProofsSafeGuards = [
        ["0xffb9dbc4c97d5710413f25e9aea8c1237992364dadeef55b2cd3ba54a6a020ad"],
        ["0xffb9dbc4c97d5710413f25e9aea8c1237992364dadeef55b2cd3ba54a6a020ad"]
      ];
      const parameters = {
        treeIds,
        merkleRoots,
        maxAmountsPerUser,
        merkleProofsSafeGuards
      };

      try {
        const txHash = await daoport.withdraw(parameters);
        console.log("daoporWithdraw==txhash", txHash);
      } catch (error) {}
    },

    async daoportCanClaim() {
      if (!accounts) {
        await this.getAccounts();
      }
      if (!daoport) {
        this.getDaoPort(accounts[0]);
      }
      // const user = accounts[0];
      const user = "0xC2C304a0aA108428bA15BD5357EE069ea055e6F5";
      const treeIds = [0];
      const amounts = [new BigNumber("2700000000000000000000")];
      const merkleProofs = [
        [
          "0x00df9c20e308813437794e99780d07ffc85031f98834205d1eae80fb474742c4",
          "0x6cc59680d52299e1b2da7489015860d4715b75afdc2a7a8a41f92c0868471240",
          "0xb71738afbba4a5ed17d0684a72ba7539a14196e6a4e93e3c764b62e1c1dc0820"
        ]
      ];
      const parameters = {
        user,
        treeIds,
        amounts,
        merkleProofs
      };
      await daoport.canClaim(parameters, function handle(error, result) {
        console.log("canClaim==error result", error, result);
      });
    },

    async getTokenPrice() {
      if (!accounts) {
        await this.getAccounts();
      }
      if (!daoport) {
        this.getDaoPort(accounts[0]);
      }

      const tokenPrice = await daoport.getTokenPrice();
      console.log("Document getTokenPrice:::", tokenPrice);
    },

    async getPoolInfo() {
      if (!accounts) {
        await this.getAccounts();
      }
      if (!daoport) {
        this.getDaoPort(accounts[0]);
      }

      const pid = 0;
      const user = accounts[0];
      const withOwnedNFTTokenIds = false;
      const parameters = {
        pid,
        user,
        withOwnedNFTTokenIds
      };
      const wrappedPoolInfo = await daoport.getPoolInfo(parameters);
      console.log("Document getPoolInfo:::", wrappedPoolInfo);
    },

    async getAllPoolInfos() {
      if (!accounts) {
        await this.getAccounts();
      }
      if (!daoport) {
        this.getDaoPort(accounts[0]);
      }

      const fromPid = 0;
      const toPid = 4;
      const user = accounts[0];
      const withOwnedNFTTokenIds = false;
      const parameters = {
        fromPid,
        toPid,
        user,
        withOwnedNFTTokenIds
      };
      const wrappedPoolInfos = await daoport.getAllPoolInfos(parameters);
      console.log("Document getAllPoolInfos:::", wrappedPoolInfos);
    },

    async getPoolInfosByNFTorWNFTs() {
      if (!accounts) {
        await this.getAccounts();
      }
      if (!daoport) {
        this.getDaoPort(accounts[0]);
      }

      const poolNFTorWNFTs = [
        "0x5668f2A3b8C0790868d8615594Bb12cF8C3f2305",
        "0x6aFE699a9188BBb98b78BA45Ae3608f98D9F7041"
      ];
      const user = accounts[0];
      const withOwnedNFTTokenIds = false;
      const parameters = {
        poolNFTorWNFTs,
        user,
        withOwnedNFTTokenIds
      };
      const wrappedPoolInfos = await daoport.getPoolInfosByNFTorWNFTs(parameters);
      console.log("Document getPoolInfosByNFTorWNFTs:::", wrappedPoolInfos);
    },

    async pendingAll() {
      if (!accounts) {
        await this.getAccounts();
      }
      if (!daoport) {
        this.getDaoPort(accounts[0]);
      }

      const forUser = accounts[0];
      const userInfo = await daoport.pendingAll(forUser);
      console.log("pendingAll==userInfo", userInfo);
    },

    async harvestAll() {
      if (!accounts) {
        await this.getAccounts();
      }
      if (!daoport) {
        this.getDaoPort(accounts[0]);
      }

      const forUser = accounts[0];
      try {
        const txHash = await daoport.harvestAll(forUser);
        console.log("harvestAll==txhash", txHash);
      } catch (error) {}
    },

    async pendingByNFTorWNFT() {
      if (!accounts) {
        await this.getAccounts();
      }
      if (!daoport) {
        this.getDaoPort(accounts[0]);
      }

      const poolNFTorWNFT = "0x5668f2A3b8C0790868d8615594Bb12cF8C3f2305";
      const poolWNFTTokenIds = [4, 5, 8, 9];
      const parameters = {
        poolNFTorWNFT,
        poolWNFTTokenIds
      };
      const { _poolExists, _pid, _mining, _dividend } = await daoport.pendingByNFTorWNFT(
        parameters
      );
      console.log("Document pendingByNFTorWNFT:::", _poolExists, _pid, _mining, _dividend);
    },

    async pendingAllByWNFTTokenIds() {
      if (!accounts) {
        await this.getAccounts();
      }
      if (!daoport) {
        this.getDaoPort(accounts[0]);
      }

      const pids = [0, 1];
      const poolWNFTTokenIds = [
        [4, 5, 8, 9],
        [0, 11, 10, 8, 1, 2, 3, 6]
      ];
      const parameters = {
        pids,
        poolWNFTTokenIds
      };
      const { _mining, _dividend } = await daoport.pendingAllByWNFTTokenIds(parameters);
      console.log("Document pendingAllByWNFTTokenIds:::", _mining, _dividend);
    },

    async harvestAllByWNFTTokenIds() {
      if (!accounts) {
        await this.getAccounts();
      }
      if (!daoport) {
        this.getDaoPort(accounts[0]);
      }

      const forUser = accounts[0];
      const pids = [0, 1];
      const poolWNFTTokenIds = [
        [4, 5, 8, 9],
        [0, 11, 10, 8, 1, 2, 3, 6]
      ];
      const parameters = {
        forUser,
        pids,
        poolWNFTTokenIds
      };

      try {
        const txHash = await daoport.harvestAllByWNFTTokenIds(parameters);
        console.log("harvestAllByWNFTTokenIds==txhash", txHash);
      } catch (error) {}
    },

    async ownedNFTsTokenIdsByPids() {
      if (!accounts) {
        await this.getAccounts();
      }
      if (!daoport) {
        this.getDaoPort(accounts[0]);
      }

      const pids = [0, 1];
      const user = accounts[0];
      const parameters = {
        pids,
        user
      };
      const ownedTokenIds = await daoport.ownedNFTsTokenIdsByPids(parameters);
      console.log("Document ownedNFTsTokenIdsByPids:::", ownedTokenIds);
    },

    async ownedWNFTsTokenIdsByPids() {
      if (!accounts) {
        await this.getAccounts();
      }
      if (!daoport) {
        this.getDaoPort(accounts[0]);
      }

      const pids = [0, 1];
      const user = accounts[0];
      const parameters = {
        pids,
        user
      };
      const ownedTokenIds = await daoport.ownedWNFTsTokenIdsByPids(parameters);
      console.log("Document ownedWNFTsTokenIdsByPids:::", ownedTokenIds);
    },

    async ownedNFTsTokenIdsByNFTs() {
      if (!accounts) {
        await this.getAccounts();
      }
      if (!daoport) {
        this.getDaoPort(accounts[0]);
      }

      const nfts = [
        "0xe4895a9FEF7F186c848e9504b104C7ce3583f15a",
        "0x5d7181aEDAF8A900Cb8631F58CDeeD0CD7Bc936b"
      ];
      const user = accounts[0];
      const parameters = {
        nfts,
        user
      };
      const ownedTokenIds = await daoport.ownedNFTsTokenIdsByNFTs(parameters);
      console.log("Document ownedNFTsTokenIdsByNFTs:::", ownedTokenIds);
    },

    async ownedNFTTokenIds() {
      if (!accounts) {
        await this.getAccounts();
      }
      if (!daoport) {
        this.getDaoPort(accounts[0]);
      }

      const nft = "0xe4895a9FEF7F186c848e9504b104C7ce3583f15a";
      const user = accounts[0];
      const parameters = {
        nft,
        user
      };
      const ownedTokenIds = await daoport.ownedNFTTokenIds(parameters);
      console.log("Document ownedNFTTokenIds:::", ownedTokenIds);
    },

    async ownedNFTTokenIds() {
      if (!accounts) {
        await this.getAccounts();
      }
      if (!daoport) {
        this.getDaoPort(accounts[0]);
      }

      const nft = "0xe4895a9FEF7F186c848e9504b104C7ce3583f15a";
      const user = accounts[0];
      const parameters = {
        nft,
        user
      };
      const ownedTokenIds = await daoport.ownedNFTTokenIds(parameters);
      console.log("Document ownedNFTTokenIds:::", ownedTokenIds);
    },

    async getPoolInfosUserCanDeposit() {
      if (!accounts) {
        await this.getAccounts();
      }
      if (!daoport) {
        this.getDaoPort(accounts[0]);
      }

      const user = accounts[0];
      const withOwnedNFTTokenIds = false;
      const parameters = {
        user,
        withOwnedNFTTokenIds
      };
      const wrappedPoolInfos = await daoport.getPoolInfosUserCanDeposit(parameters);
      console.log("Document getPoolInfosUserCanDeposit:::", wrappedPoolInfos);
    },

    async getPoolInfosUserDeposited() {
      if (!accounts) {
        await this.getAccounts();
      }
      if (!daoport) {
        this.getDaoPort(accounts[0]);
      }

      const user = accounts[0];
      const withOwnedNFTTokenIds = false;
      const parameters = {
        user,
        withOwnedNFTTokenIds
      };
      const wrappedPoolInfos = await daoport.getPoolInfosUserDeposited(parameters);
      console.log("Document getPoolInfosUserDeposited:::", wrappedPoolInfos);
    },

    async getInfo() {
      if (!accounts) {
        await this.getAccounts();
      }
      if (!starblockport) {
        this.getStarBlockPort(accounts[0]);
      }

      const user = accounts[0];
      const info = await starblockport.getInfo(user);
      console.log("Document getInfo:::", info, info._whitelistSaleConfig, info._publicSaleConfig);
      setLocalStorage("whitelistSaleConfig", info._whitelistSaleConfig);
      setLocalStorage("publicSaleConfig", info._publicSaleConfig);
    },

    async userCanMint() {
      if (!accounts) {
        await this.getAccounts();
      }
      if (!starblockport) {
        this.getStarBlockPort(accounts[0]);
      }

      const user = accounts[0];
      const amount = 3;
      const info = await starblockport.userCanMint(user, amount);
      console.log("Document userCanMint:::", info);
    },

    async updateWhitelistSaleConfig() {
      if (!accounts) {
        await this.getAccounts();
      }
      if (!starblockport) {
        this.getStarBlockPort(accounts[0]);
      }

      const whitelistSaleConfig = [1657004392, 1657866875, "20000000000000000", 100];
      try {
        const txHash = await starblockport.updateWhitelistSaleConfig(whitelistSaleConfig);
        console.log("updateWhitelistSaleConfig==txhash", txHash);
      } catch (error) {}
    },

    async updatePublicSaleConfig() {
      if (!accounts) {
        await this.getAccounts();
      }
      if (!starblockport) {
        this.getStarBlockPort(accounts[0]);
      }

      const publicSaleConfig = [1657004392, 1657866875, "10000000000000000", 2000];
      try {
        const txHash = await starblockport.updatePublicSaleConfig(publicSaleConfig);
        console.log("updatePublicSaleConfig==txhash", txHash);
      } catch (error) {}
    },

    async addWhitelists() {
      if (!accounts) {
        await this.getAccounts();
      }
      if (!starblockport) {
        this.getStarBlockPort(accounts[0]);
      }

      const addresses = [
        "0x3664d9F2b27C58D7ee71D436F27F5034359cD6fa",
        "0x7Be5f25c78B9823c90dB8AaEe5d9bf8d72217B0a"
      ];
      try {
        const txHash = await starblockport.addWhitelists(addresses);
        console.log("addWhitelists==txhash", txHash);
      } catch (error) {}
    },

    async whitelistMint() {
      if (!accounts) {
        await this.getAccounts();
      }
      if (!starblockport) {
        this.getStarBlockPort(accounts[0]);
      }

      const whitelistSaleConfig = JSON.parse(getLocalStorage("whitelistSaleConfig"));
      if (!whitelistSaleConfig) return;

      const amount = 3;
      const price = new BigNumber(whitelistSaleConfig[2]);

      await starblockport.whitelistMint(
        amount,
        price,
        txHash => {
          console.log("whitelistMint on:::", txHash);
        },
        res => {
          console.log("whitelistMint then:::", res);
        },
        err => {
          console.log("whitelistMint catch:::", err);
        }
      );
    },

    async publicMint() {
      if (!accounts) {
        await this.getAccounts();
      }
      if (!starblockport) {
        this.getStarBlockPort(accounts[0]);
      }

      const publicSaleConfig = JSON.parse(getLocalStorage("publicSaleConfig"));
      if (!publicSaleConfig) return;

      const amount = 1;
      const price = new BigNumber(publicSaleConfig[2]);

      await starblockport.publicMint(
        amount,
        price,
        txHash => {
          console.log("publicMint on:::", txHash);
        },
        res => {
          console.log("publicMint then:::", res);
        },
        err => {
          console.log("publicMint catch:::", err);
        }
      );
    },

    async deploy() {
      if (!accounts) {
        await this.getAccounts();
      }

      const account = accounts[0];
      if (!starblockport) {
        this.getStarBlockPort(account);
      }
      const web3 = this.initWeb3();

      const byteCodeAbi = starblockport.getStarBlockByteCodeAbi();
      const contract = new web3.eth.Contract(byteCodeAbi.abi);

      const data = byteCodeAbi.byteCode;
      const name = "DemoTest0705";
      const symbol = "DemoTest0705";
      const maxSupply = 10000;
      const chargeToken = "0x0000000000000000000000000000000000000000";
      const baseTokenURI = "https://meta.rebelkidsparade.com/meta/";
      const maxAmountForArtist = 1000;
      const protocolFeeReceiver = "0xbF44214fB2C31cfBFBd2Ba0496a11772c7BE47cb";
      const protocolFeeNumerator = 2000;
      const royaltyReceiver = account;
      const royaltyFeeNumerator = 1000;

      const options = {
        data,
        arguments: [
          name,
          symbol,
          maxSupply,
          chargeToken,
          baseTokenURI,
          maxAmountForArtist,
          protocolFeeReceiver,
          protocolFeeNumerator,
          royaltyReceiver,
          royaltyFeeNumerator
        ]
      };
      const txnData = { from: account };
      await contract
        .deploy(options)
        .send(txnData)
        .on("transactionHash", tH => console.log("on--transactionHash:==>", tH))
        .then(function(res) {
          console.log("then--", res.options.address.toLowerCase());
          const address = res.options.address.toLowerCase();
          setLocalStorage("starblockCollection", { address });
          starblockport.setStarblockCollectionAddress(address);
        })
        .catch(function(err) {
          console.log("catch--", err);
        });
    },

    async getCollectionInfo() {
      if (!accounts) {
        await this.getAccounts();
      }
      if (!starblockport) {
        this.getStarBlockPort(accounts[0]);
      }

      const starblockCollection = JSON.parse(getLocalStorage("starblockCollection"));
      const address = starblockCollection.address;
      if (!address || address.length === 0) {
        console.log("没有starblockCollection合约地址");
        return;
      }
      const starBlockCollectionAddress = address;
      const user = accounts[0];
      const info = await starblockport.getCollectionInfo(starBlockCollectionAddress, user);
      console.log("Document getCollectionInfo:::", info);
      setLocalStorage("whitelistSaleConfig", info._collectionInfo.whitelistSaleConfig);
      setLocalStorage("publicSaleConfig", info._collectionInfo.publicSaleConfig);
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
