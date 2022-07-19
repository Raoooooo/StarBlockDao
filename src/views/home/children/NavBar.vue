<template>
  <div class="contantView">
    <div class="con_nav">
      <div class="topItemBox">
        <img class="logoImg" v-lazy="logoImgUrl()" @click="logoImgClick()" />
        <div class="tabBox" v-show="isShowTabBox">
          <p @click="changeTab(index, tabTitle)" v-for="(tabTitle, index) in tabItems"
            :class="active === index ? 'tabActiveTitle' : 'tabTitle'">
            {{ $t(tabTitle) }}
          </p>

          <button class="loginBtn" @click="loginBtnAction" v-show="!isLogin">
            {{ $t("navBar.login") }}
          </button>
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

          <div class="messageDropdownBox">

            <el-dropdown trigger="click" class="el-dropdown" @command="messageDropdownClick"
              @visible-change="dropdownHiddenClick">
              <div class="messageBox">
                <img class="messageBox_icon" src="@/assets/img/common/message_icon.svg" />

                <p class="messageBox_text">{{ $store.getters.messageList.length > 0 ? "交易确认中" : "暂无交易信息" }}</p>
                <img class="messageBox_rightIcon" v-if="$store.getters.messageList.length > 0"
                  :src="drow_upDownImgUrl" />
              </div>
              <el-dropdown-menu slot="dropdown" class="menuWidth">
                <el-dropdown-item class="el-dropdown-item" :command="item"
                  v-for="(item, index) in $store.getters.messageList">
                  <div class="el-dropdown-itemBox">
                    <div class="el-dropdown-itemBox_sub">
                      <p class="el-dropdown-itemBox_hash">{{ getFrommatAccount(item.txHash) }}</p>
                      <img class="el-dropdown-itemBox_copy" src="@/assets/img/common/copy.svg"
                        @click.stop="copyTxHashAction(item.txHash)" />

                      <p class="el-dropdown-itemBox_time">{{ "1m ago" }}</p>

                      <div class="el-dropdown-itemBox_optionBox">
                        <p class="el-dropdown-itemBox_option">{{ item.optionName }}</p>
                      </div>

                    </div>
                    <div class="el-dropdown-itemBox_sepLine"></div>
                  </div>

                </el-dropdown-item>

              </el-dropdown-menu>
            </el-dropdown>
          </div>

        </div>
      </div>
    </div>

    <el-dialog title="" :visible.sync="chainIdErrorDialog" :width="elDialogWidth" :show-close="false" center
      :top="elDialogTopMargin" :close-on-click-modal="false" :fullscreen="false" :lock-scroll="false"
      :append-to-body="true" :close-on-press-escape="false" :destroy-on-close="true">
      <div class="dialogBack">
        <img class="dialogTopImg" :src="getDailogTopImgFaildUrl" />
        <p class="dialopTitle1">
          {{ chainErrorTitle() }}
        </p>
        <p class="dialogDes">
          {{ chainErrorDes() }}
        </p>
        <button class="dialogBottomBtn" @click="chainIdErrorDialogCloseAction" v-show="isShowCloseChainErrorBtn">
          {{ $t("common.iKnow") }}
        </button>
      </div>
    </el-dialog>

    <!-- <el-dialog
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
    </el-dialog> -->
  </div>
</template>

<script>
import { onConnect, initWeb3Modal, resetApp, onBlockOut } from "@/common/useWallet";
import { getLocalStorage, setLocalStorage, isLogin, localAccount } from "@/common/utils";
import { web3ProviderUrl, getProdcutMode, getSurpportChainId } from "@/common/starBlockConfig";
import { setNetwork_Name, getCurrentChainId, getAccount } from "@/common/starblockdao";
// import '@metamask/legacy-web3'

var utils = require("web3-utils");

export default {
  name: "NavBar",
  components: {},
  computed: {
    loginErrorDialogStatus() {
      if (!this.chainIdErrorDialog) {
        return this.loginErrorDialog;
      } else {
        return false;
      }
    },
    getDailogTopImgFaildUrl: function () {
      return require("@/assets/img/common/alertWaring.svg");
    }
  },
  data() {
    var langType = navigator.language;
    var currentLangrage = "navBar.English";
    // if (langType == "en") {
    //   currentLangrage = "navBar.English";
    // } else if (langType.startsWith("zh")) {
    //   currentLangrage = "navBar.chinese";
    // } else {
    //   currentLangrage = "navBar.English";
    // }
    return {
      drow_upDownImgUrl: require("@/assets/img/common/drow_down.svg"),
      elDialogTopMargin: document.documentElement.clientWidth > 1200 ? "300px" : "150px",
      loginErrorDialog: false,
      isShowCloseLoginErrorBtn: true,
      isShowCloseChainErrorBtn: true,
      elDialogWidth: document.documentElement.clientWidth > 1200 ? "360px" : "340px",
      chainIdErrorDialog: false,
      currentChainId: 0,

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
        "navBar.starBlock",
        "navBar.document",
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
    // const { ethereum } = window;

    // alert(ethereum._metamask.isConnected());
    // if (typeof window.ethereum !== 'undefined') {
    //   console.log('MetaMask is installed!');
    //   alert(ethereum.selectedAddress);
    // }

    // alert(ethereum.isMetaMask);
    // var isUnlocked = true;
    // ethereum._metamask.isUnlocked().then(res => {
    //   isUnlocked = res;
    //   console.log("ethereum._metamask.isUnlocked()", res);
    //   if (!isUnlocked) {
    //     this.$message.error(this.$t("common.metaMaskCheck"));
    //     return;
    //   }
    // });

    // getAccount(this.getAccount, this.getAccountError)
    // const { web3 } = window;
    // var from = web3.eth.defaultAccount;
    // alert(from);
    // alert(ethereum.isConnected())

    setLocalStorage("isFirstLoad", true);
    this.accountsChange();
    if (window.ethereum) {
      getCurrentChainId(this.handleCurentChainid);
    }
    this.chainidChange();
    this.walletConnect();
    setTimeout(() => {
      if (!window.ethereum) {
        return;
      }
      if (ethereum.selectedAddress) {
        getAccount(this.getAccount, this.getAccountError)
        this.isLogin = true;
        this.account = ethereum.selectedAddress;
        setLocalStorage("ethereumSelectedAddress", ethereum.selectedAddress);
      } else {
        this.isLogin = false;
        setLocalStorage("ethereumSelectedAddress", null);
      }
    }, 1000);
  },

  mounted() {
    this.$bus.$on("messageChange", val => {
      this.messageList = val;
    });

    this.$bus.$on("updateTabIndex", val => {
      // if (val == 7) {
      //   return;
      // }
      this.active = val;
    });

    this.$bus.$on("chainIdUpdate", val => {
      if (val) {
        // this.setChaindUpdateCheck(val);
      }
    });
    this.$bus.$on("checkChainIdError", val => {
      if (val) {
        this.setChaindUpdateCheckShowClose(val);
      }
    });
    this.$bus.$on("loginErrorAlertNotClose", val => {
      if (val) {
        this.isShowCloseLoginErrorBtn = false;
        if (this.isShowAlertCloseBtn()) {
          this.loginErrorDialog = false;
        } else {
          this.loginErrorDialog = isLogin() == "1" ? false : true;
          // this.loginErrorDialog = true;
        }
      }
    });

    this.$bus.$on("loginErrorAlert", val => {
      if (val) {
        if (this.isShowAlertCloseBtn()) {
          this.isShowCloseLoginErrorBtn = true;
        } else {
          this.isShowCloseLoginErrorBtn = false;
        }
        this.loginErrorDialog = isLogin() == "1" ? false : true;
      }
    });
  },
  methods: {
    copyTxHashAction(txHash) {
      // alert(txHash);
      var that = this;
      var clipBoardContent = txHash;
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
    dropdownHiddenClick(value) {
      this.drow_upDownImgUrl = value == true ? require("@/assets/img/common/drow_up.svg") : require("@/assets/img/common/drow_down.svg");
    },
    getAccountError() {
      setLocalStorage("isLogin", "");
      this.account = "";
    },
    handleCurentChainid(chainId) {
      this.currentChainId = chainId;
      setLocalStorage("chaiIdNum", chainId);
      this.$bus.$emit("chainIdUpdate", chainId);
      setNetwork_Name(chainId);
      // this.setChaindUpdateCheck(chainId);
    },
    setChaindUpdateCheckShowClose(chainId) {
      chainId = this.currentChainId;
      if (!window.ethereum) {
        this.chainIdErrorDialog = false;
        return;
      }
      if (getProdcutMode() == 1) {
        if (getProdcutMode() == 1 && chainId != 1) {
          this.isShowCloseChainErrorBtn = true;
          this.chainIdErrorDialog = true;
        }
      }
      if (getProdcutMode() == 0) {
        if (getProdcutMode() == 0 && chainId != 4) {
          this.isShowCloseChainErrorBtn = true;
          this.chainIdErrorDialog = true;
        }
      }
    },

    setChaindUpdateCheck(chainId) {
      chainId = this.currentChainId;

      if (!window.ethereum) {
        this.chainIdErrorDialog = false;
        return;
      }
      if (!window.ethereum.selectedAddress) {
        this.chainIdErrorDialog = false;
        return;
      }
      if (getProdcutMode() == 1) {
        if (getProdcutMode() == 1 && chainId != 1) {
          // if (this.isShowAlertCloseBtn()) {
          //   this.chainIdErrorDialog = false;
          // } else {
          this.isShowCloseChainErrorBtn = true;
          this.chainIdErrorDialog = true;
          // }
        } else {
          this.chainIdErrorDialog = false;
        }
      }

      if (getProdcutMode() == 0) {
        if (getProdcutMode() == 0 && chainId != 4) {
          // if (this.isShowAlertCloseBtn()) {
          //   this.chainIdErrorDialog = false;
          // } else {
          this.isShowCloseChainErrorBtn = true;
          this.chainIdErrorDialog = true;
          // }
        } else {
          this.chainIdErrorDialog = false;
        }
      }
    },
    isShowAlertCloseBtn() {
      // if (
      //   this.$route.name == "home" ||
      //   this.$route.name == "asset" ||
      //   this.$route.name == "account" ||
      //   this.$route.name == "tradingMarket" ||
      //   this.$route.name == "collection" ||
      //   this.$route.name == "starBlockDao"
      // ) {
      //   return true;
      // } else {
      return false;
      // }
    },
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
    messageDropdownClick(value) {
      this.drow_upDownImgUrl = require("@/assets/img/common/drow_down.svg");

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
      if (!window.ethereum) {
        this.$message.error(this.$t("common.metaMaskCheck"));
        return;
      }
      if (!ethereum.isConnected()) {
        // this.$message.error("未检测到ethereum，需要重新加载");
        window.location.reload();
        return;
      }
      var isUnlocked = false;
      ethereum._metamask.isUnlocked().then(res => {
        isUnlocked = res;
        console.log("ethereum._metamask.isUnlocked()", res);
        if (!isUnlocked) {
          this.$message.error(this.$t("common.metaMaskCheck"));
          return;
        }
      });
      var isClickLogin = true;
      onConnect(this.getAccount, isClickLogin);
    },

    accountsChange() {
      if (!window.ethereum) {
        return;
      }
      var that = this;
      ethereum.on("accountsChanged", function (accounts) {
        // alert(accounts[0]);
        that.setLoginData(accounts[0]);
        window.location.reload();
      });
    },
    walletConnect() {
      // const provider = await initWeb3Modal().connect();
      // var that = this;
      // provider.on("connect", function (info) {
      //   // that.setLoginData(accounts[0]);
      //   window.location.reload();
      //   console.log("connect", info);
      // });
      // provider.on("disconnect", error => {
      //   console.log("disconnect", error);
      //   window.location.reload();
      // });
    },
    chainidChange() {
      if (!window.ethereum) {
        return;
      }
      var that = this;
      ethereum.on("chainChanged", function (chainId) {
        const chaiIdNum = utils.hexToNumber(chainId);
        var chainNameStr = "";
        if (chaiIdNum === 1) {
          chainNameStr = "Mainnet";
        }
        if (chaiIdNum === 3) {
          chainNameStr = "Ropsten";
        }
        if (chaiIdNum === 4) {
          chainNameStr = "Rinkeby";
        }
        if (chaiIdNum === 42) {
          chainNameStr = "Kovan";
        }
        if (chaiIdNum === 5) {
          chainNameStr = "Goerli";
        }
        if (chaiIdNum === 123) {
          chainNameStr = "Calaveras";
        }
        if (chaiIdNum === 56) {
          chainNameStr = "BNB";
        }
        if (chaiIdNum === 97) {
          chainNameStr = "BNB";
        }
        setNetwork_Name(chaiIdNum);
        // that.setChaindUpdateCheck(chaiIdNum);
        window.location.reload();
      });
    },
    getAccount(account, isClickLogin) {
      console.log(account);
      // if (isClickLogin) {
      this.setLoginData(account);
      // } else {
      //   if (localAccount() && localAccount() != account) {
      //     setLocalStorage("isLogin", "0");
      //     this.isLogin = false;
      //   } else {
      //     this.setLoginData(account);
      //   }
      // }
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
      if (item == "navBar.document") {
        window.open(this.$t("navBar.documentUrl"), "_blank");
        return;
      }
      if (item == "navBar.github") {
        window.open("https://github.com/StarBlockDAO", "_blank");
        return;
      }
      if (item == "navBar.starBlock") {
        window.open("https://www.starblock.io", "_blank");
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
  margin-left: 7.5rem;
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
  font-size: 0.45rem;
  /* margin-left: 0.4rem; */
  padding-left: 0.3rem;
  padding-right: 0.3rem;
  text-align: center;
  vertical-align: middle;
  overflow: hidden;
  cursor: pointer;
}

.tabActiveTitle {
  cursor: pointer;
  color: #f7b500;
  font-size: 0.45rem;
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
  width: 4.25rem;
  height: 1rem;
  border-radius: 0.1rem;
  background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);
  ;
  border-style: none;
  font-size: 0.4rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 0.625rem;
}

.accountBox {
  width: 4.25rem;
  height: 1rem;
  display: flex;
  border-radius: 0.1rem;
  background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);
  ;
  flex-direction: row;
  align-items: center;
}

.account_img {
  margin-left: 0.25rem;
  width: 0.75rem;
  height: 0.75rem;
}

.account_text {
  margin-left: 0.25rem;
  font-size: 0.4rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #ffffff;
  line-height: 0.625rem;
}

.dropdownBox {
  margin-right: 1.25rem;
  width: 3.2rem;
  /*   background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);; */
  margin-top: -0.45rem;
  /* margin-top: 18px; */
  /* align-items: center; */
  /* flex: 1; */
  display: flex;
  flex-direction: row-reverse;
  z-index: 100;

  /*   background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);; */
  /* height: 1.5rem; */
  /* align-items: center;s */
  /* width: 100%; */
  /* background-color: aqua; */
}



.changeLangeBtn {
  margin-top: -0.125rem;
  height: 1rem;
  width: 3rem;
  font-size: 0.4rem;
  color: #f7b500;
  border-color: #f7b500;
  border-style: solid;
  border-width: 1px;
  border-color: #f7b500;
  border-style: solid;
  background-color: white;
  border-radius: 0.1rem;
  cursor: pointer;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  /* margin-right: 2.5rem; */
}

.dialogBack {
  display: flex;
  flex-direction: column;
  align-items: center;
  /*   background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);; */
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
  background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);
  ;
  color: white;
  font-size: 0.4rem;
}


.messageDropdownBox {
  width: 3.2rem;
  /*   background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);; */
  margin-top: -0rem;
  /* margin-top: 18px; */
  /* align-items: center; */
  /* flex: 1; */
  display: flex;
  flex-direction: row-reverse;
  z-index: 100;

  /*   background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);; */
  /* height: 1.5rem; */
  /* align-items: center;s */
  /* width: 100%; */
  /* background-color: aqua; */
}

.messageBox {
  justify-content: center;
  margin-left: 1.5rem;
  width: 4.35rem;
  height: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: .1rem;
  border: 1px solid #E5E5E5;
}

.messageBox_icon {
  /* margin-left: .25rem; */
  width: .54rem;
  height: .65rem;
}

.messageBox_text {
  margin-left: .125rem;
  font-size: .45rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #111111;
  line-height: .625rem;
}

.messageBox_rightIcon {
  margin-left: .125rem;
  width: .5rem;
  height: .45rem;
}

.el-dropdown-itemBox {
  height: 1.15rem;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: left; */
}

.el-dropdown-itemBox_sub {
  height: 1.15rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
}

.el-dropdown-itemBox_hash {
  font-size: .4rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #0091FF;
  line-height: .55rem;
}

.el-dropdown-itemBox_copy {
  margin-left: .125rem;
  width: .4rem;
  height: .4rem;
}

.el-dropdown-itemBox_time {
  margin-left: .5rem;
  margin-right: .5rem;
  font-size: .4rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #8C9399;
  line-height: .55rem;

}

.el-dropdown-itemBox_optionBox {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
}

.el-dropdown-itemBox_option {
  font-size: .4rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #8C9399;
  line-height: .55rem;
  text-align: right;
}

.el-dropdown-itemBox_sepLine {
  width: 100%;
  height: .025rem;
  background-color: #E5E5E5;
}
</style>