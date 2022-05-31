<template>
  <div class="contantView">
    <div class="con_nav">
      <div class="topItemBox">
        <img class="logoImg" v-lazy="logoImgUrl()" @click="logoImgClick()" />
        <div class="tabBox" v-show="isShowTabBox">
          <p
            @click="changeTab(index, tabTitle)"
            v-for="(tabTitle, index) in tabItems"
            :class="active === index ? 'tabActiveTitle' : 'tabTitle'"
          >
            {{ $t(tabTitle) }}
          </p>

          <button class="loginBtn" @click="loginBtnAction" v-show="!isLogin">登录</button>
          <div class="accountBox" v-show="isLogin">
            <img class="account_img" src="@/assets/img/farms/accountIcon.png" />
            <p class="account_text">{{ account }}</p>
          </div>

          <div class="dropdownBox">
            <dropdown class="dropdownStyle" trigger="click" @on-click="changeLangeDropdownClick">
              <button class="changeLangeBtn">{{ $t(currentLangrage) }}</button>
              <dropdown-menu slot="list" class="menuWidth" v-for="(item, index) in langrageList">
                <dropdown-item class="menuItem" :name="item">{{ $t(item) }}</dropdown-item>
              </dropdown-menu>
            </dropdown>
          </div>
        </div>
      </div>
    </div>

    <el-dialog
      title=""
      :visible.sync="chainIdErrorDialog"
      :width="elDialogWidth"
      :show-close="false"
      center
      :top="elDialogTopMargin"
      :close-on-click-modal="false"
      :fullscreen="false"
      :lock-scroll="false"
      :append-to-body="true"
      :close-on-press-escape="false"
    >
      <div class="dialogBack">
        <img class="dialogTopImg" :src="getDailogTopImgFaildUrl" />
        <p class="dialopTitle1">
          {{ chainErrorTitle() }}
        </p>
        <p class="dialogDes">
          {{ chainErrorDes() }}
        </p>
        <button
          class="dialogBottomBtn"
          @click="chainIdErrorDialogCloseAction"
          v-show="isShowCloseChainErrorBtn"
        >
          {{ $t("common.iKnow") }}
        </button>
      </div>
    </el-dialog>

    <el-dialog
      title=""
      :visible.sync="loginErrorDialogStatus"
      :width="elDialogWidth"
      :show-close="false"
      center
      :top="elDialogTopMargin"
      :close-on-click-modal="false"
      :fullscreen="false"
      :lock-scroll="false"
      :append-to-body="true"
      :close-on-press-escape="false"
    >
      <div class="dialogBack">
        <img class="dialogTopImg" :src="getDailogTopImgFaildUrl" />
        <p class="dialopTitle1">{{ $t("common.loginError") }}</p>
        <button
          class="dialogBottomBtn"
          @click="loginErrorDialogCloseAction"
          v-show="isShowCloseLoginErrorBtn"
        >
          {{ $t("common.iKnow") }}
        </button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { onConnect, initWeb3Modal, resetApp, onBlockOut } from "@/common/useWallet";
import { getLocalStorage, setLocalStorage, isLogin, localAccount } from "@/common/utils";
import { web3ProviderUrl, getProdcutMode, getSurpportChainId } from "@/common/starBlockConfig";

export default {
  name: "NavBar",
  components: {},
  computed: {
    getDailogTopImgFaildUrl: function () {
      return require("@/assets/img/common/alertWaring.svg");
    }
  },
  data() {
    var langType = navigator.language;
    var currentLangrage = "navBar.English";
    if (langType == "en") {
      currentLangrage = "navBar.English";
    } else if (langType.startsWith("zh")) {
      currentLangrage = "navBar.chinese";
    } else {
      currentLangrage = "navBar.English";
    }
    return {
      elDialogTopMargin: document.documentElement.clientWidth > 1200 ? "300px" : "150px",
      loginErrorDialog: false,
      isShowCloseLoginErrorBtn: true,
      isShowCloseChainErrorBtn: true,
      elDialogWidth: document.documentElement.clientWidth > 1200 ? "360px" : "340px",
      chainIdErrorDialog: false,

      langrageList: ["navBar.English", "navBar.chinese"],
      isLogin: false,
      account: "",
      currentLangrage: currentLangrage,
      isShowLangrageView: false,
      langrageItemArr: ["简体中文", "English"],
      isShowNavBackImg: true,
      active: 0,

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
      isShowTabBox: true,
      isShowMobile: document.documentElement.clientWidth > 750 ? false : true
    };
  },
  props: {},
  watch: {},

  created() {
    setLocalStorage("isFirstLoad", true);
    // onBlockOut();
    var isClickLogin = false;
    onConnect(this.getAccount, isClickLogin);
    this.accountsChange();
    // this.$router.push({ path: "/" });
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
    chainErrorTitle() {
      return getSurpportChainId() == 4
        ? this.$t("common.checkChainId4")
        : this.$t("common.checkChainId1");
    },
    chainErrorDes() {
      return getSurpportChainId() == 4
        ? this.$t("common.checkChainId4Des")
        : this.$t("common.checkChainId1Des");
    },
    changeLangeDropdownClick(value) {
      this.$bus.$emit("changeDescripHeight", value);
      if (value == "navBar.chinese") {
        this.$i18n.locale = "zh";
        this.currentLangrage = "navBar.chinese";
        localStorage.setItem("lang", "zh");
      } else if (value == "navBar.English") {
        this.$i18n.locale = "en";
        this.currentLangrage = "navBar.English";
        localStorage.setItem("lang", "en");
      }
    },

    loginErrorDialogCloseAction() {
      this.loginErrorDialog = false;
    },
    chainIdErrorDialogCloseAction() {
      this.chainIdErrorDialog = false;
    },
    loginBtnAction() {
      var isClickLogin = true;
      onConnect(this.getAccount, isClickLogin);
    },

    async accountsChange() {
      const provider = await initWeb3Modal().connect();
      var that = this;
      provider.on("accountsChanged", function (accounts) {
        that.setLoginData(accounts[0]);
      });
    },
    getAccount(account, isClickLogin) {
      console.log(account);
      if (isClickLogin) {
        this.setLoginData(account);
      } else {
        if (localAccount() && localAccount() != account) {
          setLocalStorage("isLogin", "0");
          this.isLogin = false;
        } else {
          this.setLoginData(account);
        }
      }
    },

    setLoginData(account) {
      setLocalStorage("account", account);
      this.account = this.getFrommatAccount(account);
      this.isLogin = true;
      setLocalStorage("isLogin", "1");
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
    logoImgClick() {
      this.$bus.$emit("changeTab", 0);
    },
    logoImgUrl() {
      return require("@/assets/img/home/topLogo.png");
    },
    changeTab(index, item) {
      // if (index == 7) {
      //   this.$message.warning("Coming soon, stay tuned!");

      //   // window.open("https://www.baidu.com/", "_blank");
      //   return;
      // }
      if (item == "navBar.github") {
        window.open("https://github.com/StarBlockDAO", "_blank");
        return;
      }
      this.active = index;
      if (index == 0) {
        this.$router.push({ name: "home" });
      }
      if (index == 1) {
        this.$router.push({ name: "farms" });
      }

      if (item == "test") {
        this.$router.push({ name: "document" });
      }
    },
    langrageItemClick(index) {
      // this.langrageIndex = index;
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
  background-color: white;
  /* background-color: #f7faff; */
  z-index: 100;
}

.topBackImg {
  top: 0%;
  left: 0.75rem;
  width: 7.5rem;
  height: 100%;
}

.topItemBox {
  margin-top: 0rem;
  width: 100%;
  margin-left: 1rem;
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 2.25rem;
  /* justify-content: space-around; */
  /* height: 100%; */
}

/* .btnBox {
  flex: 1;
  /* margin-left: 0.75rem; */
/* margin-left: 5rem; */
/* background-color: cyan; */
/* nav-right: 78px; */
/* display: flex; */
/* flex-direction: row-reverse; */
/* } */
.itemBtn {
  margin-top: 0.375rem;
  margin-left: 0.25rem;
  width: 1rem;
  height: 1rem;
}

.con_nav {
  top: 0%;
  left: 0%;
  margin-top: -5px;
  width: 100%;
  display: flex;
  position: fixed;
  /* position: relative; */
  height: 2.25rem;
  z-index: 100;
  border-color: #3c3e4f;
  border-width: 0.025rem;
  background-color: white;
  box-shadow: 0px 5px 12px 0px rgb(207 214 230 / 30%);
  /* margin-left: 2.65rem; */
  /* margin-right: 2.625rem; */
  /* background-color: blueviolet; */
}

.topBackImg {
  margin-left: 2.65rem;
  width: 43.3rem;
  top: 0%;
  height: 100%;
  /* background-color: #c7fdff; */
}

.topItemBox {
  margin-left: 0rem;
  position: fixed;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 2.25rem;
  /* justify-content: space-around; */
}

.tabBox {
  margin-left: 15.5rem;
  margin-right: 2.65rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  justify-content: space-between;
  /* margin-left: 20rem; */
  /* margin-left: 0.55rem; */
}

.tabTitle {
  /* text-shadow: 0 0 3px #fff, 0 0 3px #fff; */
  color: #111;
  font-size: 0.55rem;
  /* margin-left: 0.4rem; */
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
  cursor: pointer;

  /* display: table-cell; */
}

.tabActiveTitle {
  cursor: pointer;
  color: #f7b500;
  font-size: 0.55rem;
  text-align: center;
  vertical-align: middle;
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  overflow: hidden;
}

.logoImg {
  margin-right: 0.5rem;
  margin-top: 0.6rem;
  /* width: 5.708rem; */
  width: 7.2rem;
  /* height: 1.3rem; */
  margin-bottom: 0.65rem;
  margin-left: 2.5rem;
  cursor: pointer;
}

.selectLangrageBox {
  position: fixed;
  margin-left: 35.5rem;
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
.topBackImgView {
  height: 2.25rem;
  width: 100%;
  background-color: white;
}
.contantView {
  z-index: 100;
  position: fixed;
  left: 0;
  height: 2.25rem;
  width: 100%;
  background-color: #f7faff;
}

.loginBtn {
  cursor: pointer;
  width: 4.75rem;
  height: 1.25rem;
  border-radius: 0.625rem;
  background-color: #f7b500;
  border-style: none;
  font-size: 0.45rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 0.625rem;
}
.accountBox {
  width: 4.75rem;
  height: 1.25rem;
  display: flex;
  border-radius: 0.625rem;
  background-color: #f7b500;
  flex-direction: row;
  align-items: center;
}

.account_img {
  margin-left: 0.25rem;
  width: 1rem;
  height: 1rem;
}

.account_text {
  margin-left: 0.25rem;
  font-size: 0.45rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 0.625rem;
}

.dropdownBox {
  width: 4rem;
  /* background-color: #f7b500; */
  margin-top: -0.51rem;
  /* margin-top: 18px; */
  /* align-items: center; */
  /* flex: 1; */
  display: flex;
  flex-direction: row-reverse;
  z-index: 100;

  /* background-color: #f7b500; */
  /* height: 1.5rem; */
  /* align-items: center;s */
  /* width: 100%; */
  /* background-color: aqua; */
}

.changeLangeBtn {
  height: 1.25rem;
  width: 3.5rem;
  font-size: 0.45rem;
  color: #f7b500;
  border-color: #f7b500;
  border-style: solid;
  border-width: 1px;
  border-color: #f7b500;
  border-style: solid;
  background-color: white;
  border-radius: 0.625rem;
  cursor: pointer;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  /* margin-right: 2.5rem; */
}

.dialogBack {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-color: #f7b500; */
  width: 100%;
  border-radius: 0.5rem;
}

.dialopTitle1 {
  font-size: 0.4rem;
  font-weight: 500;
  color: #111;
  margin-top: -0.85rem;
}

.dialogDes {
  font-size: 0.325rem;
  margin-top: 0.25rem;
  align-content: center;
  text-align: center;
}

.dialogTopImg {
  margin-top: -1rem;
  width: 1.25rem;
  height: 1.25rem;
  margin-bottom: 1rem;
}

.dialogBottomBtn {
  margin-top: 0.35rem;
  margin-bottom: -0.25rem;
  width: 6.5rem;
  height: 1rem;
  border-radius: 0.5rem;
  border-style: none;
  background-color: #f7b500;
  color: white;
  font-size: 0.4rem;
}
</style>