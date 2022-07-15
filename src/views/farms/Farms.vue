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
              <p class="topImgIconBox_contantBox_text">Stake NFT to Earn $STB</p>
            </div>
          </div>
          <p class="topTitle">{{ $t("navBar.section1") }}</p>

          <div class="courseBox_super">
            <div class="courseBox">
              <a :href="$t('common.courseLinkUrl')" target="_blank">
                <div class="courseBox_contantBox">
                  <img class="courseBox_contantBox_imgLeft" src="@/assets/img/farms/course_left.svg" />
                  <p class="courseBox_contantBox_text">{{ $t("common.course") }}</p>
                  <!-- <img class="courseBox_contantBox_imgRight" src="@/assets/img/farms/course_right.svg" /> -->
                </div>
              </a>
            </div>

            <div class="courseBox">
              <a href="https://forms.gle/FZukoQmPMTYGDFQCA" target="_blank">
                <div class="courseBox_contantBox">
                  <img class="courseBox_contantBox_imgLeft" src="@/assets/img/farms/course_left1.svg" />
                  <p class="courseBox_contantBox_text">{{ $t("common.applyCollection") }}</p>
                  <!-- <img class="courseBox_contantBox_imgRight" src="@/assets/img/farms/course_right.svg" /> -->
                </div>
              </a>
            </div>
          </div>

          <p class="topSubTitle">{{ $t("farms.topDes") }}</p>
          <div class="topItemDataSuperBox">
            <div class="itemDataBox">
              <p class="itemDataBox_topText">
                {{ totalTVL > 0 ? totalTVLStr : "-- ETH" }}
              </p>
              <p class="itemDataBox_bottomText">{{ $t("farms.topItem1") }}</p>
            </div>
            <div class="vSepLine"></div>
            <div class="itemDataBox">
              <p class="itemDataBox_topText">{{ totalNftQuantityStr }}</p>
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


            <div class="vSepLine" v-show="!isShowMobile"></div>
            <div class="itemDataBox" v-show="!isShowMobile">
              <p class="itemDataBox_topText">
                {{ totalBonusStr }}
              </p>
              <p class="itemDataBox_bottomText">{{ $t("farms.topItem4") }}</p>
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
          <span>{{ "· " + $t("farms.rewardsDes") }}</span>
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

    <el-dialog title="" :visible.sync="actionAlertShow" :width="elDialogEditSellDataWidth"
      :height="elDialogEditSellDataHeight" :close-on-click-modal="false" :show-close="false" :fullscreen="false"
      :destroy-on-close="true" center top="70px" :lock-scroll="false" :close-on-press-escape="false">
      <div class="alertContantBox1">
        <div class=""></div>
        <p class="alertTitle">{{ $t("farms.NFTOfCollection") }}</p>
        <img class="closeAlertIcon" src="@/assets/img/farms/optionViewClose.svg" @click="closeAlertAction" />
      </div>

      <div class="alertSectionBox1">
        <div class="itemDataBox">
          <p class="itemDataBox_topText_alert">{{ this.selectPollItem.wnftQuantity + " NFT" }}</p>
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
          <p class="itemDataBox_topText_alert">{{ "0 WETH" }}</p>
          <p class="itemDataBox_bottomText_alert">{{ $t("farms.getBonusAmount") }}</p>
        </div>
      </div>

      <div class="alertSectionBox2" v-loading.lock="actionAlertShowLoading"
        element-loading-background="rgba(0, 0, 0, 0.0)">
        <div class="switchBtnBox">
          <button :class="isSwitch1 ? 'switchBtn_on' : 'switchBtn_off'" @click="switchBtn(1)">
            {{ $t("farms.pledge") }}
          </button>
          <button :class="!isSwitch1 ? 'switchBtn_on' : 'switchBtn_off'" @click="switchBtn(2)">
            {{ $t("farms.havePledge") }}
          </button>
        </div>
        <div class="unPledgeActionBox">
          <button class="unPledgeAction" @click="alertBeforeAction">
            {{ alertActionStr + " " + selectCount + $t("common.defaultMessSub2") }}
          </button>
          <div class="selectAllBtnBox" @click="selectAllAction">
            <p class="selectAllBtnBox_text">{{ $t("common.sellectAll") }}</p>
            <img class="selectAllBtnBox_img" :src="selectIconUrl" />
          </div>
        </div>
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

    <el-dialog title="" :visible.sync="successVisible" :width="elDialogWidth" :show-close="false" center top="200px"
      :close-on-click-modal="false" append-to-body :lock-scroll="false" :close-on-press-escape="false"
      :destroy-on-close="true">
      <div class="dialogBack">
        <img class="dialogTopImg" src="@/assets/img/common/requestSuccess.svg" />
        <p class="dialopTitle">
          {{ requestSuccessStr }}
        </p>

        <div class="txHashBox">
          <p class="txHash_pre">{{ $t("common.txHash") + ":" }}</p>
          <a :href="getChainWebUrl(txHashOringion)" target="_blank">
            <p class="txHash">{{ txHash }}</p>
          </a>
          <img class="txHash_copy" src="@/assets/img/common/copy.svg" @click="copyAddressAction(txHashOringion)" />
        </div>
        <div class="bottomBtnBox1">
          <button class="alertCloseBtn" @click="alertCloseBtnAction">
            {{ $t("common.alertClose") }}
          </button>
        </div>
      </div>
    </el-dialog>


    <el-dialog title="" :visible.sync="successVisible1" :width="elDialogWidth" :show-close="false" center top="200px"
      :close-on-click-modal="false" append-to-body :lock-scroll="false" :close-on-press-escape="false"
      :destroy-on-close="true">
      <div class="dialogBack">
        <img class="dialogTopImg" src="@/assets/img/common/requestSuccess.svg" />
        <p class="dialopTitle">
          {{ requestSuccessStr1 }}
        </p>

        <div class="txHashBox">
          <p class="txHash_pre">{{ $t("common.txHash") + ":" }}</p>
          <a :href="getChainWebUrl(txHashOringion)" target="_blank">
            <p class="txHash">{{ txHash }}</p>
          </a>
          <img class="txHash_copy" src="@/assets/img/common/copy.svg" @click="copyAddressAction(txHashOringion)" />
        </div>
        <div class="bottomBtnBox1">
          <button class="alertCloseBtn" @click="alertCloseBtnAction">
            {{ $t("common.alertClose") }}
          </button>
        </div>
      </div>
    </el-dialog>


    <el-dialog title="" :visible.sync="successVisible2" :width="elDialogWidth" :show-close="false" center top="200px"
      :close-on-click-modal="false" append-to-body :lock-scroll="false" :close-on-press-escape="false"
      :destroy-on-close="true">
      <div class="dialogBack">
        <img class="dialogTopImg" src="@/assets/img/common/requestSuccess.svg" />
        <p class="dialopTitle">
          {{ requestSuccessStr2 }}
        </p>

        <div class="txHashBox">
          <p class="txHash_pre">{{ $t("common.txHash") + ":" }}</p>
          <a :href="getChainWebUrl(txHashOringion)" target="_blank">
            <p class="txHash">{{ txHash }}</p>
          </a>
          <img class="txHash_copy" src="@/assets/img/common/copy.svg" @click="copyAddressAction(txHashOringion)" />
        </div>
        <div class="bottomBtnBox1">
          <button class="alertCloseBtn" @click="alertCloseBtnAction">
            {{ $t("common.alertClose") }}
          </button>
        </div>
      </div>
    </el-dialog>


    <el-dialog title="" :visible.sync="warningDefaultVisible" :width="elDialogWidth" :show-close="false" center
      top="200px" :close-on-click-modal="false" append-to-body :lock-scroll="false" :close-on-press-escape="false"
      :destroy-on-close="true">
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


    <el-dialog title="" :visible.sync="warningDefaultVisible1" :width="elDialogWidth" :show-close="false" center
      top="200px" :close-on-click-modal="false" append-to-body :lock-scroll="false" :close-on-press-escape="false"
      :destroy-on-close="true">
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


    <el-dialog title="" :visible.sync="warningDefaultVisible2" :width="elDialogWidth" :show-close="false" center
      top="200px" :close-on-click-modal="false" append-to-body :lock-scroll="false" :close-on-press-escape="false"
      :destroy-on-close="true">
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
import poolDatas_main from "@/common/dataConfig_main";

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
  onLogsChange,
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

import {
  getLocalStorage,
  setLocalStorage,
  isLogin,
  localAccount,
  localUserLoginObject,
  getETHPriceItemCell,
  checkChainIdError,
  formmatToToLocaleStringEnUS
} from "@/common/utils";

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
    selectIconUrl() {
      return this.selectAll
        ? require("@/assets/img/farms/nft_select_y.svg")
        : require("@/assets/img/farms/nft_select_n.svg");
    },
    totalRewardStr() {
      if (this.totalReward * Math.pow(10, -18) > 10000) {
        return formmatToToLocaleStringEnUS((this.totalReward * Math.pow(10, -18)).toFixed(0)) + " STB";
      } else {
        return this.totalReward > 0
          ? formmatToToLocaleStringEnUS((this.totalReward * Math.pow(10, -18)).toFixed(2)) + " STB"
          : "--" + " STB";
      }
    },
    totalNftQuantityStr() {
      return formmatToToLocaleStringEnUS(this.totalNftQuantity) + " NFT"
    },
    totalTVLStr() {
      return formmatToToLocaleStringEnUS(Number(this.totalTVL.toFixed(2))) + " ETH"
    },

    totalBonusStr() {
      if (Number(this.totalBonus) == 0) {
        return "0 WETH"
      }
      if (this.totalBonus * Math.pow(10, -18) > 10000) {
        return formmatToToLocaleStringEnUS((this.totalBonus * Math.pow(10, -18)).toFixed(0)) + " WETH";
      } else {
        return formmatToToLocaleStringEnUS((this.totalBonus * Math.pow(10, -18)).toFixed(2)) + " WETH"

        // return this.totalBonus > 0
        //   ? (this.totalReward * Math.pow(10, -18)).toFixed(2) + " WETH"
        //   : "--" + " WETH";
      }
    },
    defaultMessageStr() {
      if (this.isGetReward) {
        return this.$t("common.defaultMessSub4");
      }
      if (this.isSwitch1) {
        return this.selectCount == 1
          ? this.$t("common.defaultMessSub1") +
          this.selectCount +

          this.$t("common.defaultMessSub2") + " " +
          "NFT"
          : this.$t("common.defaultMessSub1") +
          this.selectCount +
          this.$t("common.defaultMessSub2") + " " +
          "NFTs";
      } else {
        return this.selectCount == 1
          ? this.$t("common.defaultMessSub3") +
          " " +
          this.selectCount +
          this.$t("common.defaultMessSub2") +
          "WNFT"
          : this.$t("common.defaultMessSub3") +
          " " +
          this.selectCount +
          this.$t("common.defaultMessSub2") +
          "WNFTs";
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
      return this.$t("farms.depositSuccess");
    },

    requestSuccessStr1() {
      return this.$t("farms.withdrawSuccess");
    },

    requestSuccessStr2() {
      return this.$t("farms.getRewardSuccess");
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
      loadPoolDataCount: 0,
      selectAll: false,
      actionAlertShowLoading: false,
      txHash: "",
      txHashOringion: "",
      successVisible: false,
      successVisible1: false,
      successVisible2: false,

      selectPollItem: {},
      elDialogWidth: document.documentElement.clientWidth > 1200 ? "360px" : "300px",
      warningDefaultVisible: false,
      warningDefaultVisible1: false,
      warningDefaultVisible2: false,


      selectTokenIdsArr: [],
      selectCount: 0,
      totalNftQuantity: "--",
      totalTVL: 0,
      totalReward: 0,
      totalBonus: 0,

      currentBlockNumber: 0,
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
  beforeUpdate() { },
  beforeRouteEnter(to, from, next) {
    undefined;
    next(vm => {
      undefined;
      // 通过 `vm` 访问组件实例,将值传入fromPath
      // vm.setScrollToPostion();
    });
  },
  created() {
    // var prama = {
    //   treeId: 0,
    //   address: "0x3664d9F2b27C58D7ee71D436F27F5034359cD6fa",
    // }
    // var urlPath = "/tree/user";
    // this.$axios
    //   .get(urlPath, {
    //     params: prama
    //   })
    //   .then(res => {
    //     console.log("tree/user*******", res.data);
    //   });
    getBlockNumber(this.updateBlockData);
    onLogsChange();
    // onBlockNumberChange(this.updateBlockData);
    setTimeout(() => {
      this.$bus.$emit("updateTabIndex", 1);
    });


    var list = [];
    if (getProdcutMode() == 1) {
      list = poolDatas_main;
    } else {
      list = poolDatas;
    }
    list.sort(this.compare("sort"));
    this.poolItems = list
    // if (getProdcutMode() == 1) {
    //   this.poolItems = arr;
    // } else {
    //   this.poolItems =arr;
    // }
    setTimeout(() => {
      var isFirstLoad = true;
      this.getMasterChefInfo(isFirstLoad);
    }, 2000);

    // setTimeout(() => {
    //   this.getFloorPriceData();
    // }, 2000);
    this.loadPoolDataCount = 0
    setInterval(() => {
      if (this.loadPoolDataCount == 5) {
        return;
      }
      this.getMasterChefInfo(false);
      getBlockNumber(this.updateBlockData);
      this.loadPoolDataCount = this.loadPoolDataCount + 1;
    }, 1000 * 60 * 2);

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
      this.setSelectIdsArr();
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
          }
          if (val.isWNFTSell) {
            getWNFTTokenIDs(val.item, this.handleGetWNFTTokenIDs);
            this.isSwitch1 = false;
          }
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

    compare(p) { //这是比较函数
      return function (m, n) {
        var a = m[p];
        var b = n[p];
        return a - b; //升序
      }
    },
    setSelectIdsArr() {
      var selectTokenIdsArr = [];
      Object.keys(this.canSelectNftItems).forEach(key => {
        var item = this.canSelectNftItems[key];
        if (item.select) {
          selectTokenIdsArr.push(item.tokenId);
        }
      });
      this.selectTokenIdsArr = selectTokenIdsArr;
      this.selectCount = this.selectTokenIdsArr.length;
    },
    selectAllAction() {
      this.selectAll = !this.selectAll;
      Object.keys(this.canSelectNftItems).forEach(key => {
        var item = this.canSelectNftItems[key];
        item.select = this.selectAll;
      });
      this.setSelectIdsArr();
    },
    getChainWebUrl(subStr) {
      if (getProdcutMode() == 1) {
        return "https://etherscan.io/tx/" + subStr;
      } else {
        return "https://rinkeby.etherscan.io/tx/" + subStr;
      }
    },
    requestFloorPrice(item, handleFloorPrice, index) {
      // var urlPath = openseaApiBaseUrl() + "collection/" + item.collection.name + "/stats";
      var urlPath = "collection/" + item.collection.name + "/stats";
      // this.axios.defaults.baseURL = "https://api.opensea.io/api/v1/";
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
      if (Number(item.poolInfo.amount) > 0) {
        this.totalTVL += Number(item.floor_price) * Number(item.poolInfo.amount);
      }

      // // if (index == this.poolItems.length - 1) {
      // this.totalTVL = 0;
      // for (var i = 0; i < this.poolItems.length; i++) {
      //   const item = this.poolItems[i];
      //   this.totalTVL += Number(item.floor_price) * Number(item.poolInfo.amount);
      // }
      // }
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
      this.successVisible1 = false;
      this.successVisible2 = false;
    },
    alertBeforeAction() {
      if (this.selectTokenIdsArr.length == 0) {
        return;
      }
      if (checkChainIdError()) {
        this.$bus.$emit("checkChainIdError", "1");
        return;
      }
      this.warningDefaultVisible = true;
    },
    defaultBtnAction() {

      if (checkChainIdError()) {
        this.$bus.$emit("checkChainIdError", "1");
        return;
      }
      this.warningDefaultVisible = false;
      this.warningDefaultVisible1 = false;
      this.warningDefaultVisible2 = false;

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
      this.$message.error(this.$t("common.transactionCancle"))
    },
    faildHandleDaoporWithdraw(item) {
      this.$bus.$emit("upChainSuccessNoti", { selectItem: item, clickType: 1 });
      this.$message.error(this.$t("common.transactionCancle"))
    },
    faildHandleDaoporHarvest(item) {
      this.$bus.$emit("upChainSuccessNoti", { selectItem: item, clickType: 2 });
      this.$message.error(this.$t("common.transactionCancle"))
    },

    cancleBtnAction() {
      this.warningDefaultVisible = false;
      this.warningDefaultVisible1 = false;
      this.warningDefaultVisible2 = false;

    },

    handleDeposit(txHash, item) {
      this.txHash = this.getFrommatAccount(txHash.blockHash);
      this.txHashOringion = txHash.blockHash;
      this.getMasterChefInfo(false);
      this.successVisible = true;
      this.$bus.$emit("upChainSuccessNoti", { selectItem: item, clickType: 0 });
    },
    handleWithdraw(txHash, item) {
      this.txHash = this.getFrommatAccount(txHash.blockHash);
      this.txHashOringion = txHash.blockHash;
      this.getMasterChefInfo(false);
      this.successVisible1 = true;
      this.$bus.$emit("upChainSuccessNoti", { selectItem: item, clickType: 1 });
    },
    handleHarvest(txHash, item) {
      this.txHash = this.getFrommatAccount(txHash.blockHash);
      this.txHashOringion = txHash.blockHash;
      this.getMasterChefInfo(false);
      this.successVisible2 = true;
      this.$bus.$emit("upChainSuccessNoti", { selectItem: item, clickType: 2 });
    },
    updateBlockData(number, web3) {
      this.currentBlockNumber = number;
      console.log("currentBlockNumber", this.currentBlockNumber);
    },

    async getMasterChefInfo(isFirstLoad) {
      for (var i = 0; i < this.poolItems.length; i++) {
        var item = this.poolItems[i];
        await daoportAction(item, this.handleMasterChefInfo, i, isFirstLoad);
        // await approveNFTAction(item, this.handleNftApprove, i, true, this.faildHandleApproveNFT);
        // approveWNFTAction(item, this.handleWNftApprove, i, true, this.faildHandleApproveWNFT);
        // getNFTTokenIDs(item, this.handleGetNFTTokenIDs, i);
        // getWNFTTokenIDs(item, this.handleGetWNFTTokenIDs, i);
      }
    },
    async getFloorPriceData() {
      for (var i = 0; i < this.poolItems.length; i++) {
        var item = this.poolItems[i];
        if (item.collection.name) {
          this.requestFloorPrice(item, this.handleFloorPrice, i);
        }

      }
    },

    handleMasterChefInfo(masterChefInfo, item, index, isFirstLoad) {

      console.log("document=== masterchefinfo", item.poolInfo.pid, masterChefInfo, index);
      item.endBlock = masterChefInfo.endBlock;
      item.poolInfo.startBlock = masterChefInfo.poolInfo.startBlock;
      item.nftQuantity = masterChefInfo.nftQuantity;

      item.wnftQuantity = masterChefInfo.wnftQuantity;
      if (window.ethereum) {
        item.selectedAddress = window.ethereum.selectedAddress;
      } else {
        item.selectedAddress = null;
      }
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
      item.poolInfo.currentRewardIndex = masterChefInfo.poolInfo.currentRewardIndex;
      if (isFirstLoad) {
        if (item.collection.name) {
          this.requestFloorPrice(item, this.handleFloorPrice, index);
        }

      }
      // if (index == 0) {
      //   item.poolInfo.startBlock = 10776740;
      // }
      if (index == this.poolItems.length - 1) {
        this.totalNftQuantity = 0;
        this.totalReward = 0;
        this.totalBonus = 0;
        for (var i = 0; i < this.poolItems.length; i++) {
          const item = this.poolItems[i];
          this.totalNftQuantity += Number(item.poolInfo.amount);
          var reward = 0;

          if (this.currentBlockNumber > Number(item.poolInfo.startBlock)) {
            reward =
              (this.currentBlockNumber - Number(item.poolInfo.startBlock)) *
              Number(item.rewardForEachBlock);
          }
          if (Number(item.poolInfo.currentRewardIndex) == 1) {
            reward = Number(item.rewardForEachBlock) * 6500 * 30 + reward
          }
          this.totalReward += reward;
          this.totalBonus += item.dividend;
        }
      }
    },

    handleNftApprove(isApprove, item, index) {
      item.isNFTApproved = isApprove;
    },
    faildHandleApproveNFT(item) { },
    handleWNftApprove(isApprove, item, index) {
      item.isWNFTApprove = isApprove;
    },
    faildHandleApproveWNFT(item) { },
    handleGetNFTTokenIDs(NFTTokenIDs, item, index) {
      var emptyArr = [];
      for (var i = 0; i < NFTTokenIDs.length; i++) {
        var miniItem = {};
        miniItem.tokenId = Number(NFTTokenIDs[i]);
        miniItem.select = false;
        miniItem.collection = {};
        miniItem.collection.showName = item.collection.showName;
        miniItem.poolInfo = {};
        miniItem.poolInfo.pid = item.poolInfo.pid;
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
        miniItem.poolInfo = {};
        miniItem.poolInfo.pid = item.poolInfo.pid;
        miniItem.collection.showName = item.collection.showName;
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
      this.actionAlertShowLoading = true;
      this.resetSelectNFT();
      if (this.isSwitch1) {
        getNFTTokenIDs(this.selectPollItem, this.handleGetNFTTokenIDs);
      } else {
        getWNFTTokenIDs(this.selectPollItem, this.handleGetWNFTTokenIDs);
      }
      // this.canSelectNftItems = this.isSwitch1 ? this.NFTItems : this.WNFTItems;
      // this.isShowEmptyImg = this.canSelectNftItems.length > 0 ? false : true;
      this.$bus.$emit("selectNftAction", 1);
      this.$bus.$emit("switchBtnAction", this.isSwitch1);
    },
    closeAlertAction() {
      this.resetSelectNFT();
      this.actionAlertShow = false;
    },

    resetSelectNFT() {
      this.selectTokenIdsArr = [];
      this.selectCount = 0;
      this.canSelectNftItems = [];
      this.isShowEmptyImg = this.canSelectNftItems.length > 0 ? false : true;
      this.selectAll = false;
      Object.keys(this.NFTItems).forEach(key => {
        var item = this.NFTItems[key];
        item.select = false;
      });
      Object.keys(this.WNFTItems).forEach(key => {
        var item = this.WNFTItems[key];
        item.select = false;
      });
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
  height: 7.9rem;
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
  background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);
  ;
  border-radius: 0.75rem;
  width: 50%;
  border-style: none;
  font-size: 0.6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #fff;
  line-height: 0.4rem;
}

.unPledgeActionBox {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
}

.unPledgeAction {
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  height: 1.5rem;
  border-radius: 0.75rem;
  border-style: none;
  background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);
  ;
  font-size: 0.6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 0.4rem;
}

.selectAllBtnBox {
  margin-right: 0.5rem;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  height: 1.5rem;
  border-radius: 0.75rem;
  border-style: none;
  /*   background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);; */
  font-size: 0.6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 0.4rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
}

.selectAllBtnBox_text {
  font-size: .4rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #111111;
  line-height: .4rem;
}

.selectAllBtnBox_img {
  margin-left: 0.25rem;
  width: .5rem;
  height: .5rem;
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
  /*   background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);; */
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

.courseBox_super {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: .125rem;
}

.courseBox {
  display: flex;
  justify-content: right;
  /* width: 33.33%; */
  flex-direction: row-reverse;
}

.courseBox_contantBox {
  margin-top: .35rem;
  margin-right: .35rem;
  background-color: white;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 1rem;
  cursor: pointer;
}

.courseBox_contantBox_imgLeft {
  margin-left: .125rem;
  width: .6327rem;
  height: .6rem;
}

.courseBox_contantBox_imgRight {
  margin-left: .1rem;
  width: .2rem;
  height: .35rem;
  margin-right: .125rem;
}


.courseBox_contantBox_text {
  margin-left: .15rem;
  margin-right: .2rem;
  font-size: .5rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #F7B500;
  line-height: .7rem;
}

.topImgIconBox {
  display: flex;
  justify-content: center;
  flex-direction: row;
  position: relative;
  width: 33.33%;
}

.topImgIcon {
  width: 10rem;
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
  margin-top: -0.3rem;
  font-size: 0.53rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 0.825rem;
  white-space: nowrap;
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
  /*   background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);; */
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
  background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);
  ;
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
  background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);
  ;
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
  cursor: pointer;
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

@media screen and (-webkit-min-device-pixel-ratio: 1) and (min-width: 1200px) {
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
    height: 9.5rem;
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
    background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);
    ;
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
    background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);
    ;
    font-size: 0.4rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 0.4rem;
  }

  .selectAllBtnBox {
    border-style: solid;
    border-width: 1px;
    border-color: #E5E5E5;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    height: 1rem;
    border-radius: 0.5rem;
    /*   background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);; */
    font-size: 0.4rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 0.4rem;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .selectAllBtnBox_text {
    font-size: .4rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #111111;
    line-height: .4rem;
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
    /*   background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);; */
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
    font-size: .4rem;
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


  .courseBox_super {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 0.125rem;
  }

  .courseBox {
    display: flex;
    justify-content: right;
    /* width: 33.33%; */
    flex-direction: row-reverse;
  }

  .courseBox_contantBox {
    margin-top: .375rem;
    margin-right: .375rem;
    background-color: white;
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 1rem;
    cursor: pointer;
  }

  .courseBox_contantBox_imgLeft {
    margin-left: .25rem;
    width: .6327rem;
    height: .6rem;
  }

  .courseBox_contantBox_imgRight {
    margin-left: .1rem;
    width: .2rem;
    height: .35rem;
    margin-right: .25rem;
  }


  .courseBox_contantBox_text {
    margin-left: .15rem;
    margin-right: .2rem;
    font-size: .45rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #F7B500;
    line-height: .7rem;
  }

  .topImgIconBox {
    display: flex;
    justify-content: center;
    flex-direction: row;
    position: relative;
    width: 33.33%;
  }

  .topImgIcon {
    width: 8rem;
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
    margin-top: -0.3rem;
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
    font-size: .35rem;
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
    background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);
    ;
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
    background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);
    ;
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
    width: 0.5rem;
    height: 0.5rem;
    cursor: pointer;
  }
}
</style>
