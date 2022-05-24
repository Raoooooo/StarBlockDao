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
      </div>

      <div class="sectionBox2">
        <p class="sectionBox1_title">StarBlock Tokenomics</p>
        <div class="contantImgBox">
          <img class="tokenomics_leftImg" src="@/assets/img/home/economics_left.png" />
          <img class="tokenomics_rightImg" src="@/assets/img/home/economics_right.png" />
        </div>
      </div>

      <!-- <div class="sectionBox2"></div> -->
    </div>
  </div>
</template>

<script>
import { CountDown } from "vant";
import Featureitem from "../home/children/FeatureItem.vue";
import { onConnect, initWeb3Modal, resetApp } from "@/common/useWallet";
import Web3Modal from "web3modal";

export default {
  name: "Home",
  components: {
    CountDown,
    Featureitem
  },

  data() {
    return {
      contantTopImgUrl:
        document.documentElement.clientWidth > 750
          ? require("@/assets/img/home/topLogo_text.png")
          : require("@/assets/img/home/mobile/topLogo_text.png"),
      topImgUrl:
        document.documentElement.clientWidth > 750
          ? require("@/assets/img/home/topBack.png")
          : require("@/assets/img/home/mobile/topBack.png"),
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
    // resetApp();
    // this.accountsChange();

    this.$nextTick(() => {
      // console.log("this.$route.path*******",this.$route.path);
      // this.setScrollToPostion();
    });
    this.ratio = this.detectZoom();

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
      this.ratio = this.detectZoom();

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
  margin-top: 3.5rem;
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
  height: 14rem;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.contantDetailBox_img {
  margin-top: 0.75rem;
  height: 0.9rem;
  width: 7.875rem;
}
.contantDetailBox_title {
  margin-top: 0.35rem;
  font-size: 0.75rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #111111;
  line-height: 1.275rem;
}

.contantDetailBox_des {
  font-size: 0.5rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #6d7278;
  line-height: 1.05rem;
  width: 90%;
  /* margin-right: 24.85rem; */
}
.sectionBox1 {
  margin-top: 1.175rem;
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
  width: 90%;
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

@media screen and (-webkit-min-device-pixel-ratio: 1) and (min-width: 1000px) {
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
    margin-top: 3.1rem;
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
    font-size: 0.5rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #6d7278;
    line-height: 1.35rem;
    width: 17.9rem;
    margin-right: 24.85rem;
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
    width: 17.85rem;
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
    width: 16.35rem;
    height: 8.85rem;
  }

  .tokenomics_rightImg {
    width: 13.725rem;
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
}
</style>
