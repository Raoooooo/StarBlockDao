<template>
  <div>
    <p class="countDownTitle" :class="{ countDownTitle_farms: isFarms == true }">
      {{ $t("home.countDownTitle") }}
    </p>
    <div class="countDownBackBox">
      <div class="countDownBack_topBox">
        <div class="countDownContantBox">
          <div class="itemCountBox" v-for="(item, index) in countDownItemArr">
            <p class="itemCountBox_text">{{ item }}</p>
          </div>
        </div>
        <a href="https://etherscan.io/block/countdown/14885190" target="_blank">
          <div class="countDownJumpBox">
            <p class="countDownJumpBox_text">{{ $t("home.block") }}</p>
            <img class="countDownJumpBox_icon" src="@/assets/img/home/jumpAccess.png" />
          </div>
        </a>
      </div>
      <div class="countDownBack_bottomBox">
        <img class="countDownBack_bottomBox_img" src="@/assets/img/home/countDownDes_back.png" />
        <div class="countDownBack_bottomBox_contantBox">
          <p class="countDownBack_bottomBox_text">
            {{ $t("home.esTime") + $t("home.esTimeDes") }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import qs from "qs";
import { isLogin } from "@/common/utils";
import { daoportAction, getBlockNumber, onBlockNumberChange } from "@/common/starblockdao";
import { getRequestBaseUrl, getProdcutMode } from "@/common/starBlockConfig";

export default {
  name: "Countdown",
  created() {
    getBlockNumber(this.updateBlockData);
    onBlockNumberChange(this.updateBlockData);
  },
  data() {
    var descripHeight = "0px";
    if (document.documentElement.clientWidth > 1200) {
      descripHeight = this.$i18n.locale == "en" ? "160px" : "95px";
    } else if (document.documentElement.clientWidth <= 500) {
      descripHeight = this.$i18n.locale == "en" ? "110px" : "80px";
    } else {
      descripHeight = "270px";
    }

    return {
      countDownItemArr: [],
      currentBlockNumber: 0,
      startBlockNumber: 14885190,
      descripHeight: descripHeight,
      windowWidth: document.documentElement.clientWidth, //实时屏幕宽度
      rowNum: document.documentElement.clientWidth > 1200 ? 6 : 12,
      gutterSpace: document.documentElement.clientWidth > 1200 ? 27 : 10,
      isSave: false
    };
  },
  props: {
    // countDownItemArr: {
    //   type: Array,
    //   default() {
    //     return [];
    //   }
    // }
    isFarms: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  watch: {},

  mounted() {},
  methods: {
    updateBlockData(number, web3) {
      this.currentBlockNumber = number;
      if (this.currentBlockNumber < 14847117) {
        this.currentBlockNumber = this.currentBlockNumber + 4104535;
      }
      var countDownStr = String(14885190 - this.currentBlockNumber);

      this.countDownItemArr = countDownStr.split("");
      // if (getProdcutMode() == 0) {
      //   var countDownStrSub = countDownStr.substring(countDownStr.length - 5);
      //   this.countDownItemArr = countDownStrSub.split("");
      // }
      console.log("this.countDownItemArr", this.countDownItemArr);
    }
  }
};
</script>

<style scoped>
.countDownTitle {
  margin-top: 0.75rem;
  font-size: 0.75rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #f7b500;
  line-height: 1.05rem;
  width: 100%;
  text-align: center;
  /* background: linear-gradient(238deg, #fd9733 0%, #f7b500 100%); */
  /* background: linear-gradient(238deg, #fd9733 0%, #f7b500 100%); */
  /* -webkit-text-fill-color: transparent; */
}

.countDownTitle_farms {
  width: 100%;
  text-align: center;
  margin-top: 0.75rem;
  font-size: 0.75rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #f7b500;
  line-height: 1.05rem;
}

.countDownBackBox {
  margin-top: 0.25rem;
  width: 12rem;
  height: 3.5rem;
  background: linear-gradient(238deg, #fd9733 0%, #f7b500 100%);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.countDownBack_topBox {
  margin-top: 0.375rem;
  width: 100%;
  display: flex;
  flex-direction: row;
}
.countDownContantBox {
  margin-left: 0.375rem;
  /* width: 8.725rem; */
  width: 7.825rem;
  height: 1.275rem;
  /* flex: 1; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.countDownJumpBox {
  margin-left: 0.55rem;
  width: 2.9rem;
  height: 1.275rem;
  background: #ffffff;
  border-radius: 7px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.itemCountBox {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.275rem;
  height: 1.275rem;
  background: #ffffff;
  border-radius: 0.175rem;
}
.itemCountBox_text {
  font-size: 0.85rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #f7b500;
  line-height: 1.2rem;
}
.countDownBack_bottomBox {
  margin-top: 0.25rem;
  position: relative;
  /* width: 11.25rem;
  height: 0.9rem;
  background: #ffffff;
  border-radius: 0.45rem;
  opacity: 0.2;
  display: flex;
  justify-content: center;
  align-items: center; */
}
.countDownBack_bottomBox_img {
  width: 11.25rem;
  height: 0.9rem;
}
.countDownBack_bottomBox_text {
  margin-top: -0.15rem;
  font-size: 0.55rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 0.75rem;
  /* letter-spacing: 1px; */
}
.countDownJumpBox_text {
  font-size: 0.65rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #f7b500;
  line-height: 0.925rem;
}
.countDownJumpBox_icon {
  margin-left: 0.2rem;
  width: 0.55rem;
  height: 0.55rem;
}

.countDownBack_bottomBox_contantBox {
  top: 0%;
  left: 0%;
  height: 100%;
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

@media screen and (-webkit-min-device-pixel-ratio: 1) and (min-width: 1000px) {
  .countDownTitle {
    margin-top: 0.5rem;
    font-size: 1.25rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #f7b500;
    line-height: 1.75rem;
    width: auto;
    text-align: left;

    /* background: linear-gradient(238deg, #fd9733 0%, #f7b500 100%); */
    /* -webkit-text-fill-color: transparent; */
  }

  .countDownTitle_farms {
    width: 100%;
    text-align: center;
    margin-top: 0.5rem;
    font-size: 1.25rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #f7b500;
    line-height: 1.75rem;

    /* background: linear-gradient(238deg, #fd9733 0%, #f7b500 100%); */
    /* -webkit-text-fill-color: transparent; */
  }

  .countDownBackBox {
    margin-top: 0.25rem;
    width: 12rem;
    height: 3.5rem;
    background: linear-gradient(238deg, #fd9733 0%, #f7b500 100%);
    border-radius: 0.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .countDownBack_topBox {
    margin-top: 0.375rem;
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  .countDownContantBox {
    margin-left: 0.375rem;
    /* width: 8.725rem; */
    width: 7.825rem;
    height: 1.275rem;
    /* flex: 1; */
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .countDownJumpBox {
    margin-left: 0.55rem;
    width: 2.9rem;
    height: 1.275rem;
    background: #ffffff;
    border-radius: 7px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .itemCountBox {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.275rem;
    height: 1.275rem;
    background: #ffffff;
    border-radius: 0.175rem;
  }
  .itemCountBox_text {
    font-size: 0.85rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #f7b500;
    line-height: 1.2rem;
  }
  .countDownBack_bottomBox {
    position: relative;
    margin-top: 0.25rem;
    /* width: 11.25rem;
    height: 0.9rem;
    background: #ffffff;
    border-radius: 0.45rem;
    opacity: 0.2;
    display: flex;
    justify-content: center;
    align-items: center; */
  }
  .countDownBack_bottomBox_img {
    width: 11.25rem;
    height: 0.9rem;
  }
  .countDownBack_bottomBox_text {
    font-size: 0.55rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 0.75rem;
    /* letter-spacing: 1px; */
  }
  .countDownJumpBox_text {
    font-size: 0.65rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #f7b500;
    line-height: 0.925rem;
  }
  .countDownJumpBox_icon {
    margin-left: 0.2rem;
    width: 0.55rem;
    height: 0.55rem;
  }
  .countDownBack_bottomBox_contantBox {
    top: 0%;
    left: 0%;
    height: 100%;
    position: absolute;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>