<template>
  <div class="con_nav">
    <div class="topBackImgBox">
      <div class="topBackView">
        <!-- <div></div> -->
        <img class="topLogo" src="@/assets/img/home/topLogo.png" />
        <div class="topBack_rightBox">
          <div class="messageDropdownBox">


            <div class="messageBox" @click="messageBoxClick">
              <img class="messageBox_icon" src="@/assets/img/common/message_icon.svg" />
              <p class="messageBox_count" v-if="$store.getters.messageList.length > 0">
                {{ $store.getters.messageList.length }}</p>
            </div>
          </div>

          <img class="moreAction" src="@/assets/img/home/mobile/moreAction.svg" @click="moreOptionAction" />
        </div>

      </div>
    </div>

    <div class="messageSuperBox" v-show="messageViewShow">
      <div class="moreOptionViewBack" @click="disMissMessageView()"></div>
      <div class="moreOptionSubViewBox">
        <div class="messageCloseView" @click="disMissMessageView">
          <div class=""></div>
          <p class="messageTitle">{{ $t("common.transationDoing") }}</p>
          <img class="closeImg" src="@/assets/img/home/mobile/optionViewClose.svg" />
        </div>
        <div class="el-dropdown-itemBox" v-for="(item, index) in $store.getters.messageList">
          <div class="el-dropdown-itemBox_sub">
            <div class="hashBox">
              <a :href="getChainWebUrl(item.txHash)" target="_blank">
                <p class="el-dropdown-itemBox_hash">{{ getFrommatAccount(item.txHash) }}</p>
              </a>
              <img class="el-dropdown-itemBox_copy" src="@/assets/img/common/copy.svg"
                @click.stop="copyTxHashAction(item.txHash)" />
            </div>


            <p class="el-dropdown-itemBox_time">{{ getFormmatTimeStr(item.optionTime) }}</p>

            <!-- <div class="el-dropdown-itemBox_optionBox"> -->
            <p class="el-dropdown-itemBox_option">{{ item.optionName }}</p>
            <!-- </div> -->

          </div>
          <div class="el-dropdown-itemBox_sepLine"></div>
        </div>
      </div>

    </div>


    <div class="moreOptionView" v-show="moreOptionViewShow">
      <div class="moreOptionViewBack" @click="disMissmoreOptionView()"></div>
      <div class="moreOptionSubViewBox">
        <div class="closeView" @click="closeViewAction">
          <img class="closeImg" src="@/assets/img/home/mobile/optionViewClose.svg" />
        </div>
        <div class="moreOptionSubView" v-for="(item, index) in tabItems">
          <div :class="active === index ? 'optionItemActive' : 'optionItem'" @click="changeTab(index, item)">
            <p class="optionItemTitle-active" v-if="index == 0 && actualAccount.length > 0">
              {{ account }}
            </p>
            <p :class="active === index ? 'optionItemTitle-active' : 'optionItemTitle'"
              v-if="index < tabItems.length - 1 && index != 0">
              {{ $t(item.title) }}
            </p>
            <p :class="active === index ? 'optionItemTitle-active' : 'optionItemTitle'"
              v-if="index == tabItems.length - 1">
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
    </el-dialog>
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
import { onConnect, initWeb3Modal, resetApp, onBlockOut } from "@/common/useWallet";
import { getLocalStorage, setLocalStorage, isLogin, localAccount } from "@/common/utils";
import { web3ProviderUrl, getProdcutMode, getSurpportChainId } from "@/common/starBlockConfig";
import { setNetwork_Name, getCurrentChainId } from "@/common/starblockdao";
var utils = require("web3-utils");

export default {
  name: "NavBarMobile",
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
    // var currentLangrage = "navBar.English";
    var currentLangrage = "navBar.chinese";

    // if (langType == "en") {
    //   currentLangrage = "navBar.chinese";
    // } else if (langType.startsWith("zh")) {
    //   currentLangrage = "navBar.English";
    // } else {
    //   currentLangrage = "navBar.English";
    // }
    return {
      messageViewShow: false,
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
      actualAccount: "",
      moreOptionViewShow: false,
      currentLangrage: currentLangrage,
      isShowLangrageView: false,
      langrageItemArr: ["简体中文", "English"],
      isShowNavBackImg: true,
      active: 0,
      tabItems: [
        {},
        { title: "navBar.homepage", path: "" },

        { title: "navBar.section1", path: "" },
        { title: "navBar.starBlock", path: "https://github.com/StarBlockDAO", },
        { title: "navBar.document", path: this.$t("navBar.documentUrl") },
        { title: "navBar.github", path: "https://www.starblock.io" },
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
    var isClickLogin = false;
    // if (!getLocalStorage("isFirstLoad")) {
    if (!ethereum.isConnected()) {
      // onConnect(this.getAccount, isClickLogin);
    } else {
      onConnect(this.getAccount, isClickLogin);
    }

    // onConnect(this.getAccount, isClickLogin);
    // }
    setLocalStorage("isFirstLoad", true);
    this.accountsChange();
    this.chainidChange();
    getCurrentChainId(this.handleCurentChainid);

    // onConnect(this.getAccount, isClickLogin);
  },

  mounted() {
    this.$bus.$on("updateTabIndex", val => {
      // if (val == 7) {
      //   return;
      // }
      this.active = val;
    });

    this.$bus.$on("chainIdUpdate", val => {
      if (val) {
        this.setChaindUpdateCheck(val);
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
    getChainWebUrl(subStr) {
      if (getProdcutMode() == 1) {
        return "https://etherscan.io/tx/" + subStr;
      } else {
        return "https://rinkeby.etherscan.io/tx/" + subStr;
      }
    },
    disMissMessageView() {
      this.messageViewShow = false;
    },
    messageBoxClick() {
      if (this.$store.getters.messageList.length == 0) {
        return;
      }
      this.messageViewShow = true;
    },
    getFormmatTimeStr(timeSp) {
      var ago = " ago"
      var cutSp = this.formmatSecond(new Date().getTime()) - this.formmatSecond(timeSp)

      if (cutSp > 0 && cutSp < 60) {
        return cutSp + "s" + ago
      }
      if (cutSp > 60 && cutSp < 60 * 60) {
        return (cutSp / 60).toFixed(0) + "m" + ago
      }
      if (cutSp > 60 * 60) {
        return (cutSp / (60 * 60)).toFixed(2) + "h" + ago
      }

    },

    formmatSecond(value) {
      var newTime = new Date(value); //就得到普通的时间了 
      var newTimeStr = Date.parse(newTime);

      return newTimeStr * Math.pow(10, -3);
    },
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
    handleCurentChainid(chainId) {
      this.currentChainId = chainId;
      setLocalStorage("chaiIdNum", chainId);
      // this.$bus.$emit("chainIdUpdate", chainId);
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
        alert(accounts[0]);
        window.location.reload();
      });
    },
    async chainidChange() {
      const provider = await initWeb3Modal().connect();
      var that = this;
      provider.on("chainChanged", function (chainId) {
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
      this.account = this.getFrommatAccount(account);
      this.actualAccount = account;
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
    closeViewAction() {
      this.moreOptionViewShow = false;
    },
    disMissmoreOptionView() {
      this.moreOptionViewShow = false;
    },
    moreOptionAction() {
      this.moreOptionViewShow = true;
    },
    showSelectView() { },
    changeTab(index, item) {
      this.moreOptionViewShow = false;
      this.active = index;
      if (index == 0) {
        // this.$router.push({ name: "home" });
      }
      if (index == 1) {
        this.$router.push({ name: "home" });
      }
      if (index == 2) {
        this.$router.push({ name: "farms" });
      }
      if (item.title == "navBar.github") {
        window.open("https://github.com/StarBlockDAO", "_blank");
      }
      if (item.title == "navBar.starBlock") {
        window.open("https://www.starblock.io", "_blank");
      }
      if (item.title == "navBar.document") {
        window.open(this.$t("navBar.documentUrl"), "_blank");
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
  /* background-color: #111; */

  background-color: rgba(120, 120, 120, 0.95);
}

.messageSuperBox {
  width: 18.75rem;
  position: absolute;
  margin-left: 0px;
  margin-right: 0px;
  margin-top: 0.25rem;
  /* background-color: #111; */
  display: flex;
  flex-direction: column;
  /* background-color: white; */
  background-color: rgba(120, 120, 120, 0.95);

  /* background-color: rgba(120, 120, 120, 0.95); */
}

.el-dropdown-itemBox {
  height: 2.175rem;
  display: flex;
  flex-direction: column;
  background-color: white;
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

.messageCloseView {
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
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
  /* max-height: 100%; */
  /* overflow-y: scroll; */
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

.dialogBack {
  display: flex;
  flex-direction: column;
  align-items: center;
  /*   background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);; */
  width: 100%;
  border-radius: 0.5rem;
}

.dialopTitle1 {
  font-size: 0.6rem;
  font-weight: 500;
  color: #111;
  margin-top: -0.85rem;
}

.dialogDes {
  font-size: 0.5rem;
  margin-top: 0.25rem;
  align-content: center;
  text-align: center;
}

.dialogTopImg {
  margin-top: -1rem;
  width: 1.75rem;
  height: 1.75rem;
  margin-bottom: 1rem;
}

.dialogBottomBtn {
  margin-top: 0.5rem;
  margin-bottom: -0.25rem;
  width: 95%;
  height: 1.75rem;
  border-radius: 0.75rem;
  border-style: none;
  color: white;
  background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);
  ;
  font-size: 0.65rem;
}

.topBack_rightBox {
  display: flex;
  flex-direction: row;
  height: 100%;
  align-items: center;
}

.messageDropdownBox {
  margin-right: .5rem;
  width: 3.2rem;
  /*   background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);; */
  margin-top: -0rem;
  /* margin-top: 18px; */
  /* align-items: center; */
  /* flex: 1; */
  display: flex;
  flex-direction: row-reverse;
  /* z-index: 99; */

  /*   background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);; */
  /* height: 1.5rem; */
  /* align-items: center;s */
  /* width: 100%; */
  /* background-color: aqua; */
}

.messageBox {
  /* margin-right: .5rem; */
  justify-content: center;
  margin-left: 1rem;
  width: 1.75rem;
  height: 1.75rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: .875rem;
  border: 1px solid #E5E5E5;
}

.messageBox_icon {
  /* margin-left: -.125rem; */
  width: .765rem;
  height: .85rem;
}

.messageBox_count {
  margin-left: -0.5rem;
  margin-top: -0.5rem;
  width: .6rem;
  height: .6rem;
  font-size: .45rem;
  padding-top: .05rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #FFFFFF;
  line-height: .45rem;
  background-color: #FF0F23;
  border-radius: .3rem;
  text-align: center;
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



.el-dropdown-itemBox_sub {
  width: 100%;
  height: 2.175rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.el-dropdown-itemBox_hash {
  margin-left: .75rem;
  font-size: .7rem;
  font-family: Poppins-Regular, Poppins;
  font-weight: 400;
  color: #0091FF;
  line-height: .7rem;
}

.el-dropdown-itemBox_copy {
  margin-left: .125rem;
  width: .7rem;
  height: .7rem;
}

.el-dropdown-itemBox_time {
  font-size: .7rem;
  font-family: Poppins-Regular, Poppins;
  font-weight: 400;
  color: #8C9399;
  line-height: .7rem;

}

.el-dropdown-itemBox_optionBox {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
}

.el-dropdown-itemBox_option {
  margin-right: .75rem;
  font-size: .7rem;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: #8C9399;
  line-height: .7rem;
  text-align: right;
}

.el-dropdown-itemBox_sepLine {
  width: 100%;
  height: .025rem;
  background-color: #E5E5E5;
}

.messageTitle {
  margin-left: .75rem;
  text-align: center;
  font-size: .9rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #212121;
  line-height: .9rem;
}

.hashBox {
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>