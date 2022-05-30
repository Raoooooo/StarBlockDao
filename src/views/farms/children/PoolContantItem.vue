<template>
  <div class="contant" :class="{ contantSroll: items.length > 7 }">
    <!-- 抵押、解抵押 -->
    <div class="pledgeBtnBox">
      <button class="pledgeBtn" @click="pledgeBtnAction()">
        <p class="pledgeBtn_text" v-show="!showImgLoading">{{ getPledgeBtnStr }}</p>
        <img
          class="loadingImg"
          src="@/assets/img/common/requestLoading_white.svg"
          v-show="showImgLoading"
        />
      </button>

      <button class="unPledgeBtn" @click="unPledgeBtnAction()">
        <p class="pledgeBtn_text" v-show="!showImgLoading1">{{ getUnPledgeBtnStr }}</p>
        <img
          class="loadingImg"
          src="@/assets/img/common/requestLoading_yellow.svg"
          v-show="showImgLoading1"
        />
      </button>
    </div>
    <!-- 领取奖励 -->
    <button class="getAwardBtn" @click="getAwardBtnAction">
      <p v-show="!showImgLoading2">{{ $t("farms.getAward") + " " + awardAmountStr(item) }}</p>
      <img
        class="loadingImg"
        src="@/assets/img/common/requestLoading_white.svg"
        v-show="showImgLoading2"
      />
    </button>
    <button class="getBonuBtn">{{ $t("farms.getBonus") + " " + bonusAmountStr(item) }}</button>
  </div>
</template>

<script>
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
  daoporHarvest
} from "@/common/starblockdao";
export default {
  name: "Poolcontantitem",
  components: {},
  data() {
    var rowNum = 0;
    if (document.documentElement.clientWidth <= 700) {
      rowNum = 24;
    }
    // else if (
    //   document.documentElement.clientWidth > 700 &&
    //   document.documentElement.clientWidth < 1920
    // ) {
    //   rowNum = 8;
    // }
    else {
      rowNum = 6;
    }
    return {
      showImgLoading: false,
      showImgLoading1: false,
      showImgLoading2: false,
      pledgeBtnStr: "",
      unPledgeBtnStr: ""
    };
  },
  created() {
    // alert(document.documentElement.clientWidth);
    // if (this.serviceRate == 0) {
    // this.requestServiceRate();
    // }
  },
  computed: {
    getPledgeBtnStr() {
      // if (isLogin != "1") {
      //   return "链接钱包";
      // }
      //   alert(this.item.nftQuantity);
      if (this.showImgLoading) {
        this.pledgeBtnStr = "";
      }
      if (this.item && !this.item.isNFTApprove) {
        this.pledgeBtnStr = "抵押授权";
        // return "抵押授权";
      } else {
        this.pledgeBtnStr = this.$t("farms.pledge") + "(" + this.item.nftQuantity + ")";
      }
      return this.pledgeBtnStr;
    },

    getUnPledgeBtnStr() {
      if (this.showImgLoading1) {
        this.pledgeBtnStr = "";
      }
      if (this.item && !this.item.isWNFTApprove) {
        this.unPledgeBtnStr = "解抵押授权";
      } else {
        this.unPledgeBtnStr = this.$t("farms.unPledge") + "(" + this.item.wnftQuantity + ")";
      }

      return this.unPledgeBtnStr;
    }
  },
  props: {
    items: {
      type: Array,
      default() {
        return [];
      }
    },
    item: {
      type: Object,
      default() {
        return {};
      }
    },
    isRecommend: {
      type: Boolean,
      default() {
        return false;
      }
    },
    itemsHeight: {
      type: Boolean,
      default: true
    }
  },
  watch: {},

  mounted() {
    this.$bus.$on("defaultBtnNotiAction", val => {
      if (val.selectItem.poolInfo.pid != this.item.poolInfo.pid) {
        return;
      }
      if (val.clickType == 0) {
        this.showImgLoading = true;
      } else if (val.clickType == 1) {
        this.showImgLoading1 = true;
      } else if (val.clickType == 2) {
        this.showImgLoading2 = true;
      }
    });

    this.$bus.$on("upChainSuccessNoti", val => {
      if (val.selectItem.poolInfo.pid != this.item.poolInfo.pid) {
        return;
      }
      if (val.clickType == 0) {
        this.showImgLoading = false;
      } else if (val.clickType == 1) {
        this.showImgLoading1 = false;
      } else if (val.clickType == 2) {
        this.showImgLoading2 = false;
      }
    });

    var that = this;
    // <!--把window.onresize事件挂在到mounted函数上-->
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight;
        window.fullWidth = document.documentElement.clientWidth;
        that.windowHeight = window.fullHeight; // 高
        that.windowWidth = window.fullWidth; // 宽
      })();
    };
  },
  methods: {
    formmatBlockStr(blockNumber) {
      if (blockNumber > 1000 && blockNumber < 10000) {
        return Number(blockNumber / 1000).toFixed(2) + "K";
      } else if (blockNumber >= 10000 && blockNumber < 10000000) {
        return Number(blockNumber / 10000).toFixed(2) + "W";
      } else if (blockNumber >= 10000000) {
        return Number(blockNumber / 10000000).toFixed(2) + "KW";
      } else {
        return blockNumber;
      }
    },
    awardAmountStr(item) {
      if (item.mining != "--") {
        return (item.mining * Math.pow(10, -18)).toFixed(2) + " STB";
      }
      return item.mining;
    },
    bonusAmountStr(item) {
      if (item.dividend != "--") {
        return (item.dividend * Math.pow(10, -18)).toFixed(2) + " WNFT";
      }
      return item.dividend;
    },

    bonusAmountAtr(item) {},
    // showImgLoading(item) {
    //   if (this.currentPollItem && this.currentPollItem.poolInfo.uid == item.poolInfo.uid) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // },
    // pledgeBtnStr(item) {
    //   // if (isLogin != "1") {
    //   //   return "链接钱包";
    //   // }s
    //   if (!item.isNFTApprove) {
    //     return "抵押授权";
    //   } else {
    //   }
    //   return this.$t("farms.pledge") + "(" + item.nftQuantity + ")";
    // },
    // unPledgeBtnStr(item) {
    //   if (!item.isWNFTApprove) {
    //     return "解抵押授权";
    //   } else {
    //   }
    //   return this.$t("farms.unPledge") + "(" + item.wnftQuantity + ")";
    // },
    isShowEndBlock(item, currentBlockNumber) {
      if (
        Number(item.poolInfo.endBlock) - currentBlockNumber > 0 &&
        Number(item.poolInfo.startBlock) - currentBlockNumber <= 0
      ) {
        return true;
      } else {
        return false;
      }
    },
    isShowStartBlock(item, currentBlockNumber) {
      if (Number(item.poolInfo.startBlock) - currentBlockNumber > 0) {
        return true;
      } else {
        return false;
      }
    },
    isShowSellEndBlock(item, currentBlockNumber) {
      if (Number(item.poolInfo.endBlock) - currentBlockNumber <= 0) {
        return true;
      } else {
        return false;
      }
    },
    rewardAmount(item) {
      if (item.rewardForEachBlock) {
        return (Number(item.rewardForEachBlock) * 6500 * 30 * Math.pow(10, -18)).toFixed(2);
      }
      if (Number(item.rewardPerNFTForEachBlock) > 0 && Number(item.poolInfo.amount) > 0) {
        return (
          Number(item.rewardPerNFTForEachBlock) *
          6500 *
          30 *
          Number(item.poolInfo.amount) *
          Math.pow(10, -18)
        ).toFixed(2);
      } else if (Number(item.poolInfo.amount) == 0) {
        return "--";
      }
    },
    pledgeBtnAction() {
      if (this.showImgLoading) {
        return;
      }
      if (!this.item.isNFTApprove) {
        if (this.showImgLoading) {
          return;
        }
        approveNFTAction(this.item, this.handleNftApprove, 0, false, this.faildHandleApproveNFT);
        this.showImgLoading = true;
        return;
      }
      //   this.showImgLoading = true;
      //   this.$bus.$emit("daoporDepositNotiAction", this.item);
      this.pledgeBtnStr = "";
      //   this.item.showImgLoading = true;
      this.$bus.$emit("pledgeBtnNotiAction", {
        item: this.item,
        isNFTSell: true,
        isWNFTSell: false,
        isGetReward: false
      });
    },
    faildHandleApproveNFT(item) {
      this.showImgLoading = false;
    },
    unPledgeBtnAction() {
      if (this.showImgLoading1) {
        return;
      }
      if (!this.item.isWNFTApprove) {
        if (this.showImgLoading1) {
          return;
        }
        approveWNFTAction(this.item, this.handleWNftApprove, 0, false, this.faildHandleApproveWNFT);
        this.showImgLoading1 = true;
        return;
      }
      this.$bus.$emit("pledgeBtnNotiAction", {
        item: this.item,
        isNFTSell: false,
        isWNFTSell: true,
        isGetReward: false
      });
      //   this.showImgLoading1 = true;
      // onBlockNumberChange();
      // watchEtherTransfers()
      // console.log(poolDatas);
      // daoportAction();
      // this.$bus.$emit("alertAction", "1");
    },
    getAwardBtnAction() {
      if (this.showImgLoading2) {
        return;
      }
      if (!Number(this.item.mining) < 0) {
        return;
      }
      //   this.showImgLoading2 = true;
      this.$bus.$emit("pledgeBtnNotiAction", {
        item: this.item,
        isNFTSell: false,
        isWNFTSell: false,
        isGetReward: true
      });
    },

    handleNftApprove(isApprove, item, index) {
      this.item.isNFTApprove = isApprove;
      this.showImgLoading = false;
    },
    handleWNftApprove(isApprove, item, index) {
      this.item.isWNFTApprove = isApprove;
      this.showImgLoading1 = false;
    },
    faildHandleApproveWNFT() {
      this.showImgLoading1 = false;
    }
  }
};
</script>

<style scoped>
.contant {
  /* border-radius: .25rem; */
  /* border-style: solid; */
  /* border-color: #ECECEC; */
  width: 100%;
  display: flex;
  flex-direction: column;
  /* overflow-y: scroll; */
  /* border-width: .025rem; */
}

.pledgeBtnBox {
  margin-top: 0.75rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 0.1rem;
  justify-content: space-between;
  height: 1rem;
  margin-left: 2.5%;
  width: 95%;
}

/* .pledgeBtnSubBox {
  border-style: none;
  width: 45%;
  height: 1.75rem;
  background-color: #f7b500;
  border-radius: 0.875rem;
  color: #fff;
  font-size: 0.6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  display: flex;
  align-items: center;
  justify-content: center;
} */

.pledgeBtn {
  border-style: none;
  width: 45%;
  height: 1.75rem;
  background-color: #f7b500;
  border-radius: 0.875rem;
  color: #fff;
  font-size: 0.6rem;
  font-family: PingFangSC-Medium, PingFang SC;
}
.unPledgeBtn {
  border-style: solid;
  border-width: 0.025rem;
  border-color: #f7b500;
  /* width: 3.55rem; */
  width: 45%;
  height: 1.75rem;
  background-color: #fff;
  border-radius: 0.875rem;
  color: #f7b500;
  font-size: 0.6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  display: flex;
  align-items: center;
  justify-content: center;
}
.getAwardBtn {
  border-style: none;
  margin-top: 0.75rem;
  height: 1rem;
  margin-left: 2.5%;
  width: 95%;
  height: 1.75rem;
  background-color: #f7b500;
  border-radius: 0.875rem;
  color: #fff;
  font-size: 0.6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  display: flex;
  align-items: center;
  justify-content: center;
}
.getBonuBtn {
  border-style: none;
  margin-top: 0.5rem;
  height: 1.75rem;
  margin-left: 2.5%;
  width: 95%;
  height: 1rem;
  background-color: #e5e5e5;
  border-radius: 0.875rem;
  color: #8c9399;
  font-size: 0.6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  margin-bottom: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.commonBtnBox {
  position: relative;
}
.loadingImg {
  width: 1.75rem;
  height: 1.75rem;
}

@media screen and (-webkit-min-device-pixel-ratio: 1) and (min-width: 1000px) {
  .pledgeBtnBox {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 0.1rem;
    justify-content: space-between;
    height: 1rem;
    margin-left: 5%;
    width: 90%;
  }

  .pledgeBtn {
    border-style: none;
    width: 45%;
    height: 1rem;
    background-color: #f7b500;
    border-radius: 0.5rem;
    color: #fff;
    font-size: 0.35rem;
    font-family: PingFangSC-Medium, PingFang SC;
  }
  .unPledgeBtn {
    border-style: solid;
    border-width: 0.025rem;
    border-color: #f7b500;
    /* width: 3.55rem; */
    width: 45%;
    height: 1rem;
    background-color: #fff;
    border-radius: 0.5rem;
    color: #f7b500;
    font-size: 0.35rem;
    font-family: PingFangSC-Medium, PingFang SC;
  }
  .getAwardBtn {
    border-style: none;
    margin-top: 0.25rem;
    height: 1rem;
    margin-left: 5%;
    width: 90%;
    height: 1rem;
    background-color: #f7b500;
    border-radius: 0.5rem;
    color: #fff;
    font-size: 0.35rem;
    font-family: PingFangSC-Medium, PingFang SC;
  }
  .getBonuBtn {
    border-style: none;
    margin-top: 0.25rem;
    height: 1rem;
    margin-left: 5%;
    width: 90%;
    height: 1rem;
    background-color: #e5e5e5;
    border-radius: 0.5rem;
    color: #8c9399;
    font-size: 0.35rem;
    font-family: PingFangSC-Medium, PingFang SC;
    margin-bottom: 0.5rem;
  }

  .commonBtnBox {
    position: relative;
  }
  .loadingImg {
    width: 1rem;
    height: 1rem;
  }
}
</style>