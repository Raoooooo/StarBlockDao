<template>
  <div class="contant" :class="{ contantSroll: items.length > 7 }">
    <div class="itemBox" v-for="(item, index) in items">
      <div class="sepLine" v-show="index != 0"></div>
      <div class="itemContantBox">
        <div class="nftNameBox">
          <p class="nftName">{{ item.collection.showName + "#" + item.tokenId }}</p>
        </div>

        <div class="linkIconBox">
          <!-- <img class="linkIcon" src="@/assets/img/farms/linkIcon1.png" /> -->
          <a
            :href="linkOfType(item, 1)"
            target="_blank"
            class="linkIconUrl"
            v-show="item.poolInfo.pid <= 2"
          >
            <img class="linkIcon" src="@/assets/img/farms/linkIcon2.png" />
          </a>
          <a :href="linkOfType(item, 2)" target="_blank" v-show="!isWNFT" class="linkIconUrl">
            <img class="linkIcon1" src="@/assets/img/farms/linkIcon3.png" />
          </a>
          <a :href="linkOfType(item, 3)" target="_blank" v-show="isWNFT" class="linkIconUrl">
            <img class="linkIcon1" src="@/assets/img/farms/linkIcon4.png" />
          </a>
        </div>
        <div class="selectIconBox">
          <img :src="selectIconUrl(item)" class="selectIcon" @click="selectAction(item)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getEtherscanOfCollection,
  getEtherscanOfNFT,
  getOpenSeaOfCollection,
  getOpenSeaOfNFT
} from "@/common/starblockdao";
export default {
  name: "Selectnft",
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
      isWNFT: false,
      // selectIconUrl: require("@/assets/img/farms/nft_select_y.svg"),
      windowWidth: document.documentElement.clientWidth, //实时屏幕宽度
      rowNum: rowNum,
      gutterSpace: document.documentElement.clientWidth > 600 ? 27 : 10,
      isSave: false,
      day: "",
      hour: "",
      minute: "",
      second: "",
      stopCountDown: false,
      isStartCountDown: false,
      isShowCountDown: false,
      isShowEndSell: false,
      serviceRate: 0,
      isRequestServiceRate: false
    };
  },
  created() {
    // alert(document.documentElement.clientWidth);
    // if (this.serviceRate == 0) {
    // this.requestServiceRate();
    // }
  },
  computed: {
    // selectIconUrl() {
    //   return this.item.select
    //     ? require("@/assets/img/farms/nft_select_y.svg")
    //     : require("@/assets/img/farms/nft_select_n.png");
    // }
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
  watch: {
    windowWidth(val) {
      // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
      // if (!this.timer) {
      // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
      this.windowWidth = val;
      this.timer = true;
      let that = this;
      // setTimeout(function () {
      // 打印screenWidth变化的值
      // console.log("实时屏幕宽度：", val, that.screenWidth);
      // that.rowNum = that.windowWidth > 600 ? 6 : 24;

      var rowNum = 0;
      if (that.windowWidth <= 700) {
        rowNum = 24;
      }
      // else if (that.windowWidth > 700 && that.windowWidth < 1440) {
      //   rowNum = 12;
      // } else if (that.windowWidth >= 1440 && that.windowWidth < 1920) {
      //   rowNum = 8;
      // }
      else {
        rowNum = 6;
      }
      that.rowNum = rowNum;
      that.gutterSpace = that.windowWidth > 600 ? 27 : 6;

      // var html = document.documentElement; //获取到html元素
      // var hWidth = html.getBoundingClientRect().width; //获取到html的宽度
      // if (hWidth < 1000) {
      //   //   hWidth = 1000;
      //   //   html.style.fontSize = hWidth / 7.5 + "px";
      //   // html.style.fontSize = hWidth / 75 + "px";
      //   html.style.fontSize = 40 + "px";
      // }
      // if (hWidth >= 1000) {
      //   //   hWidth = 2000;
      //   //   html.style.fontSize = hWidth / 15 + "px";
      //   html.style.fontSize = 40 + "px";
      // }
    }
  },

  mounted() {
    this.$bus.$on("switchBtnAction", val => {
      if (val) {
        this.isWNFT = false;
      } else {
        this.isWNFT = true;
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
    linkOfType(item, type) {
      // ethersacan
      if (type == 1) {
        return getOpenSeaOfNFT(item.collection.contractAddress, item.tokenId);
      }
      // nft
      else if (type == 2) {
        return getEtherscanOfNFT(item.collection.contractAddress, item.tokenId);
      }
      // wnft
      else if (type == 3) {
        return getEtherscanOfNFT(item.collection.contractAddress, item.tokenId);
      }
    },
    selectIconUrl(item) {
      return item.select
        ? require("@/assets/img/farms/nft_select_y.svg")
        : require("@/assets/img/farms/nft_select_n.svg");
    },
    selectAction(item) {
      item.select = !item.select;
      this.$bus.$emit("selectNftAction", "1");
      // this.selectIconUrl = item.select
      //   ? require("@/assets/img/farms/nft_select_y.svg")
      //   : require("@/assets/img/farms/nft_select_n.png");
    },
    pledgeBtnAction(item) {
      this.$bus.$emit("alertAction", item);
    },
    imgLoad() {
      // 发射事件总线
      this.$bus.$emit("imgLoad");
    },
    // 跳转到详情页
    goodItemClick(item) {
      this.$emit("itemClick", item);
      var id = "";
      if (item.uuid) {
        id = item.uuid;
      }
      if (item.upChain) {
        if (item.contractAddress) {
          id = item.contractAddress;
        }
      }

      // textNetwork_Name();
      this.$router.push({ name: "collection", params: { id: id } });
    }
  }
};
</script>

<style scoped>
.contant {
  /* border-radius: .25rem; */
  /* border-style: solid; */
  /* border-color: #ECECEC; */
  min-height: 6.5rem;
  width: 100%;
  max-height: 10.5rem;
  overflow-x: hidden;
  /* overflow-y: scroll; */
  /* border-width: .025rem; */
}

.contantSroll {
  width: 100%;
  max-height: 10.5rem;
  overflow-x: hidden;
}

.itemBox {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 1.75rem;
}
.itemContantBox {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  /* background-color: aqua; */
}
.sepLine {
  margin-left: 0.525rem;
  margin-right: 0.525rem;
  background-color: #f1f1f1;
  height: 0.025rem;
}
.itemContantBox {
  width: 100%;
  /* background-color: aqua; */
}
.nftNameBox {
  width: 33%;
}
.nftName {
  margin-left: 0.525rem;
  font-size: 0.55rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #111111;
  line-height: 0.55rem;
}
.selectIconBox {
  display: flex;
  flex-direction: row-reverse;
  width: 33%;
}
.selectIcon {
  cursor: pointer;
  margin-right: 0.675rem;
  width: 0.85rem;
  height: 0.85rem;
}

.linkIconBox {
  width: 33%;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.linkIconUrl {
  margin-top: 0.25rem;
}
.linkIcon {
  width: 1rem;
  height: 1rem;
}

.linkIcon1 {
  margin-left: 0.25rem;
  width: 1rem;
  height: 1rem;
}

@media screen and (-webkit-min-device-pixel-ratio: 1) and (min-width: 1000px) {
  .contant {
    /* border-radius: .25rem; */
    /* border-style: solid; */
    /* border-color: #ECECEC; */
    width: 100%;
    max-height: 10.5rem;
    overflow-x: hidden;
    /* overflow-y: scroll; */
    /* border-width: .025rem; */
  }

  .contantSroll {
    width: 100%;
    max-height: 10.5rem;
    overflow-x: hidden;
  }

  .itemBox {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 1.5rem;
  }
  .itemContantBox {
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    /* background-color: aqua; */
  }
  .sepLine {
    margin-left: 0.525rem;
    margin-right: 0.525rem;
    background-color: #f1f1f1;
    height: 0.025rem;
  }
  .itemContantBox {
    width: 100%;
    /* background-color: aqua; */
  }
  .nftNameBox {
    width: 33%;
  }
  .nftName {
    margin-left: 0.525rem;
    font-size: 0.4rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #111111;
    line-height: 0.4rem;
  }
  .selectIconBox {
    display: flex;
    flex-direction: row-reverse;
    width: 33%;
  }

  .selectIcon {
    cursor: pointer;
    margin-right: 0.675rem;
    width: 0.5rem;
    height: 0.5rem;
  }

  .linkIconBox {
    width: 33%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .linkIcon {
    width: 0.5rem;
    height: 0.5rem;
  }

  .linkIcon1 {
    margin-left: 0.25rem;
    width: 0.5rem;
    height: 0.5rem;
  }
}
</style>