<template>
  <div class="back">
    <div class="contantBack">
      <!-- <p @click="handleWalletConnect">链接钱包</p> -->
      <!-- <p @click="resetApp">resetApp</p> -->

      <div class="topBackBox">
        <img class="topImg" :src="topImgUrl" />
        <div class="topBackContant">
          <div class="contantDetailBox">
            <img class="contantDetailBox_img" :src="contantTopImgUrl" />
            <p class="contantDetailBox_title">{{ $t("home.topTitle") }}</p>
            <p class="contantDetailBox_des">
              {{ $t("home.topDes") }}
            </p>
            <!-- <countdown></countdown> -->
          </div>
        </div>
      </div>

      <div class="sectionBox1">
        <p class="sectionBox1_title">StarBlock DAO</p>
        <p class="sectionBox1_des">
          {{ $t("home.featureTopDes") }}
        </p>
        <div class="featureitem">
          <featureitem :goods="fouctionDataList"></featureitem>
        </div>
        <img class="sectionBox2_bottomImg" :src="bottomImgUrl" />
      </div>

      <div class="sectionBox1">
        <p class="sectionBox1_title">{{ $t("home.communityTopTitle") }}</p>
        <div class="featureitem">
          <communityitem :goods="communityList"></communityitem>
        </div>
        <!-- <img class="sectionBox2_bottomImg" :src="bottomImgUrl" /> -->
      </div>

      <div class="sectionBox1">
        <p class="sectionBox1_title">{{ "StarBlock Token ($STB)" }}</p>
        <div class="STBDesBox">
          <img class="STBDesBox_leftImg" :src="tokenDesImgUrl"
            v-bind:style="{ marginLeft: stakeFarmingBox_leftBoxMarginLeft }" />
          <div class="STBDesBox_rightBox" v-bind:style="{ marginRight: stakeFarmingBox_leftBoxMarginLeft }">
            <p class="STBDesBox_rightBox_p1">{{ $t("introduce.tokenDes") }}<a :href="tokenDetailLink"
                target="_blank"><span class="STBDesBox_rightBox_p1_active">{{
                    $t("home.lookMore")
                }}</span></a></p>
            <div class="STBDesBox_rightBox_btnBox">
              <a href="https://app.uniswap.org/#/swap?inputCurrency=ETH&outputCurrency=0xC481A850aEad5002598b7eD355cBB3349c148072&chain=mainnet"
                target="_blank">
                <div class="itemBtnBox">
                  <img class="itemBtnBox_img" src="@/assets/img/home/stbDesItemIcon1.png" />
                  <p class="itemBtnBox_text">STB on Uniswap</p>
                </div>
              </a>
              <a href="https://etherscan.io/token/0xc481a850aead5002598b7ed355cbb3349c148072" target="_blank">
                <div class="itemBtnBox">
                  <img class="itemBtnBox_img" src="@/assets/img/home/stbDesItemIcon2.png" />
                  <p class="itemBtnBox_text">$STB Address</p>
                </div>
              </a>
              <a href="https://github.com/StarBlockDAO" target="_blank">
                <div class="itemBtnBox">
                  <img class="itemBtnBox_img" src="@/assets/img/home/stbDesItemIcon3.png" />
                  <p class="itemBtnBox_text">GitHub</p>
                </div>
              </a>

            </div>
          </div>

        </div>
      </div>

      <div class="sectionBox2">
        <p class="sectionBox1_title">StarBlock DAO Tokenomics</p>
        <div class="contantImgBox">
          <img class="tokenomics_leftImg" src="@/assets/img/home/economics_left.png" />
          <img class="tokenomics_rightImg" src="@/assets/img/home/economics_right.png" />
        </div>
      </div>

      <bottom></bottom>
      <!-- <div class="sectionBox2"></div> -->
    </div>
  </div>
</template>

<script>
// import { CountDown } from "vant";
import Featureitem from "../home/children/FeatureItem.vue";
import Communityitem from '../home/children/CommunityItem.vue'
import Countdown from "../home/children/CountDown.vue";
import { onConnect, initWeb3Modal, resetApp } from "@/common/useWallet";
import { daoportAction, getBlockNumber, onBlockNumberChange } from "@/common/starblockdao";
import Bottom from "../home/children/Bottom.vue";
import Web3Modal from "web3modal";

export default {
  name: "Home",
  components: {
    Countdown,
    Featureitem,
    Bottom,
    Communityitem
  },
  computed: {
    tokenDesImgUrl() {
      return this.$t("introduce.tokenDesImgUrl")
    },
    tokenDetailLink() {
      return this.$t("introduce.tokenDetailLink")
    },
  },

  data() {
    var bottomImgUrl = "";
    if (this.$i18n.locale == "en") {
      bottomImgUrl = require("@/assets/img/home/frameImg_en.png");
    } else {
      bottomImgUrl = require("@/assets/img/home/frameImg.png");
    }

    var stakeFarmingBox_leftBoxMarginLeft = 0;
    if (
      document.documentElement.clientWidth >= 1000 &&
      document.documentElement.clientWidth < 1920
    ) {
      stakeFarmingBox_leftBoxMarginLeft = 90 + "px";

    } else if (document.documentElement.clientWidth >= 1920) {
      stakeFarmingBox_leftBoxMarginLeft = 137 + "px";
    } else {
      stakeFarmingBox_leftBoxMarginLeft = 0 + "px";
    }
    return {
      stakeFarmingBox_leftBoxMarginLeft: stakeFarmingBox_leftBoxMarginLeft,
      communityList: [
        {
          name: "home.communityItemTitle1",
          des: "home.communityItemDes1",
          coverImgUrl: require("@/assets/img/home/communityItem1.png"),
          linkUrl: "https://diilsclub.gitbook.io/diilsclub/nft-collect"
        },
        {
          name: "home.communityItemTitle2",
          des: "home.communityItemDes2",
          coverImgUrl: require("@/assets/img/home/communityItem2.png"),
          linkUrl: "https://diilsclub.gitbook.io/diilsclub/nft-collect"
        },
        {
          name: "home.communityItemTitle3",
          des: "home.communityItemDes3",
          coverImgUrl: require("@/assets/img/home/communityItem3.png"),
          linkUrl: "https://diilsclub.gitbook.io/diilsclub/nft-collect"
        },
      ],
      bottomImgUrl: bottomImgUrl,
      currentBlockNumber: 0,
      itemCountTextArr: ["8", "5", "5", "2", "3"],
      contantTopImgUrl:
        document.documentElement.clientWidth > 750
          ? require("@/assets/img/home/topLogo_text.png")
          : require("@/assets/img/home/mobile/topLogo_text.png"),
      topImgUrl:
        document.documentElement.clientWidth > 750
          ? require("@/assets/img/home/topBack.jpg")
          : require("@/assets/img/home/mobile/topBack.jpg"),
      fouctionDataList: [
        {
          name: "home.featureItemTitle1",
          des: "home.featureItemDes1",
          coverImgUrl: require("@/assets/img/home/featureImg1.png"),
          linkUrl: "https://diilsclub.gitbook.io/diilsclub/nft-collect"
        },
        {
          name: "home.featureItemTitle2",
          des: "home.featureItemDes2",
          coverImgUrl: require("@/assets/img/home/featureImg2.png"),
          linkUrl: "https://diilsclub.gitbook.io/diilsclub/nft-collect"
        },
        {
          name: "home.featureItemTitle3",
          des: "home.featureItemDes3",
          coverImgUrl: require("@/assets/img/home/featureImg3.png"),
          linkUrl: "https://diilsclub.gitbook.io/diilsclub/nft-collect"
        },
        {
          name: "home.featureItemTitle4",
          des: "home.featureItemDes4",
          coverImgUrl: require("@/assets/img/home/featureImg4.png"),
          linkUrl: "https://diilsclub.gitbook.io/diilsclub/nft-collect"
        }
      ],

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
    setTimeout(() => {
      this.$bus.$emit("updateTabIndex", 0);
    });
    // getBlockNumber(this.updateBlockData);
    // onBlockNumberChange(this.updateBlockData);
    // resetApp();
    // this.accountsChange();

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
    this.$bus.$on("changeDescripHeight", val => {
      if (val == "navBar.chinese") {
        this.bottomImgUrl = require("@/assets/img/home/frameImg.png");
      } else if (val == "navBar.English") {
        this.bottomImgUrl = require("@/assets/img/home/frameImg_en.png");
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
    updateBlockData(number) {
      this.currentBlockNumber = number;
      var countDownStr = String(14885190 - this.currentBlockNumber);
      this.itemCountTextArr = countDownStr.split("");
      // console.log("this.itemCountTextArr", this.itemCountTextArr);
    },
    resetApp() {
      // alert(resetApp);
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
  align-items: center;
  /* background-color: #ea4ae0; */
}

.contantBack {
  /* background-color: #ea4ae0; */
  align-items: center;
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  /* overflow-x: hidden; */
}

.topBackBox {
  position: relative;
}

.topImg {
  width: 100%;
  height: 17.7rem;
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
  justify-content: top;
}

.contantDetailBox {
  margin-left: 0rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.contantDetailBox_img {
  margin-top: 1rem;
  height: 0.9rem;
  width: 7.875rem;
}

.contantDetailBox_title {
  margin-top: 0.75rem;
  font-size: 0.75rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #111111;
  line-height: 1.275rem;
}

.contantDetailBox_des {
  margin-top: 0.5rem;
  font-size: 0.6rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #6d7278;
  line-height: 1.05rem;
  width: 90%;
  text-align: center;
  /* margin-right: 24.85rem; */
}

.sectionBox1 {
  margin-top: 0.75rem;
  width: 95%;
  /* height: 7.5rem; */
  background-color: white;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.sectionBox1_title {
  margin-top: 0.75rem;
  font-size: 0.95rem;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #fe9c02;
  line-height: 1.325rem;
}

.sectionBox1_des {
  margin-top: 0.5rem;
  width: 93%;
  text-align: center;
  font-size: 0.6rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 0.95rem;
}

.featureitem {
  width: 95%;
  margin-top: 0.75rem;
}

.contantImgBox {
  margin-top: 1.25rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: unset;
  align-items: center;
  margin-bottom: 0.75rem;
}

.tokenomics_leftImg {
  margin-left: 0rem;
  width: 90%;
  height: 8.85rem;
}

.tokenomics_rightImg {
  margin-top: 1rem;
  width: 90%;
  height: auto;
  /* height: 8.675rem; */
  margin-right: 0rem;
  /* margin-bottom: 0.75rem; */
}

.sectionBox2 {
  margin-top: 1.175rem;
  width: 95%;
  /* height: 7.5rem; */
  background-color: white;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
}

.sectionBox2_bottomImg {
  margin-top: 0.5rem;
  /* width: 90%; */
  height: 10.5rem;
  margin-bottom: 0.75rem;
}

.countDownTitle {
  margin-top: 0.75rem;
  font-size: 0.75rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #f7b500;
  line-height: 1.05rem;
  /* background: linear-gradient(238deg, #fd9733 0%, #f7b500 100%); */
  /* background: linear-gradient(238deg, #fd9733 0%, #f7b500 100%); */
  /* -webkit-text-fill-color: transparent; */
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

.STBDesBox {
  margin-top: .25rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.15rem;
}

.STBDesBox_leftImg {
  margin-left: 0rem;
  margin-top: 1.25rem;
  /* width: 9.65rem; */
  /* height: 8.875rem; */
  width: 75%;

}

.STBDesBox_rightBox {
  margin-top: 1.3rem;
  margin-left: 0rem;
  flex: unset;
  width: 90%;
  margin-right: 2.45rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.STBDesBox_rightBox_p1 {
  font-size: .7rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #666666;
  line-height: 1.15rem;
}

.STBDesBox_rightBox_p1_active {
  /* margin-left: .125rem; */
  font-size: .7rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #FE9C02;
  line-height: 1.15rem;
}

.STBDesBox_rightBox_btnBox {
  margin-top: .5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: -0.15rem;
}

.itemBtnBox {
  margin-top: .5rem;
  margin-right: 0rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #FFFFFF;
  border-radius: 4px;
  border: 1px solid #E5E5E5;
  width: 10rem;
  height: 2.5rem;
}

.itemBtnBox_img {
  width: 1rem;
}

.itemBtnBox_text {
  margin-left: .1rem;
  font-size: .75rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #212121;
  line-height: 1.05rem;
}

@media screen and (-webkit-min-device-pixel-ratio: 1) and (min-width: 1200px) {
  .back {
    display: flex;
    flex-direction: column;
    /* height: 100%; */
    width: 100%;
    background-color: #f7faff;
    align-items: center;
    /* background-color: #ea4ae0; */
  }

  .contantBack {
    /* background-color: #ea4ae0; */
    align-items: center;
    margin-top: 0rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    /* overflow-x: hidden; */
  }

  .topBackBox {
    position: relative;
  }

  .topImg {
    width: 100%;
    height: 26.5rem;
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
    justify-content: center;
  }

  .contantDetailBox {
    margin-left: 3rem;
    width: auto;
    display: flex;
    flex-direction: column;
    align-items: unset;
  }

  .contantDetailBox_img {
    margin-top: 0rem;
    height: 1.8rem;
    width: 15.8rem;
  }

  .contantDetailBox_title {
    margin-top: 0rem;
    font-size: 1.25rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #111111;
    line-height: 3.25rem;
  }

  .contantDetailBox_des {
    margin-top: -0.75rem;
    font-size: 0.5rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #6d7278;
    line-height: 1.35rem;
    width: 17.9rem;
    margin-right: 24.85rem;
    text-align: unset;
  }

  .sectionBox1 {
    margin-top: 2.5rem;
    width: 80%;
    /* height: 7.5rem; */
    background-color: white;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .sectionBox1_title {
    margin-top: 1.125rem;
    font-size: 0.75rem;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #fe9c02;
    line-height: 1.05rem;
  }

  .sectionBox1_des {
    margin-top: 0.5rem;
    width: 85%;
    text-align: center;
    font-size: 0.45rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: 0.7rem;
  }

  .featureitem {
    margin-top: 1.25rem;
  }

  .contantImgBox {
    margin-top: 1.25rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.25rem;
  }

  .tokenomics_leftImg {
    margin-left: 1.5rem;
    width: 16.9rem;
    height: 9.1rem;
  }

  .tokenomics_rightImg {
    margin-top: 0rem;
    width: 14.8rem;
    height: 8.675rem;
    margin-right: 1.5rem;
    margin-bottom: 0rem;
  }

  .sectionBox2 {
    margin-top: 2.5rem;
    width: 80%;
    /* height: 7.5rem; */
    background-color: white;
    border-radius: 0.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 2.5rem;
  }

  .sectionBox2_bottomImg {
    /* width: 90%; */
    height: 22.5rem;
    margin-bottom: 1.5rem;
  }

  .countDownTitle {
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

  .STBDesBox {
    margin-top: .25rem;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 1.15rem;
  }

  .STBDesBox_leftImg {
    margin-top: 0rem;
    margin-left: 3.425rem;
    /* width: 9.65rem; */
    /* height: 8.875rem; */
    width: 25%;

  }

  .STBDesBox_rightBox {
    margin-top: 0rem;
    margin-left: 2rem;
    flex: 1;
    margin-right: 2.45rem;
    display: flex;
    flex-direction: column;
    align-items: unset;
    justify-content: center;
  }

  .STBDesBox_rightBox_p1 {
    font-size: .5rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #666666;
    line-height: .875rem;
  }

  .STBDesBox_rightBox_p1_active {
    font-size: .45rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #FE9C02;
    line-height: .75rem;
  }

  .STBDesBox_rightBox_btnBox {
    margin-top: .75rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: -0rem;
  }

  .itemBtnBox {
    margin-top: 0rem;
    margin-right: .5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: #FFFFFF;
    border-radius: 4px;
    border: 1px solid #E5E5E5;
    width: 4.975rem;
    height: 1.25rem;
  }

  .itemBtnBox_img {
    width: .5rem;
  }

  .itemBtnBox_text {
    margin-left: .1rem;
    font-size: .375rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #212121;
    line-height: .525rem;
  }
}
</style>
