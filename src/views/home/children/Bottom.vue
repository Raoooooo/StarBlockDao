
<template>
  <div class="back">
    <div class="contantBack">
      <div class="topBox">
        <img class="logoImg" src="@/assets/img/home/topLogo.png" />
        <div class="itemImgBox">
          <a href="https://twitter.com/StarBlockNFT" target="_blank">
            <img v-for="(item, index) in itemBtns" :src="item" class="itemBtnImg" />
          </a>
          <a href="https://discord.gg/starblocknft" target="_blank">
            <img v-for="(item, index) in itemBtns1" :src="item" class="itemBtnImg" />
          </a>
          <a href="https://github.com/StarBlockDAO" target="_blank">
            <img v-for="(item, index) in itemBtns2" :src="item" class="itemBtnImg" />
          </a>
        </div>
      </div>

      <div class="sepLine"></div>

      <div class="bottomBox">
        <p class="botttomTitle">© 2022 StarBlock DAO</p>
        <div class="tabBox">
          <p
            @click="changeTab(index, tabTitle)"
            v-for="(tabTitle, index) in tabItems"
            :class="index === tabItems.length - 1 ? 'tabTitle' : 'tabTitle1'"
          >
            {{ $t(tabTitle) }}
          </p>
          <!-- <div class="vSepLine" v-if="index < tabItems.length - 1"></div> -->
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Bottom",
  watch: {
    windowWidth(val) {
      this.windowWidth = val;
      let that = this;
      if (that.windowWidth > 1200) {
        this.isShowBr = false;
      } else {
        this.isShowBr = true;
      }
    }
  },

  methods: {
    changeTab(index, item) {
      // if (index == 7) {
      //   this.$message.warning("Coming soon, stay tuned!");

      //   // window.open("https://www.baidu.com/", "_blank");
      //   return;
      // }

      this.active = index;
      if (index == 0) {
        this.$router.push({ name: "home" });
      }
      if (index == 1) {
        this.$router.push({ name: "farms" });
      }
      if (item == "navBar.github") {
        window.open("https://github.com/StarBlockDAO", "_blank");
      }

      if (item == "test") {
        this.$router.push({ name: "document" });
      }
    }
  },

  mounted() {
    var that = this;
    // <!--把window.onresize事件挂在到mounted函数上-->
    window.onresize = () => {
      return (() => {
        window.fullWidth = document.documentElement.clientWidth;
        that.windowWidth = window.fullWidth; // 宽
      })();
    };
  },
  data() {
    return {
      tabItems: [
        "navBar.homepage",
        "navBar.section1",
        "navBar.github"
        // "navBar.section2",
        // "navBar.section3",
        // "navBar.section4",
        // "navBar.section5",
        // "navBar.test"
      ],
      windowWidth: document.documentElement.clientWidth, //实时屏幕宽度
      isShowBr: document.documentElement.clientWidth <= 1200 ? true : false,
      itemBtns: [
        // require("@/assets/img/common/bottom_wx.svg"),
        // require("@/assets/img/common/bottom_tel.svg"),
        require("@/assets/img/common/bottom_twwiter.svg")
        // require("@/assets/img/common/bottom_dis.svg")
      ],
      itemBtns1: [
        // require("@/assets/img/common/bottom_wx.svg"),
        // require("@/assets/img/common/bottom_tel.svg"),
        // require("@/assets/img/common/bottom_twwiter.svg"),
        require("@/assets/img/common/bottom_dis.svg")
      ],
      itemBtns2: [
        // require("@/assets/img/common/bottom_wx.svg"),
        // require("@/assets/img/common/bottom_tel.svg"),
        // require("@/assets/img/common/bottom_twwiter.svg"),
        require("@/assets/img/common/bottom_github.svg")
      ],

      property: "value"
    };
  }
};
</script>


<style scoped>
.back {
  width: 100%;
  height: 8rem;

  /* background-color: aqua; */
}
.contantBack {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #242424;
  /* align-items: center; */
  /* height: 5.625rem; */
}

.topBox {
  margin-top: 0.5rem;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  align-items: center;
  width: 100%;
  height: 2rem;

  /* height: 1rem; */
  /* background-color: aqua; */
}

.logoImg {
  height: 1.5rem;
  /* margin-left: 5.25rem; */
}

.sepLine {
  margin-top: 1.7rem;
  height: 1px;
  background-color: #4f4f4f;
  margin-left: 1rem;
  margin-right: 1rem;
}

.botttomTitle {
  margin-top: 0.25rem;
  color: #ccc;
  font-size: 0.6rem;
  /* margin-left: 5.25rem; */
}

.bottomBox {
  margin-top: 0.35rem;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;
  /* justify-content: space-between; */
  align-items: center;
  /* width: 100%; */
  margin-left: 0rem;
  margin-right: 0rem;
  /* height: 0.4rem; */
}

.itemImgBox {
  margin-top: 0.4rem;
  /* margin-right: 5.25rem; */
  display: flex;
  flex-direction: row;
}
.companyDes {
  margin-top: 0.2rem;
  /* margin-right: 5.25rem; */
  display: flex;
  color: #f7b500;
  font-size: 0.6rem;
  text-align: center;
  line-height: 0.5rem;
}

.companyDesSepMark {
  /* margin-top: 0.2rem; */
  /* margin-right: 5.25rem; */
  display: flex;
  color: #ccc;
  font-size: 0.3rem;
  text-align: center;
  line-height: 0.5rem;
}

.itemBtnImg {
  width: 1.3rem;
  height: 1.3rem;
  margin-left: 0.35rem;
}

.tabBox {
  margin-top: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.tabTitle {
  cursor: pointer;
  margin-right: 0rem;
  font-size: 0.6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 0.55rem;
}

.tabTitle1 {
  cursor: pointer;
  margin-right: 1.25rem;
  font-size: 0.6rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 0.55rem;
}

.vSepLine {
  width: 1px;
  height: 0.5rem;
  background-color: white;
}
@media screen and (-webkit-min-device-pixel-ratio: 1) and (min-width: 1000px) {
  .back {
    width: 100%;
    height: 3.25rem;
  }
  .contantBack {
    position: relative;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: #242424;
    height: 3.25rem;
  }
  .topBox {
    margin-top: 0.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 1rem;
    /* background-color: aqua; */
  }

  .logoImg {
    height: 1rem;
    margin-left: 5.25rem;
  }

  .sepLine {
    margin-top: 0.5rem;
    height: 1px;
    background-color: #4f4f4f;
    margin-left: 5.25rem;
    margin-right: 5.25rem;
  }

  .botttomTitle {
    margin-top: 0rem;
    color: #ccc;
    font-size: 0.4rem;
    /* margin-left: 5.25rem; */
  }

  .bottomBox {
    margin-top: 0.35rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    /* width: 100%; */
    margin-left: 5.25rem;
    margin-right: 5.25rem;
    height: 0.4rem;
  }

  .itemImgBox {
    margin-top: 0rem;
    margin-right: 5.25rem;
    display: flex;
    flex-direction: row;
  }
  .companyDes {
    /* margin-right: 5.25rem; */
    display: flex;
    color: #f7b500;
    font-size: 0.4rem;
  }

  .companyDesSepMark {
    /* margin-top: 0.2rem; */
    /* margin-right: 5.25rem; */
    margin-left: 0.25rem;
    margin-right: 0.25rem;
    display: flex;
    /* color: #ccc; */
    font-size: 0.4rem;
  }

  .itemBtnImg {
    width: 0.75rem;
    height: 0.75rem;
    margin-left: 0.35rem;
  }

  .tabBox {
    margin-top: 0rem;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .tabTitle {
    cursor: pointer;
    margin-right: 0rem;
    font-size: 0.4rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 0.55rem;
  }

  .vSepLine {
    width: 0px;
    height: 0px;
    border-color: #afafb0;
  }

  .tabTitle1 {
    cursor: pointer;
    margin-right: 1.25rem;
    font-size: 0.4rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #ffffff;
    line-height: 0.55rem;
  }
}
</style>
