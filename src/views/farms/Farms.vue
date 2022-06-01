<template>
  <div class="back">
    <list class="contantBack">
      <!-- <div class="contantList"> -->
      <!-- 头部 -->
      <div class="topBackBox">
        <img :src="topBackImgUrl" class="topImg" />
        <div class="topBackContant">
          <div class="topImgIconBox">
            <img class="topImgIcon" src="@/assets/img/farms/topImgIcon.png" />
            <div class="topImgIconBox_contantBox">
              <p class="topImgIconBox_contantBox_text">Stake NFTs to Earn</p>
            </div>
          </div>
          <p class="topTitle">{{ $t("navBar.section1") }}</p>
          <p class="topSubTitle">{{ $t("farms.topDes") }}</p>
          <div class="topItemDataSuperBox">
            <div class="itemDataBox">
              <p class="itemDataBox_topText">
                {{ totalTVL > 0 ? Number(totalTVL.toFixed(2)) + " ETH" : "--" }}
              </p>
              <p class="itemDataBox_bottomText">{{ $t("farms.topItem1") }}</p>
            </div>
            <div class="vSepLine"></div>
            <div class="itemDataBox">
              <p class="itemDataBox_topText">{{ totalNftQuantity }}</p>
              <!-- <p class="itemDataBox_topText">{{ "--" }}</p> -->
              <p class="itemDataBox_bottomText">{{ $t("farms.topItem2") }}</p>
            </div>
            <div class="vSepLine"></div>
            <div class="itemDataBox">
              <p class="itemDataBox_topText">
                {{ totalRewardStr }}
              </p>
              <p class="itemDataBox_bottomText">{{ $t("farms.topItem3") }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Farms -->
      <div class="itemsBox">
        <farmitem :items="poolItems" :currentBlockNumber="currentBlockNumber"></farmitem>
      </div>

      <!-- <div class="emptyContantBox">
        <img class="emptyContantBox_img" src="@/assets/img/farms/empty.png" />
        <div class="countDownBox">
          <countdown :isFarms="true"></countdown>
        </div>
      </div> -->
    </list>

    <div class="bottomDesBox">
      <img src="@/assets/img/farms/farmsDes.png" class="farmsDesImg" />
      <div class="farmsDesTextBox">
        <p class="farmsDesText">
          <span>{{ "· " }}</span>
          <span>{{ $t("farms.tip1") }}</span>
          <br />
          <span>{{ "· " }}</span>
          <span>{{ $t("farms.tip2") }}</span>
          <br />
          <span>{{ "· " + $t("farms.tip3") }}</span>
          <br />
          <span>{{ "· " + $t("farms.tip4") }}</span>
          <br />
          <span>{{ "· " + $t("farms.tip5") }}</span>
          <br />
          <span>{{ "· " + $t("farms.tip6") }}</span>
        </p>
      </div>
    </div>

    <bottom></bottom>

    <el-dialog
      title=""
      :visible.sync="actionAlertShow"
      :width="elDialogEditSellDataWidth"
      :height="elDialogEditSellDataHeight"
      :close-on-click-modal="false"
      :show-close="false"
      :fullscreen="false"
      :destroy-on-close="true"
      center
      top="70px"
      :lock-scroll="false"
      :close-on-press-escape="false"
    >
      <div class="alertContantBox1">
        <div class=""></div>
        <p class="alertTitle">{{ $t("farms.NFTOfCollection") }}</p>
        <img
          class="closeAlertIcon"
          src="@/assets/img/farms/optionViewClose.svg"
          @click="closeAlertAction"
        />
      </div>

      <div class="alertSectionBox1">
        <div class="itemDataBox">
          <p class="itemDataBox_topText_alert">{{ this.WNFTItems.length }}</p>
          <p class="itemDataBox_bottomText_alert">{{ $t("farms.havePledge") }}</p>
        </div>
        <div class="vSepLine_alert"></div>
        <div class="itemDataBox">
          <p class="itemDataBox_topText_alert">
            {{ (selectPollItem.mining * Math.pow(10, -18)).toFixed(2) + " STB" }}
          </p>
          <p class="itemDataBox_bottomText_alert">{{ $t("farms.getAwardAmount") }}</p>
        </div>
        <div class="vSepLine_alert"></div>
        <div class="itemDataBox">
          <p class="itemDataBox_topText_alert">--</p>
          <p class="itemDataBox_bottomText_alert">{{ $t("farms.getBonusAmount") }}</p>
        </div>
      </div>

      <div
        class="alertSectionBox2"
        v-loading.lock="actionAlertShowLoading"
        element-loading-background="rgba(0, 0, 0, 0.0)"
      >
        <div class="switchBtnBox">
          <button :class="isSwitch1 ? 'switchBtn_on' : 'switchBtn_off'" @click="switchBtn(1)">
            {{ $t("farms.pledge") }}
          </button>
          <button :class="!isSwitch1 ? 'switchBtn_on' : 'switchBtn_off'" @click="switchBtn(2)">
            {{ $t("farms.havePledge") }}
          </button>
        </div>
        <button class="unPledgeAction" @click="alertBeforeAction">
          {{ alertActionStr + " " + selectCount + $t("common.defaultMessSub2") }}
        </button>
      </div>

      <div class="itemsSuperBox">
        <div class="alertSectionBox3">
          <div class="alertSectionBox3_textBox1">
            <p class="alertSectionBox3_text1">NFT</p>
          </div>
          <div class="alertSectionBox3_textBox2">
            <p class="alertSectionBox3_text2">{{ $t("farms.detailInfo") }}</p>
          </div>
          <div class="alertSectionBox3_textBox3">
            <p class="alertSectionBox3_text3">{{ $t("farms.option") }}</p>
          </div>
        </div>
        <div class="selectItemSepLine"></div>
        <!-- <div v-for="(item, index) in selectItems"> -->
        <selectnft :items="canSelectNftItems" v-show="!isShowEmptyImg"></selectnft>
        <div class="emptyImgBox" v-show="isShowEmptyImg">
          <img class="emptyImg" src="@/assets/img/common/emptyNFT.png" />
          <p class="emptyImgBox_des">{{ $t("farms.noWNFTDes") }}</p>
        </div>

        <!-- </div> -->
      </div>

      <p class="alertTip1">{{ "· " + $t("farms.optionTip1") }}</p>
      <p class="alertTip2">{{ "· " + $t("farms.optionTip2") }}</p>
      <p class="alertTip2">{{ "· " + $t("farms.optionTip3") }}</p>
      <p class="alertTip2">{{ "· " + $t("farms.optionTip4") }}</p>
    </el-dialog>

    <el-dialog
      title=""
      :visible.sync="successVisible"
      :width="elDialogWidth"
      :show-close="false"
      center
      top="200px"
      :close-on-click-modal="false"
      append-to-body
      :lock-scroll="false"
      :close-on-press-escape="false"
    >
      <div class="dialogBack">
        <img class="dialogTopImg" src="@/assets/img/common/requestSuccess.svg" />
        <p class="dialopTitle">
          {{ requestSuccessStr }}
        </p>

        <div class="txHashBox">
          <p class="txHash_pre">{{ $t("common.txHash") + ":" }}</p>
          <a :href="txHashOringion" target="_blank">
            <p class="txHash">{{ txHash }}</p>
          </a>
          <img
            class="txHash_copy"
            src="@/assets/img/common/copy.svg"
            @click="copyAddressAction(txHashOringion)"
          />
        </div>
        <div class="bottomBtnBox1">
          <button class="alertCloseBtn" @click="alertCloseBtnAction">
            {{ $t("common.alertClose") }}
          </button>
        </div>
      </div>
    </el-dialog>

    <el-dialog
      title=""
      :visible.sync="warningDefaultVisible"
      :width="elDialogWidth"
      :show-close="false"
      center
      top="200px"
      :close-on-click-modal="false"
      append-to-body
      :lock-scroll="false"
      :close-on-press-escape="false"
    >
      <div class="dialogBack">
        <img class="dialogTopImg" src="@/assets/img/common/alertWaring.svg" />
        <p class="dialopTitle">
          {{ defaultMessageStr }}
        </p>
        <span class="dialogDes" v-bind="{ color: dialogDesColor }">
          {{
            !isGetReward
              ? defaultMessageDesStr
              : defaultMessageDesStr + ":" + awardAmountStr(selectPollItem)
          }}
        </span>
        <div class="bottomBtnBox1">
          <button class="goOnCreatBtn" @click="defaultBtnAction">
            {{ $t("common.confirm") }}
          </button>
          <button class="lookDetailBtn" @click="cancleBtnAction">
            {{ $t("common.cancle") }}
          </button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { onConnect, initWeb3Modal, resetApp } from "@/common/useWallet";
import Farmitem from "../farms/children/FarmsItem.vue";
import Selectnft from "../farms/children/SelectNFT.vue";
import poolDatas from "@/common/dataConfig";
import Countdown from "../home/children/CountDown.vue";
import { List } from "vant";
import Bottom from "../home/children/Bottom.vue";
import {
  web3ProviderUrl,
  getProdcutMode,
  getSurpportChainId,
  getEtherscanOfCollection,
  getEtherscanOfNFT,
  getOpenSeaOfCollection,
  getOpenSeaOfNFT
} from "@/common/starBlockConfig";
import {
  daoportAction,
  getBlockNumber,
  onBlockNumberChange,
  approveNFTAction,
  approveWNFTAction,
  getBonusRewardAction,
  getNFTTokenIDs,
  daoporDeposit,
  getWNFTTokenIDs,
  daoporWithdraw,
  daoporHarvest,
  openseaApiBaseUrl
} from "@/common/starblockdao";

export default {
  name: "Farms",

  components: {
    Countdown,
    List,
    Farmitem,
    Selectnft,
    Bottom
  },
  computed: {
    totalRewardStr() {
      if (this.totalReward * Math.pow(10, -18) > 10000) {
        return (this.totalReward * Math.pow(10, -18)).toFixed(0);
      } else {
        return this.totalReward > 0
          ? (this.totalReward * Math.pow(10, -18)).toFixed(2) + " STB"
          : "--" + " STB";
      }
    },
    defaultMessageStr() {
      if (this.isGetReward) {
        return this.$t("common.defaultMessSub4");
      }
      if (this.isSwitch1) {
        return (
          this.$t("common.defaultMessSub1") +
          this.selectCount +
          this.$t("common.defaultMessSub2") +
          "NFT"
        );
      } else {
        return (
          this.$t("common.defaultMessSub3") +
          this.selectCount +
          this.$t("common.defaultMessSub2") +
          "NFT"
        );
      }
    },

    defaultMessageDesStr() {
      if (this.isGetReward) {
        return this.$t("common.defaultMessSub4Des");
      }
      if (this.isSwitch1) {
        return this.$t("farms.tip4") + "，" + this.$t("farms.tip6");
      } else {
        return this.$t("farms.tip3");
      }
    },

    dialogDesColor() {
      if (this.isGetReward) {
        return "#f7b500";
      }
      if (this.isSwitch1) {
        return "#666";
      } else {
        return "#666";
      }
    },

    requestSuccessStr() {
      if (this.isGetReward) {
        return this.$t("farms.getRewardSuccess");
      }
      if (this.isSwitch1) {
        return this.$t("farms.depositSuccess");
      } else {
        return this.$t("farms.withdrawSuccess");
      }
    },

    alertActionStr() {
      if (this.isSwitch1) {
        return this.$t("farms.pledge");
      } else {
        return this.$t("farms.unPledge");
      }
    }
  },
  data() {
    var topImgHeight = 0;
    topImgHeight = document.documentElement.clientWidth > 750 ? "7rem" : "6rem";

    return {
      actionAlertShowLoading: false,
      txHash: "0xddsdddsddsd",
      txHashOringion: "111111",
      successVisible: false,
      // defaultMessageDesStr: "",
      selectPollItem: {},
      elDialogWidth: document.documentElement.clientWidth > 1200 ? "360px" : "300px",
      warningDefaultVisible: false,
      selectTokenIdsArr: [],
      selectCount: 0,
      totalNftQuantity: 0,
      totalTVL: 0,
      totalReward: 0,
      currentBlockNumber: 100000000,
      topImgHeight: topImgHeight,
      topBackImgUrl:
        document.documentElement.clientWidth > 750
          ? require("@/assets/img/farms/topBack.jpg")
          : require("@/assets/img/farms/mobile/topBack.png"),
      isSwitch1: true,
      isGetReward: false,
      poolItems: [],
      canSelectNftItems: [],
      isShowEmptyImg: true,
      NFTItems: [],
      WNFTItems: [],

      elDialogEditSellDataWidth: document.documentElement.clientWidth > 750 ? "900px" : "350px",
      elDialogEditSellDataHeight: "918px",
      actionAlertShow: false,
      items: [],
      isScroll: false,
      isClickTab: false,
      active: 0,
      isShowMobile: document.documentElement.clientWidth > 750 ? false : true
    };
  },

  beforeRouteEnter(to, from, next) {
    undefined;
    next(vm => {
      undefined;
      // 通过 `vm` 访问组件实例,将值传入fromPath
    });
  },
  beforeUpdate() {},
  beforeRouteEnter(to, from, next) {
    undefined;
    next(vm => {
      undefined;
      // 通过 `vm` 访问组件实例,将值传入fromPath
      // vm.setScrollToPostion();
    });
  },
  created() {
    // this.requestFloorPrice();

    getBlockNumber(this.updateBlockData);
    onBlockNumberChange(this.updateBlockData);
    setTimeout(() => {
      this.$bus.$emit("updateTabIndex", 1);
    });
    // resetApp();
    // this.accountsChange();

    // daoportAction(0);

    this.poolItems = poolDatas;
    this.getMasterChefInfo();
    setTimeout(() => {
      this.getFloorPriceData();
    }, 2000);

    setInterval(() => {
      this.getMasterChefInfo();
    }, 1000 * 60 * 2);

    this.$nextTick(() => {
      // console.log("this.$route.path*******",this.$route.path);
      // this.setScrollToPostion();
    });
    // this.ratio = this.detectZoom();

    if (this.ratio > 100) {
      this.metaItemContantDesFontSize = 14 / bili + "px";
    }
    // this.startCountTime();
  },
  watch: {
    windowWidth(val) {
      this.windowWidth = val;
      let that = this;
      if (that.windowWidth > 750) {
        // that.isShowMobile = false;
      } else {
        // that.isShowMobile = true;
      }
      console.log(that.windowWidth);
      // this.ratio = this.detectZoom();

      var html = document.documentElement; //获取到html元素
      var hWidth = that.windowWidth; //获取到html的宽度
      // 当hWidth大于640时，则物理分辨率小于1280（这就看设备的devicePixelRatio这个值了），应该去访问pc网站了
      // alert(hWidth);
      var bili = Number(this.ratio) / 100;
      if (this.ratio > 100) {
        this.metaItemContantDesFontSize = 14 / (3 * bili) + "px";
      }
    }
  },
  mounted() {
    this.$bus.$on("selectNftAction", val => {
      var selectTokenIdsArr = [];
      Object.keys(this.canSelectNftItems).forEach(key => {
        var item = this.canSelectNftItems[key];
        if (item.select) {
          selectTokenIdsArr.push(item.tokenId);
        }
      });
      this.selectTokenIdsArr = selectTokenIdsArr;
      this.selectCount = this.selectTokenIdsArr.length;
    }),
      this.$bus.$on("pledgeBtnNotiAction", val => {
        this.actionAlertShowLoading = true;

        this.selectPollItem = val.item;
        this.selectPollItem.showImgLoading = true;
        this.isGetReward = val.isGetReward;

        if (this.isGetReward) {
          this.warningDefaultVisible = true;
        } else {
          if (val.isNFTSell) {
            getNFTTokenIDs(val.item, this.handleGetNFTTokenIDs);
            this.isSwitch1 = true;
            // this.NFTItems = val.item.NFTItems;
            // this.canSelectNftItems = this.NFTItems;
          }
          if (val.isWNFTSell) {
            getWNFTTokenIDs(val.item, this.handleGetWNFTTokenIDs);
            this.isSwitch1 = false;
            // this.WNFTItems = val.item.WNFTItems;
            // this.canSelectNftItems = this.WNFTItems;
          }
          // if (this.canSelectNftItems.length > 0) {
          //   this.isShowEmptyImg = false;
          // } else {
          //   this.isShowEmptyImg = true;
          // }
          this.$bus.$emit("switchBtnAction", this.isSwitch1);
          this.actionAlertShow = true;
        }
      });
    var that = this;
    // <!--把window.onresize事件挂在到mounted函数上-->
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight;
        window.fullWidth = document.documentElement.clientWidth;
        // that.windowHeight = window.fullHeight; // 高
        that.windowWidth = window.fullWidth; // 宽
      })();
    };
  },

  methods: {
    requestFloorPrice(item, handleFloorPrice, index) {
      // var urlPath = openseaApiBaseUrl() + "collection/" + item.collection.name + "/stats";
      var urlPath = "collection/" + item.collection.name + "/stats";

      this.$axios
        .get(urlPath, {
          params: {}
        })
        .then(res => {
          if (handleFloorPrice) {
            handleFloorPrice(item, res.data.stats.floor_price, index);
          }
          console.log("collection/doodles-official/stats", res.data.stats.floor_price);
        });
    },
    handleFloorPrice(item, floor_price, index) {
      item.floor_price = floor_price;
      if (index == this.poolItems.length - 1) {
        this.totalTVL = 0;
        for (var i = 0; i < this.poolItems.length; i++) {
          const item = this.poolItems[i];
          this.totalTVL += Number(item.floor_price);
        }
      }
    },
    awardAmountStr(item) {
      if (item.mining != "--") {
        var number = item.mining * Math.pow(10, -18);
        if (number >= 10000) {
          return number.toFixed(0) + " STB";
        } else {
          return Number(number.toFixed(2)) + " STB";
        }
      }
      return item.mining;
    },
    copyAddressAction(address) {
      var that = this;
      var clipBoardContent = address;
      this.$copyText(clipBoardContent).then(
        function (e) {
          that.$message.success(that.$t("common.copySucceess"));
          console.log(e);
        },
        function (e) {
          that.$message.error("复制失败");
          console.log(e);
        }
      );
    },
    getFrommatAccount(account) {
      if (account) {
        var str1 = account.substr(0, 5);
        var str2 = "...";
        var str3 = account.substr(-4, 4);
        return str1 + str2 + str3;
      } else {
        return "";
      }
    },
    alertCloseBtnAction() {
      this.successVisible = false;
    },
    alertBeforeAction() {
      if (this.selectTokenIdsArr.length == 0) {
        return;
      }
      this.warningDefaultVisible = true;
    },
    defaultBtnAction() {
      this.warningDefaultVisible = false;
      this.actionAlertShow = false;

      var isHarvest = true;
      // if (this.isGetReward) {
      //   getWNFTTokenIDs(this.selectPollItem, this.handleGetWNFTTokenIDs, isHarvest);
      // }
      if (this.isGetReward) {
        getWNFTTokenIDs(this.selectPollItem, this.handleGetWNFTTokenIDs, isHarvest);
        this.$bus.$emit("defaultBtnNotiAction", { selectItem: this.selectPollItem, clickType: 2 });
      } else {
        if (this.isSwitch1) {
          this.$bus.$emit("defaultBtnNotiAction", {
            selectItem: this.selectPollItem,
            clickType: 0
          });
          daoporDeposit(
            this.selectPollItem,
            this.handleDeposit,
            this.selectTokenIdsArr,
            this.faildHandleDaoporDeposit
          );
        } else {
          daoporWithdraw(
            this.selectPollItem,
            this.handleWithdraw,
            this.selectTokenIdsArr,
            this.faildHandleDaoporWithdraw
          );
          this.$bus.$emit("defaultBtnNotiAction", {
            selectItem: this.selectPollItem,
            clickType: 1
          });
        }
      }
    },
    faildHandleDaoporDeposit(item) {
      this.$bus.$emit("upChainSuccessNoti", { selectItem: item, clickType: 0 });
    },
    faildHandleDaoporWithdraw(item) {
      this.$bus.$emit("upChainSuccessNoti", { selectItem: item, clickType: 1 });
    },
    faildHandleDaoporHarvest(item) {
      this.$bus.$emit("upChainSuccessNoti", { selectItem: item, clickType: 2 });
    },

    cancleBtnAction() {
      this.warningDefaultVisible = false;
    },

    handleDeposit(txHash, item) {
      this.txHash = this.getFrommatAccount(txHash.blockHash);
      this.txHashOringion = txHash.blockHash;
      this.getMasterChefInfo();
      this.successVisible = true;
      this.$bus.$emit("upChainSuccessNoti", { selectItem: item, clickType: 0 });
    },
    handleWithdraw(txHash, item) {
      this.txHash = this.getFrommatAccount(txHash.blockHash);
      this.txHashOringion = txHash.blockHash;
      this.getMasterChefInfo();
      this.successVisible = true;
      this.$bus.$emit("upChainSuccessNoti", { selectItem: item, clickType: 1 });
    },
    handleHarvest(txHash, item) {
      this.txHash = this.getFrommatAccount(txHash.blockHash);
      this.txHashOringion = txHash.blockHash;
      this.getMasterChefInfo();
      this.successVisible = true;
      this.$bus.$emit("upChainSuccessNoti", { selectItem: item, clickType: 2 });
    },
    updateBlockData(number, web3) {
      this.currentBlockNumber = number;
      console.log("currentBlockNumber", this.currentBlockNumber);
    },

    async getMasterChefInfo() {
      for (var i = 0; i < this.poolItems.length; i++) {
        var item = this.poolItems[i];
        await daoportAction(item, this.handleMasterChefInfo, i);
        // await approveNFTAction(item, this.handleNftApprove, i, true, this.faildHandleApproveNFT);
        // approveWNFTAction(item, this.handleWNftApprove, i, true, this.faildHandleApproveWNFT);
        // getNFTTokenIDs(item, this.handleGetNFTTokenIDs, i);
        // getWNFTTokenIDs(item, this.handleGetWNFTTokenIDs, i);
      }
    },
    async getFloorPriceData() {
      for (var i = 0; i < this.poolItems.length; i++) {
        var item = this.poolItems[i];
        await this.requestFloorPrice(item, this.handleFloorPrice, i);
      }
    },

    handleMasterChefInfo(masterChefInfo, item, index) {
      console.log("document=== masterchefinfo", item.poolInfo.pid, masterChefInfo, index);
      item.endBlock = masterChefInfo.endBlock;
      item.poolInfo.startBlock = masterChefInfo.poolInfo.startBlock;
      item.nftQuantity = masterChefInfo.nftQuantity;
      item.wnftQuantity = masterChefInfo.wnftQuantity;
      // item.poolInfo.startBlock = 10746993;
      item.poolInfo.amount = masterChefInfo.poolInfo.amount;
      item.dividend = Number(masterChefInfo.dividend);
      item.isNFTApproved = masterChefInfo.isNFTApproved;
      item.isWNFTApproved = masterChefInfo.isWNFTApproved;
      item.mining = Number(masterChefInfo.mining);
      item.poolInfo.wnft = masterChefInfo.poolInfo.wnft;
      item.nft = masterChefInfo.nft;
      item.rewardPerNFTForEachBlock = masterChefInfo.rewardPerNFTForEachBlock;
      item.rewardForEachBlock = masterChefInfo.rewardForEachBlock;
      // if (index == 0) {
      //   item.poolInfo.startBlock = 10776740;
      // }
      if (index == this.poolItems.length - 1) {
        this.totalNftQuantity = 0;
        this.totalReward = 0;
        for (var i = 0; i < this.poolItems.length; i++) {
          const item = this.poolItems[i];
          this.totalNftQuantity += Number(item.poolInfo.amount);
          var reward = 0;
          if (this.currentBlockNumber > Number(item.poolInfo.startBlock)) {
            reward =
              (this.currentBlockNumber - Number(item.poolInfo.startBlock)) *
              Number(item.rewardForEachBlock);
          }
          this.totalReward += reward;
        }
      }
    },

    handleNftApprove(isApprove, item, index) {
      item.isNFTApproved = isApprove;
    },
    faildHandleApproveNFT(item) {},
    handleWNftApprove(isApprove, item, index) {
      item.isWNFTApprove = isApprove;
    },
    faildHandleApproveWNFT(item) {},
    handleGetNFTTokenIDs(NFTTokenIDs, item, index) {
      var emptyArr = [];
      for (var i = 0; i < NFTTokenIDs.length; i++) {
        var miniItem = {};
        miniItem.tokenId = Number(NFTTokenIDs[i]);
        miniItem.select = false;
        miniItem.collection = {};
        miniItem.collection.name = item.collection.name;
        miniItem.collection.contractAddress = item.collection.contractAddress;
        // miniItem.collection.wnftContractAddress = item.poolInfo.wnft;
        emptyArr.push(miniItem);
      }
      // item.NFTItems = emptyArr;
      this.NFTItems = emptyArr;
      this.canSelectNftItems = this.NFTItems;
      this.actionAlertShowLoading = false;
      if (this.canSelectNftItems.length > 0) {
        this.isShowEmptyImg = false;
      } else {
        this.isShowEmptyImg = true;
      }
    },
    handleGetWNFTTokenIDs(WNFTTokenIDs, item, isHarvest) {
      var emptyArr = [];
      for (var i = 0; i < WNFTTokenIDs.length; i++) {
        var miniItem = {};
        miniItem.tokenId = Number(WNFTTokenIDs[i]);
        miniItem.select = false;
        miniItem.collection = {};
        miniItem.collection.name = item.collection.name;
        miniItem.collection.contractAddress = item.poolInfo.wnft;
        // miniItem.collection.wnftContractAddress = item.poolInfo.wnft;
        emptyArr.push(miniItem);
      }
      // item.WNFTItems = emptyArr;
      this.WNFTItems = emptyArr;
      this.canSelectNftItems = this.WNFTItems;
      this.actionAlertShowLoading = false;
      this.isShowEmptyImg = this.canSelectNftItems.length > 0 ? false : true;

      if (isHarvest) {
        var emptyArr = [];
        for (var i = 0; i < this.WNFTItems.length; i++) {
          var miniItem = this.WNFTItems[i];
          emptyArr.push(miniItem.tokenId);
        }
        daoporHarvest(
          this.selectPollItem,
          this.handleHarvest,
          emptyArr,
          this.faildHandleDaoporHarvest
        );
      }
    },
    handleGetBonusReward(result, item) {
      var result0 = result[0];
      var result1 = result[1];
      item.award = Number(result0);
      item.bonus = Number(result1);
    },
    switchBtn(index) {
      this.isSwitch1 = index == 1 ? true : false;
      this.canSelectNftItems = this.isSwitch1 ? this.NFTItems : this.WNFTItems;
      this.isShowEmptyImg = this.canSelectNftItems.length > 0 ? false : true;
      this.$bus.$emit("selectNftAction", 1);
      this.$bus.$emit("switchBtnAction", this.isSwitch1);
    },
    closeAlertAction() {
      this.selectTokenIdsArr = [];
      this.selectCount = 0;
      this.canSelectNftItems = [];
      this.isShowEmptyImg = this.canSelectNftItems.length > 0 ? false : true;

      Object.keys(this.NFTItems).forEach(key => {
        var item = this.NFTItems[key];
        item.select = false;
      });
      Object.keys(this.WNFTItems).forEach(key => {
        var item = this.WNFTItems[key];
        item.select = false;
      });
      this.actionAlertShow = false;
    },
    resetApp() {
      resetApp();
    },
    async accountsChange() {
      const provider = await initWeb3Modal().connect();
      provider.on("accountsChanged", function (accounts) {
        alert(accounts[0]);
      });
    },
    handleWalletConnect() {
      onConnect();
      // if (connected) {
      //   console.log("afterConnectdWallet", connected);
      // }
    }
  }
};
</script>

<style scoped>
.back {
  display: flex;
  flex-direction: column;
  /* height: 100%; */
  width: 100%;
  background-color: #f7faff;
  /* background-color: #ea4ae0; */
}

.contantBack {
  /* background-color: #ea4ae0; */
  align-items: center;
  margin-top: 3.5rem;
  z-index: 100;
  display: flex;
  flex-direction: column;
  /* height: 100%; */
  width: 95%;
  margin-left: 2.5%;
  overflow-x: hidden;
}

.contantList {
  align-items: center;
  /* margin-top: 3.1rem; */
  z-index: 100;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 95%;
  margin-left: 2.5%;
  overflow-x: hidden;
}

.topBackBox {
  position: relative;
}

.topImg {
  width: 100%;
  height: 6.7rem;
}
.topBackContant {
  top: 0%;
  left: 0%;
  height: 100%;
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.topTitle {
  margin-top: -0.2rem;
  font-size: 0.9rem;
  font-family: DINAlternate-Bold, DINAlternate;
  font-weight: bold;
  color: #ffffff;
  line-height: 1.05rem;
  letter-spacing: 1px;
  text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.08);
}
.topSubTitle {
  margin-top: 0.05rem;
  font-size: 0.45rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 0.7rem;
}

.topItemDataSuperBox {
  margin-top: 0.35rem;
  display: flex;
  flex-direction: row;
  width: 16.25rem;
  height: 2.5rem;
  background: #ffffff;
  border-radius: 10px;
  align-items: center;
  justify-content: space-around;
}
.itemDataBox {
  margin-top: 0.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.75rem;
  justify-content: space-between;
  width: 33.33%;
}
.itemDataBox_topText {
  font-size: 0.6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #111111;
  line-height: 0.6rem;
}
.itemDataBox_bottomText {
  margin-top: 0.375rem;
  font-size: 20px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #8c9399;
  line-height: 18px;
}
.vSepLine {
  width: 0.7px;
  height: 1.5rem;
  background-color: #e5e5e5;
}

.itemsBox {
  margin-top: 0.25rem;
  width: 101%;
}

.alertContantBox1 {
  /* background-color: aqua; */
  margin-top: -0.8rem;
  width: 100%;
  /* height: 1.25rem; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.alertTitle {
  font-size: 0.75rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #111111;
  line-height: 0.75rem;
}
.closeAlertIcon {
  width: 0.575rem;
  height: 0.575rem;
}
.alertSectionBox1 {
  margin-top: 0.75rem;
  width: 100%;
  /* height: 1.25rem; */
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  background-color: #fff8e6;
  border-radius: 0.1rem;
  height: 3rem;
}

.itemDataBox_topText_alert {
  margin-top: 0.25rem;
  font-size: 0.6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #111111;
  line-height: 0.7rem;
}

.itemDataBox_bottomText_alert {
  margin-top: 0.375rem;
  font-size: 0.5rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #8c9399;
  line-height: 0.5rem;
}
.vSepLine_alert {
  width: 0.7px;
  height: 1.525rem;
  background-color: #e5e5e5;
}

.alertSectionBox2 {
  margin-top: 0.75rem;
  width: 100%;
  /* height: 1.25rem; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.1rem;
}
.switchBtnBox {
  border-style: solid;
  border-width: 0.035rem;
  border-color: #f7b500;
  width: 6rem;
  border-radius: 0.75rem;
  height: 1.5rem;
  display: flex;
  flex-direction: row;
  background-color: #fff8e6;
}
.switchBtn_off {
  background-color: #fff8e6;
  border-radius: 0.75rem;
  width: 50%;
  border-style: none;
  font-size: 0.6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #f7b500;
  line-height: 0.4rem;
}
.switchBtn_on {
  background-color: #f7b500;
  border-radius: 0.75rem;
  width: 50%;
  border-style: none;
  font-size: 0.6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #fff;
  line-height: 0.4rem;
}
.unPledgeAction {
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  height: 1.5rem;
  border-radius: 0.75rem;
  border-style: none;
  background-color: #f7b500;
  font-size: 0.6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 0.4rem;
}

.itemsSuperBox {
  margin-top: 1.325rem;
  border-radius: 0.25rem;
  border-style: solid;
  border-color: #ececec;
  width: 100%;
  border-width: 0.025rem;
}

.alertSectionBox3 {
  margin-top: 0.75rem;
  width: 100%;
  /* height: 1.25rem; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.alertSectionBox3_textBox1 {
  /* background-color: blue; */
  width: 33.33%;
}

.alertSectionBox3_textBox2 {
  /* background-color: #f7b500; */
  display: flex;
  justify-content: center;
  width: 33.33%;
}

.alertSectionBox3_textBox3 {
  /* background-color: aqua; */
  display: flex;
  flex-direction: row-reverse;
  width: 33.33%;
}
.alertSectionBox3_text1 {
  margin-left: 0.525rem;
  font-size: 0.6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #111111;
  line-height: 0.45rem;
}
.alertSectionBox3_text2 {
  font-size: 0.6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #111111;
  line-height: 0.45rem;
}

.alertSectionBox3_text3 {
  margin-right: 0.525rem;
  font-size: 0.6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #111111;
  line-height: 0.45rem;
}

.selectItemSepLine {
  margin-top: 0.65rem;
  width: 100%;
  background-color: #f1f1f1;
  height: 0.025rem;
}

.alertTip1 {
  margin-top: 1.1rem;
  font-size: 0.6rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #8c9399;
  line-height: 0.6rem;
}
.alertTip2 {
  margin-top: 0.5rem;
  font-size: 0.6rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #8c9399;
  line-height: 0.6rem;
}

.bottomDesBox {
  margin-top: 1.5rem;
  width: 100%;
  /* height: 1.25rem; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.25rem;
}

.farmsDesImg {
  width: 4.05rem;
  height: 5.875rem;
}

.farmsDesText {
  max-width: 12rem;
  padding-top: 0.25rem;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  padding-bottom: 0.25rem;
  /* margin-top: 0.5rem; */
  font-size: 0.45rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #8c9399;
  line-height: 0.7rem;
  background-color: white;
  border-radius: 0.25rem;
}

.farmsDesText_span {
  padding-top: 0.25rem;
  padding-right: 0.5rem;
  padding-left: 0.5rem;
  padding-bottom: 0.25rem;
  /* margin-top: 0.5rem; */
  font-size: 0.45rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #8c9399;
  line-height: 0.7rem;
  background-color: white;
  border-radius: 0.25rem;
}

.farmsDesTextBox {
  margin-top: -1.2rem;
  align-items: center;
  /* margin-left: 0.5rem; */
  display: flex;
  flex-direction: row;
}

.topImgIconBox {
  position: relative;
}
.topImgIcon {
  width: 7rem;
  height: 1.425rem;
}
.topImgIconBox_contantBox {
  top: 0%;
  left: 0%;
  height: 100%;
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.topImgIconBox_contantBox_text {
  margin-top: -0.7rem;
  font-size: 0.6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 0.825rem;
}

.emptyContantBox {
  background-color: white;
  margin-top: 0.75rem;
  margin-left: 0%;
  width: 100%;
  /* height: 7.5rem; */
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
}
.emptyContantBox_img {
  margin-top: 0.75rem;
  width: 13.25rem;
  height: 6.675rem;
}
.countDownBox {
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
}

.dialogBack {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: #f7b500; */
}

.dialogTopImg {
  margin-top: -0.5rem;
  width: 0.75rem;
  height: 0.75rem;
}

.dialopTitle {
  font-size: 0.3rem;
  font-weight: 500;
  color: #111;
  margin-top: 0.15rem;
}

.dialogDes {
  color: #666;
  font-size: 0.325rem;
  margin-top: 0.25rem;
  align-content: center;
  text-align: center;
}

.dialogDes_active {
  color: #f7b500;
  font-size: 0.325rem;
  margin-top: 0.25rem;
  align-content: center;
  text-align: center;
}

.bottomBtnBox1 {
  width: 100%;
  margin-top: 0.75rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}

.lookDetailBtn {
  margin-top: 0rem;
  font-size: 0.375rem;
  font-weight: 400;
  color: #f7b500;
  background-color: white;
  height: 1rem;
  border-radius: 5px;
  border-style: solid;
  border-width: 1px;
  border-color: #f7b500;
  width: 45%;
}

.goOnCreatBtn {
  margin-top: 0.2rem;
  font-size: 0.375rem;
  font-weight: 400;
  color: white;
  background-color: #f7b500;
  height: 1rem;
  border-radius: 5px;
  border-style: none;
  /* border-width: 1px; */
  /* border-color: #111; */
  width: 45%;
  /* width: 100%; */
}

.alertCloseBtn {
  margin-top: 0.2rem;
  font-size: 0.375rem;
  font-weight: 400;
  color: white;
  background-color: #f7b500;
  height: 1rem;
  border-radius: 0.5rem;
  border-style: none;
  /* border-width: 1px; */
  /* border-color: #111; */
  width: 90%;
}

.emptyImgBox {
  margin-top: 1.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 1.5rem;
}

.emptyImg {
  height: 2.875rem;
}

.emptyImgBox_des {
  color: #666;
  font-size: 0.35rem;
}
.txHashBox {
  margin-top: 0.25rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.txHash_pre {
  font-size: 0.375rem;
  color: #666;
}
.txHash {
  font-size: 0.375rem;
  color: #2c6ff8;
}
.txHash_copy {
  width: 0.5rem;
  height: 0.5rem;
  cursor: pointer;
}

@media screen and (-webkit-min-device-pixel-ratio: 1) and (min-width: 1000px) {
  .back {
    display: flex;
    flex-direction: column;
    /* height: 100%; */
    width: 100%;
    background-color: #f7faff;
    /* background-color: #ea4ae0; */
  }

  .contantBack {
    /* background-color: #ea4ae0; */
    align-items: center;
    margin-top: 3.1rem;
    z-index: 100;
    display: flex;
    flex-direction: column;
    /* height: 100%; */
    width: 90%;
    margin-left: 5%;
    overflow-x: hidden;
    background-color: #f7faff;
  }

  .contantList {
    align-items: center;
    /* margin-top: 3.1rem; */
    z-index: 100;
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 90%;
    margin-left: 5%;
    overflow-x: hidden;
  }

  .topBackBox {
    position: relative;
  }

  .topImg {
    width: 100%;
    height: 8.5rem;
  }
  .topBackContant {
    top: 0%;
    left: 0%;
    height: 100%;
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .topTitle {
    margin-top: 0rem;
    /* margin-top: 0.5rem; */
    font-size: 1.05rem;
    font-family: DINAlternate-Bold, DINAlternate;
    font-weight: bold;
    color: #ffffff;
    line-height: 1.2rem;
    letter-spacing: 1px;
    text-shadow: 0px 4px 10px rgba(0, 0, 0, 0.08);
  }
  .topSubTitle {
    margin-top: 0.325rem;
    font-size: 0.6rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 0.825rem;
  }

  .topItemDataSuperBox {
    margin-top: 0.625rem;
    display: flex;
    flex-direction: row;
    width: 36rem;
    height: 3rem;
    background: #ffffff;
    border-radius: 10px;
    align-items: center;
    justify-content: space-around;
  }
  .itemDataBox {
    margin-top: 0.75rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 0.75rem;
    justify-content: space-between;
    width: 33.33%;
  }
  .itemDataBox_topText {
    font-size: 0.6rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #111111;
  }
  .itemDataBox_bottomText {
    margin-top: 0.525rem;
    font-size: 0.4rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8c9399;
  }
  .vSepLine {
    width: 0.7px;
    height: 1.5rem;
    background-color: #e5e5e5;
  }

  .itemsBox {
    margin-top: 1.275rem;
    width: 101%;
  }

  .alertContantBox1 {
    /* background-color: aqua; */
    margin-top: -0.8rem;
    width: 100%;
    /* height: 1.25rem; */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .alertTitle {
    font-size: 0.45rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #111111;
    line-height: 0.45rem;
  }
  .closeAlertIcon {
    width: 0.4rem;
    height: 0.4rem;
  }
  .alertSectionBox1 {
    margin-top: 0.75rem;
    width: 100%;
    /* height: 1.25rem; */
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    background-color: #fff8e6;
    border-radius: 0.1rem;
    height: 2.25rem;
  }

  .itemDataBox_topText_alert {
    margin-top: 0.25rem;
    font-size: 0.45rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #111111;
    line-height: 0.45rem;
  }

  .itemDataBox_bottomText_alert {
    margin-top: 0.375rem;
    font-size: 0.35rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8c9399;
    line-height: 0.35rem;
  }
  .vSepLine_alert {
    width: 0.7px;
    height: 1.15rem;
    background-color: #e5e5e5;
  }

  .alertSectionBox2 {
    margin-top: 0.75rem;
    width: 100%;
    /* height: 1.25rem; */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-radius: 0.1rem;
  }
  .switchBtnBox {
    border-style: solid;
    border-width: 0.025rem;
    border-color: #f7b500;
    width: 4rem;
    border-radius: 0.5rem;
    height: 1rem;
    display: flex;
    flex-direction: row;
    background-color: #fff8e6;
  }
  .switchBtn_off {
    background-color: #fff8e6;
    border-radius: 0.5rem;
    width: 50%;
    border-style: none;
    font-size: 0.4rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #f7b500;
    line-height: 0.4rem;
  }
  .switchBtn_on {
    background-color: #f7b500;
    border-radius: 0.5rem;
    width: 50%;
    border-style: none;
    font-size: 0.4rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #fff;
    line-height: 0.4rem;
  }
  .unPledgeAction {
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    height: 1rem;
    border-radius: 0.5rem;
    border-style: none;
    background-color: #f7b500;
    font-size: 0.4rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 0.4rem;
  }

  .itemsSuperBox {
    margin-top: 0.5rem;
    border-radius: 0.25rem;
    border-style: solid;
    border-color: #ececec;
    width: 100%;
    border-width: 0.025rem;
  }

  .alertSectionBox3 {
    margin-top: 0.5rem;
    width: 100%;
    /* height: 1.25rem; */
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .alertSectionBox3_textBox1 {
    /* background-color: blue; */
    width: 33.33%;
  }

  .alertSectionBox3_textBox2 {
    /* background-color: #f7b500; */
    display: flex;
    justify-content: center;
    width: 33.33%;
  }

  .alertSectionBox3_textBox3 {
    /* background-color: aqua; */
    display: flex;
    flex-direction: row-reverse;
    width: 33.33%;
  }
  .alertSectionBox3_text1 {
    margin-left: 0.525rem;
    font-size: 0.45rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #111111;
    line-height: 0.45rem;
  }
  .alertSectionBox3_text2 {
    font-size: 0.45rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #111111;
    line-height: 0.45rem;
  }

  .alertSectionBox3_text3 {
    margin-right: 0.525rem;
    font-size: 0.45rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #111111;
    line-height: 0.45rem;
  }

  .selectItemSepLine {
    margin-top: 0.5rem;
    width: 100%;
    background-color: #f1f1f1;
    height: 0.025rem;
  }

  .alertTip1 {
    margin-top: 0.5rem;
    font-size: 0.35rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8c9399;
    line-height: 0.35rem;
  }
  .alertTip2 {
    margin-top: 0.35rem;
    font-size: 0.35rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8c9399;
    line-height: 0.35rem;
  }

  .bottomDesBox {
    margin-top: 1.5rem;
    width: 100%;
    /* height: 1.25rem; */
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.25rem;
  }

  .farmsDesImg {
    width: 4.05rem;
    height: 5.875rem;
  }

  .farmsDesText {
    max-width: unset;
    padding-top: 0.25rem;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    padding-bottom: 0.25rem;
    /* margin-top: 0.5rem; */
    font-size: 0.35rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8c9399;
    line-height: 0.7rem;
    background-color: white;
    border-radius: 0.25rem;
  }

  .farmsDesText_span {
    text-align: left;
    padding-top: 0.25rem;
    padding-right: 0.5rem;
    padding-left: 0.5rem;
    padding-bottom: 0.25rem;
    /* margin-top: 0.5rem; */
    font-size: 0.35rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8c9399;
    line-height: 0.7rem;
    background-color: white;
    border-radius: 0.25rem;
  }

  .farmsDesTextBox {
    margin-top: -1.2rem;
    align-items: center;
    /* margin-left: 0.5rem; */
    display: flex;
    flex-direction: row;
  }

  .topImgIconBox {
    position: relative;
  }
  .topImgIcon {
    width: 7rem;
    height: 1.425rem;
  }
  .topImgIconBox_contantBox {
    top: 0%;
    left: 0%;
    height: 100%;
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .topImgIconBox_contantBox_text {
    margin-top: -0.7rem;
    font-size: 0.6rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 0.825rem;
  }

  .emptyContantBox {
    background-color: white;
    margin-top: 0.75rem;
    margin-left: 0%;
    width: 100%;
    /* height: 7.5rem; */
    border-radius: 0.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1.5rem;
  }
  .emptyContantBox_img {
    margin-top: 0.75rem;
    width: 13.25rem;
    height: 6.675rem;
  }
  .countDownBox {
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
  }

  .dialogTopImg {
    margin-top: -0.5rem;
    width: 1.25rem;
    height: 1.25rem;
  }

  .dialopTitle {
    font-size: 0.4rem;
    font-weight: 500;
    color: #111;
    margin-top: 0.5rem;
  }

  .dialogDes {
    color: #666;
    font-size: 0.325rem;
    margin-top: 0.25rem;
    align-content: center;
    text-align: center;
  }

  .dialogDes_active {
    color: #f7b500;
    font-size: 0.325rem;
    margin-top: 0.25rem;
    align-content: center;
    text-align: center;
  }

  .lookDetailBtn {
    margin-top: 0rem;
    font-size: 0.375rem;
    font-weight: 400;
    color: #f7b500;
    background-color: white;
    height: 1rem;
    border-radius: 5px;
    border-style: solid;
    border-width: 1px;
    border-color: #f7b500;
    width: 45%;
  }

  .goOnCreatBtn {
    margin-top: 0rem;
    font-size: 0.375rem;
    font-weight: 400;
    color: white;
    background-color: #f7b500;
    height: 1rem;
    border-radius: 5px;
    border-style: none;
    /* border-width: 1px; */
    /* border-color: #111; */
    width: 45%;
  }

  .alertCloseBtn {
    margin-top: 0rem;
    font-size: 0.375rem;
    font-weight: 400;
    color: white;
    background-color: #f7b500;
    height: 1rem;
    border-radius: 0.5rem;
    border-style: none;
    /* border-width: 1px; */
    /* border-color: #111; */
    width: 90%;
  }
  .emptyImgBox {
    margin-top: 1.5rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 1.5rem;
  }

  .emptyImg {
    height: 2.875rem;
  }

  .emptyImgBox_des {
    margin-top: 0.5rem;
    color: #666;
    font-size: 0.4rem;
  }

  .txHashBox {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .txHash_pre {
    font-size: 0.375rem;
    color: #666;
  }
  .txHash {
    font-size: 0.375rem;
    color: #2c6ff8;
  }
  .txHash_copy {
    width: 0.75rem;
    height: 0.75rem;
    cursor: pointer;
  }
}
</style>
