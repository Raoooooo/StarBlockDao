<template>
  <div class="contant">
    <!-- 抵押、解抵押 -->
    <div class="pledgeBtnBox">
      <button class="pledgeBtn" :class="isBtnActive ? 'pledgeBtn' : 'pledgeBtn_unActive'" @click="pledgeBtnAction()">
        <p class="pledgeBtn_text" v-show="!showImgLoading">{{ getPledgeBtnStr }}</p>
        <img class="loadingImg" src="@/assets/img/common/requestLoading_white.svg" v-show="showImgLoading" />
      </button>

      <button :class="isWNFTBtnActive ? 'unPledgeBtn' : 'pledgeBtn_unActive'" @click="unPledgeBtnAction()">
        <p class="pledgeBtn_text" v-show="!showImgLoading1">{{ getUnPledgeBtnStr }}</p>
        <img class="loadingImg" src="@/assets/img/common/requestLoading_yellow.svg" v-show="showImgLoading1" />
      </button>
    </div>
    <!-- 领取奖励 -->
    <button :class="item.mining > 0 ? 'getAwardBtn' : 'getAwardBtn_unActive'" @click="getAwardBtnAction">
      <p v-show="!showImgLoading2">{{ $t("farms.getAward") + " " + awardAmountStr(item) }}</p>
      <img class="loadingImg" src="@/assets/img/common/requestLoading_white.svg" v-show="showImgLoading2" />
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
  daoporHarvest,
  getAccounts
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
    isBtnActive() {
      if (!window.ethereum) {
        return false;
      }
      if (!this.item.selectedAddress) {
        return false;
      }
      if (Number(this.item.endBlock) == 0) {
        return false;
      }
      // if (Number(this.item.poolInfo.startBlock) > this.currentBlockNumber && this.item.isNFTApproved) {
      //   return false
      // } else {
      //   if (window.ethereum.selectedAddress) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // }

      if (Number(this.item.poolInfo.startBlock) > this.currentBlockNumber) {
        return false
      } else {
        if (window.ethereum.selectedAddress) {
          return true;
        } else {
          return false;
        }
      }
    },

    isWNFTBtnActive() {
      if (!window.ethereum) {
        return false;
      }
      if (!this.item.selectedAddress) {
        return false;
      }
      if (Number(this.item.endBlock) == 0) {
        return false;
      }
      // if (Number(this.item.poolInfo.startBlock) > this.currentBlockNumber && this.item.isWNFTApproved) {
      //   return false
      // } else {
      //   if (window.ethereum.selectedAddress) {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // }

      if (Number(this.item.poolInfo.startBlock) > this.currentBlockNumber) {
        return false
      } else {
        if (window.ethereum.selectedAddress) {
          return true;
        } else {
          return false;
        }
      }
    },
    getPledgeBtnStr() {
      // if (isLogin != "1") {
      //   return "链接钱包";
      // }
      //   alert(this.item.nftQuantity);
      if (this.showImgLoading) {
        this.pledgeBtnStr = "";
      }
      if (this.item && !this.item.isNFTApproved) {
        this.pledgeBtnStr = this.$t("common.stakeApprove") + "(" + this.item.nftQuantity + ")";
      } else {
        this.pledgeBtnStr = this.$t("farms.pledge") + "(" + this.item.nftQuantity + ")";
      }
      return this.pledgeBtnStr;
    },

    getUnPledgeBtnStr() {
      if (this.showImgLoading1) {
        this.pledgeBtnStr = "";
      }
      if (this.item && !this.item.isWNFTApproved) {
        this.unPledgeBtnStr = this.$t("common.unstakeApprove") + "(" + this.item.wnftQuantity + ")";
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
    currentBlockNumber: {
      type: Number,
      default() {
        return 0;
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
        // this.showImgLoading = true;
        // this.showImgLoading1 = false;
        // this.showImgLoading2 = false;
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
      if (Number(item.mining) == 0) {
        return "0 STB";
      }
      if (item.mining != "--") {
        return formmatToToLocaleStringEnUS((item.mining * Math.pow(10, -18)).toFixed(2)) + " STB";
      }
      return item.mining;
    },
    bonusAmountStr(item) {
      if (Number(item.dividend) == 0) {
        return "0 WETH";
      }
      if (item.dividend != "--") {
        return formmatToToLocaleStringEnUS((item.dividend * Math.pow(10, -18)).toFixed(2)) + " WETH";
      }
      return item.dividend;
    },

    pledgeBtnAction() {
      if (this.showImgLoading) {
        return;
      }
      if (!this.isBtnActive) {
        return;
      }

      if (checkChainIdError()) {
        this.$bus.$emit("checkChainIdError", "1");
        return;
      }
      getAccounts()
        .then(accounts => {
          if (accounts) {
            // if (!this.item.isNFTApproved) {
            //   if (this.showImgLoading) {
            //     return;
            //   }
            //   approveNFTAction(
            //     this.item,
            //     this.handleNftApprove,
            //     0,
            //     false,
            //     this.faildHandleApproveNFT
            //   );
            //   this.showImgLoading = true;
            //   return;
            // }
            this.pledgeBtnStr = "";
            this.$bus.$emit("pledgeBtnNotiAction", {
              item: this.item,
              isNFTSell: true,
              isWNFTSell: false,
              isGetReward: false
            });
          } else {
            this.$message.error(this.$t("common.connectWalletMsg"));
          }
        })
        .catch(error => this.$message.error(this.$t("common.connectWalletMsg")));
    },
    faildHandleApproveNFT(item) {
      this.showImgLoading = false;
      this.$message.error(this.$t("common.transactionCancle"))
    },
    unPledgeBtnAction() {
      if (this.showImgLoading1) {
        return;
      }
      if (!this.isWNFTBtnActive) {
        return;
      }

      if (checkChainIdError()) {
        this.$bus.$emit("checkChainIdError", "1");
        return;
      }
      getAccounts()
        .then(accounts => {
          if (accounts) {
            // if (!this.item.isWNFTApproved) {
            //   if (this.showImgLoading1) {
            //     return;
            //   }
            //   approveWNFTAction(
            //     this.item,
            //     this.handleWNftApprove,
            //     0,
            //     false,
            //     this.faildHandleApproveWNFT
            //   );
            //   this.showImgLoading1 = true;
            //   return;
            // }
            this.$bus.$emit("pledgeBtnNotiAction", {
              item: this.item,
              isNFTSell: false,
              isWNFTSell: true,
              isGetReward: false
            });
          } else {
            this.$message.error(this.$t("common.connectWalletMsg"));
          }
        })
        .catch(error => this.$message.error(this.$t("common.connectWalletMsg")));
    },
    getAwardBtnAction() {
      if (this.item.mining <= 0) {
        return;
      }
      if (this.showImgLoading2) {
        return;
      }

      if (checkChainIdError()) {
        this.$bus.$emit("checkChainIdError", "1");
        return;
      }
      if (!Number(this.item.mining) < 0) {
        return;
      }

      getAccounts()
        .then(accounts => {
          if (accounts) {
            this.$bus.$emit("pledgeBtnNotiAction", {
              item: this.item,
              isNFTSell: false,
              isWNFTSell: false,
              isGetReward: true
            });
          } else {
            this.$message.error(this.$t("common.connectWalletMsg"));
          }
        })
        .catch(error => this.$message.error(this.$t("common.connectWalletMsg")));
    },

    handleNftApprove(isApprove, item, index) {
      this.item.isNFTApproved = isApprove;
      this.showImgLoading = false;
    },
    handleWNftApprove(isApprove, item, index) {
      this.item.isWNFTApproved = isApprove;
      this.showImgLoading1 = false;
    },
    faildHandleApproveWNFT() {
      this.showImgLoading1 = false;
      this.$message.error(this.$t("common.transactionCancle"))
    }
  }
};
</script>

<style scoped>
.contant {
  margin-top: 0.1rem;
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
    background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);;
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
  width: 47%;
  height: 1.75rem;
  background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);
  ;
  border-radius: 0.1rem;
  color: #fff;
  font-size: 0.6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  cursor: pointer;
}

.pledgeBtn_unActive {
  border-style: none;
  width: 47%;
  height: 1.75rem;
  background-color: #e5e5e5;
  border-radius: 0.1rem;
  background: #f2f2f2;
  color: #8c9399;
  font-size: 0.6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  cursor: default;
}

.unPledgeBtn {
  border-style: solid;
  border-width: 0.0375rem;
  border-color: #f7b500;
  /* width: 3.55rem; */
  width: 47%;
  height: 1.75rem;
  background-color: #fff;
  border-radius: .1rem;
  color: #f7b500;
  font-size: 0.6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.getAwardBtn {
  border-style: none;
  margin-top: 0.75rem;
  height: 1rem;
  margin-left: 2.5%;
  width: 95%;
  height: 1.75rem;
  background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);
  ;
  border-radius: 0.1rem;
  color: #fff;
  font-size: 0.6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.getAwardBtn_unActive {
  border-style: none;
  margin-top: 0.75rem;
  height: 1rem;
  margin-left: 2.5%;
  width: 95%;
  height: 1.75rem;
  background-color: #f2f2f2;
  border-radius: 0.1rem;
  color: #8c9399;
  font-size: 0.6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: default;
}

.getBonuBtn {
  border-style: none;
  margin-top: 0.5rem;
  height: 1.75rem;
  margin-left: 2.5%;
  width: 95%;
  height: 1.75rem;
  background-color: #f2f2f2;
  border-radius: 0.1rem;
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

@media screen and (-webkit-min-device-pixel-ratio: 1) and (min-width: 1200px) {

  .contant {
    margin-top: -0.25rem;
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
    margin-top: 0.625rem;
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
    width: 47%;
    height: 1rem;
    background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);
    ;
    border-radius: 0.1rem;
    color: #fff;
    font-size: 0.35rem;
    font-family: PingFangSC-Medium, PingFang SC;
  }

  .pledgeBtn_unActive {
    border-style: none;
    width: 47%;
    height: 1rem;
    border-radius: 0.1rem;
    background: #f2f2f2;
    font-size: 0.35rem;
    color: #8c9399;
    font-family: PingFangSC-Medium, PingFang SC;
  }

  .unPledgeBtn {
    border-style: solid;
    border-width: 0.0375rem;
    border-color: #f7b500;
    /* width: 3.55rem; */
    width: 47%;
    height: 1rem;
    background-color: #fff;
    border-radius: .1rem;
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
    background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);
    ;
    border-radius: 0.1rem;
    color: #fff;
    font-size: 0.35rem;
    font-family: PingFangSC-Medium, PingFang SC;
  }

  .getAwardBtn_unActive {
    border-style: none;
    margin-top: 0.25rem;
    height: 1rem;
    margin-left: 5%;
    width: 90%;
    height: 1rem;
    background-color: #f2f2f2;
    border-radius: 0.1rem;
    color: #8c9399;
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
    border-radius: 0.1rem;
    background-color: #f2f2f2;
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