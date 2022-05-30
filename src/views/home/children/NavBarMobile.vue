<template>
  <div class="con_nav">
    <div class="topBackImgBox">
      <div class="topBackView">
        <!-- <div></div> -->
        <img class="topLogo" src="@/assets/img/home/topLogo.png" />
        <img
          class="moreAction"
          src="@/assets/img/home/mobile/moreAction.svg"
          @click="moreOptionAction"
        />
      </div>
    </div>

    <div class="moreOptionView" v-show="moreOptionViewShow">
      <div class="moreOptionViewBack" @click="disMissmoreOptionView()"></div>
      <div class="moreOptionSubViewBox">
        <div class="closeView" @click="closeViewAction">
          <img class="closeImg" src="@/assets/img/home/mobile/optionViewClose.svg" />
        </div>
        <div class="moreOptionSubView" v-for="(item, index) in tabItems">
          <div
            :class="active === index ? 'optionItemActive' : 'optionItem'"
            @click="changeTab(index, item)"
          >
            <p
              :class="active === index ? 'optionItemTitle-active' : 'optionItemTitle'"
              v-if="index < tabItems.length - 1"
            >
              {{ $t(item.title) }}
            </p>
            <p
              :class="active === index ? 'optionItemTitle-active' : 'optionItemTitle'"
              v-if="index == tabItems.length - 1"
            >
              {{ $t(currentLangrage) }}
            </p>
            <!-- <a :href="item.path" target="_blank" v-if="index >= 6">
              <p :class="active === index ? 'optionItemTitle-active' : 'optionItemTitle'">
                {{ $t(item.title) }}
              </p>
            </a> -->
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="selectLangrageBox" v-show="isShowLangrageView">
      <div class="langrageItemBox" v-for="(langrageItem, index) in langrageItemArr">
        <p
          :class="langrageIndex === index ? 'langrageItemActive' : 'langrageItem'"
          @click="langrageItemClick(index)"
        >
          {{ langrageItem }}
        </p>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "NavBarMobile",
  data() {
    var langType = navigator.language;
    var currentLangrage = "navBar.English";
    if (langType == "en") {
      currentLangrage = "navBar.chinese";
    } else if (langType.startsWith("zh")) {
      currentLangrage = "navBar.English";
    } else {
      currentLangrage = "navBar.English";
    }
    return {
      moreOptionViewShow: false,
      currentLangrage: currentLangrage,
      isShowLangrageView: false,
      langrageItemArr: ["简体中文", "English"],
      isShowNavBackImg: true,
      active: 0,
      tabItems: [
        { title: "navBar.homepage", path: "" },

        { title: "navBar.section1", path: "" },
        { title: "navBar.github", path: "https://github.com/StarBlockDAO" },
        // { title: "navBar.section2", path: "" },
        // { title: "navBar.section3", path: "" },
        // { title: "navBar.section4", path: "" },
        // { title: "navBar.section5", path: "" },
        // { title: "navBar.discard", path: "http://discord.gg/starblocknft" },
        // { title: "navBar.twwiter", path: "https://twitter.com/PlayskullWorld" }
        { title: "", path: "" }
      ],
      // isShowTabBox: true
      isShowTabBox: document.documentElement.clientWidth > 750 ? true : false
    };
  },
  props: {},
  watch: {},

  created() {
    // onConnect(this.getAccount, isClickLogin);
  },

  mounted() {
    this.$bus.$on("updateTabIndex", val => {
      // if (val == 7) {
      //   return;
      // }
      this.active = val;
    });
  },
  methods: {
    logoImgClick() {
      this.$bus.$emit("changeTab", 0);
    },
    closeViewAction() {
      this.moreOptionViewShow = false;
    },
    disMissmoreOptionView() {
      this.moreOptionViewShow = false;
    },
    moreOptionAction() {
      this.moreOptionViewShow = true;
    },
    showSelectView() {},
    changeTab(index, item) {
      this.moreOptionViewShow = false;
      this.active = index;
      if (index == 0) {
        this.$router.push({ name: "home" });
      }
      if (index == 1) {
        this.$router.push({ name: "farms" });
      }
      if (item.title == "navBar.github") {
        window.open("https://github.com/StarBlockDAO", "_blank");
      }
      if (index == this.tabItems.length - 1) {
        if (this.$i18n.locale == "en") {
          this.$bus.$emit("changeDescripHeight", "navBar.chinese");
          this.$i18n.locale = "zh";
          this.currentLangrage = "navBar.English";
          localStorage.setItem("lang", "en");
        } else if (this.$i18n.locale == "zh") {
          this.$bus.$emit("changeDescripHeight", "navBar.English");
          this.$i18n.locale = "en";
          this.currentLangrage = "navBar.chinese";
          localStorage.setItem("lang", "zh");
        }
      }
    },
    langrageItemClick(index) {
      this.langrageIndex = index;
      this.isShowLangrageView = false;

      if (index == 0) {
        this.$i18n.locale = "zh";
        this.currentLangrage = "简体中文";
      } else if (index == 1) {
        this.$i18n.locale = "en";
        this.currentLangrage = "English";
      }
    },
    changeLangrageAction() {
      this.isShowLangrageView = true;
    }
  }
};
</script>

<style scoped>
.back {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-color: #f7faff;
  z-index: 100;
}

.topBackImgBox {
  position: relative;
  width: 100%;
  height: 1.25rem;
}

.navBackImgBox {
  width: 100%;
  position: fixed;
}

.con_nav {
  top: 0%;
  left: 0%;
  margin-top: -10px;
  width: 100%;
  display: flex;
  position: fixed;
  /* position: relative; */
  height: 1.25rem;
  z-index: 100;
  box-shadow: 0px 5px 12px 0px rgb(207 214 230 / 30%);

  /* margin-left: 2.65rem; */
  /* margin-right: 2.625rem; */
  /* background-color: blueviolet; */
}

.backGroudImg {
  width: 100%;
}

.navBackImg {
  width: 100%;
}

.topBackImg {
  margin-left: 0.3rem;
  /* margin-right: 0.75rem; */
  width: 8.625rem;
  top: 0%;
  height: 1.25rem;
  /* height: 100%; */
  /* height: 1.025rem; */
}

.topItemBox {
  left: 0%;
  top: 0%;
  margin-left: 0.75rem;
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  justify-content: space-around;

  /* background-color: coral; */
  /* height: 100%; */
}

.tabBox {
  margin-left: 0.45rem;
  /* margin-left: 2.9rem; */
}

.tabTitle {
  color: #fef9e4;
  font-size: 0.6rem;
  margin-left: -0.4rem;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;

  /* display: table-cell; */
}

.tabActiveTitle {
  /* margin-left: 1.375rem; */
  color: #502126;
  font-size: 0.6rem;
  margin-left: -0.4rem;
  background-color: #fef9e4;
  height: 1rem;
  /* width: 3rem; */
  border-radius: 0.75rem;
  text-align: center;
  vertical-align: middle;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
  overflow: hidden;
  /* display: table-cell; */
}

.changeLangrageBox {
  display: flex;
  width: 3rem;
  align-items: center;
  flex-direction: row;
}

.tabTitleChangeLangrage {
  color: #fef9e4;
  font-size: 0.6rem;
  margin-left: 0.5rem;
}

.btnBox {
  /* margin-top: 0.15rem; */
  margin-top: 0.075rem;
  flex: 1;
  height: 100%;
  margin-left: 0.5rem;
  /* background-color: cyan; */
  margin-right: 1.95rem;
  display: flex;
  align-items: center;
  /* flex-direction: row-reverse; */
}
.itemBtn {
  margin-left: 0.25rem;
  /* width: 0.625rem; */
  height: 0.625rem;
}

.logoImg {
  margin-right: 0.5rem;
  margin-top: 0.175rem;
  /* width: 1.92225rem; */
  height: 0.75rem;
  margin-left: 0.1rem;
}

.selectLangrageBox {
  position: fixed;
  margin-left: 43rem;
  margin-top: 2.65rem;
  width: 4.4rem;
  border-radius: 0.3rem;
  background-color: #fef9e4;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 2.5rem;
  z-index: 100;
  /* justify-content: space-around; */
}
.langrageItem {
  color: #8f4800;
  font-size: 0.6rem;
  margin-top: 0.2rem;
}

.langrageItemActive {
  color: #f2610c;
  font-size: 0.6rem;
  margin-top: 0.2rem;
}

.moreOptionView {
  /* transform: scale(1.1); */
  /* transition: all 1s linear; */
  width: 18.75rem;
  position: absolute;
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 0.25rem;
}

.moreOptionSubView {
  display: flex;
  flex-direction: column;
  width: 100%;
  /* background-color: white; */
  background-color: rgba(255, 255, 255, 1);
  /* opacity: 0.95; */
  /* background-color: rgba(59, 30, 1, 0.95); */
  z-index: 100;
}
.closeView {
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  /* background-color: white; */
  background-color: rgba(255, 255, 255, 1);
  z-index: 100;
  height: 2.25rem;
  align-items: center;
}

.closeImg {
  margin-right: 0.5rem;
  width: 0.75rem;
  height: 0.75rem;
}

.itemBtnBox {
  /* margin-top: -0.25rem; */
}
.optionItem {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 2.25rem;
}
.optionItemActive {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 2.25rem;
  background-color: #f7faff;
  /* background-color: #fe2ce7; */
  /* background-color: #f2610c; */
}
.optionItemTitle {
  font-size: 0.75rem;
  color: #111;
}
.optionItemTitle-active {
  font-size: 0.75rem;
  /* color: #fff; */
  color: #111;
}
.moreOptionViewBack {
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 0.25rem;
  /* background-color: thistle; */
  width: 18.75rem;
  height: 50rem;
  position: relative;
}

.moreOptionSubViewBox {
  position: absolute;
  left: 0%;
  top: 0%;
  width: 100%;
}
.topBackView {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 3.25rem;
  width: 100%;
  background-color: white;
  box-shadow: 0px 5px 12px 0px rgb(207 214 230 / 30%);
}
.topLogo {
  margin-left: 0.75rem;
  height: 1.5rem;
}
.moreAction {
  margin-right: 0.75rem;
  height: 0.85rem;
}
</style>