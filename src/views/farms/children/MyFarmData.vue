<template>
    <div class="contant">
        <div class="contantBack">


            <div class="rightBox">
                <div class="rightBox_topBox">
                    <div class="rightBox_topBox_leftBox">
                        <img class="itemTopImg" src="@/assets/img/common/detail_Icon.svg" />
                        <p class="itemTopTitle">{{ $t("common.myStakeTitle") }}</p>
                    </div>
                    <div class="rightBox_topBox_rightBox">
                        <div class="refreshBox" v-show="getAwardIconShow" @click="getAwardBoxAction">
                            <p class="refreshBox_text" v-show="!showImgLoading_refresh">{{
                                    isShowMobile ? $t("common.newReward_mobile") : $t("common.newReward")
                            }}</p>
                            <img class="refreshBox_img" src="@/assets/img/common/refresh_icon.svg"
                                v-show="!showImgLoading_refresh" />
                            <img class="loadingImg_refresh" src="@/assets/img/common/requestLoading_yellow.svg"
                                v-show="showImgLoading_refresh" />
                        </div>

                        <!-- <div class="rightBtnBox"></div> -->
                        <button
                            :class="isBtnActive ? 'rightBox_topBox_rightButton_active' : 'rightBox_topBox_rightButton'"
                            @click="receiveReward">
                            <img class="loadingImg" src="@/assets/img/common/requestLoading_white.svg"
                                v-show="showImgLoading" />
                            <p v-show="!showImgLoading">{{ $t("common.getAllReward") }}</p>
                        </button>
                    </div>

                </div>

                <div class="rightBox_bottomBox">
                    <!-- <div class="rightBox_bottomBox_contant">
                        <img :src="refeshImgUrl" class="getAwardBox_img" @click="getAwardBoxAction"
                            v-show="getAwardIconShow" v-bind:style="{ marginLeft: getAwardBox_imgMarginLeft }" />
                    </div> -->
                    <div class="getAwardBox">

                        <div :class="isShowMobile ? 'miniDataBox1_mobile' : 'miniDataBox1'">
                            <p class="miniDataBoxTopP1" id="miniDataBoxTopP1">{{ awardAmountStr(userInfo) }}</p>
                            <p class="miniDataBox_bottomP">{{ $t("common.optionName5") }}</p>
                        </div>

                    </div>

                    <div class="vSepLine" v-show="!isShowMobile"></div>
                    <div :class="isShowMobile ? 'miniDataBox_mobile' : 'miniDataBox'" v-show="!isShowMobile">
                        <p class="miniDataBox_topP">{{ bonusAmountStr(userInfo) }}</p>
                        <p class="miniDataBox_bottomP">{{ $t("common.optionName6") }}</p>
                    </div>

                    <div class="vSepLine" v-show="!isShowMobile"></div>
                    <!-- <a :href="blockNumberUrl" target="_blank"> -->
                    <div :class="isShowMobile ? 'miniDataBox_mobile' : 'miniDataBox_blockNumber'" v-show="!isShowMobile"
                        @click="clickToBlockNumberUrl()">
                        <p class="miniDataBox_topP">{{ userInfo.blockNumber }}</p>
                        <p class="miniDataBox_bottomP">{{ $t("common.rewardBlock") }}</p>
                    </div>
                    <!-- </a> -->
                    <div class="vSepLine"></div>
                    <div :class="isShowMobile ? 'miniDataBox_mobile' : 'miniDataBox'">
                        <p class="miniDataBox_topP">{{ userInfo.nftQuantity + " NFT" }}</p>
                        <p class="miniDataBox_bottomP">{{ $t("common.canStake") }}</p>
                    </div>

                    <div class="vSepLine"></div>
                    <div :class="isShowMobile ? 'miniDataBox_mobile' : 'miniDataBox'">
                        <p class="miniDataBox_topP">{{ userInfo.wnftQuantity + " NFT" }}</p>
                        <p class="miniDataBox_bottomP">{{ $t("farms.havePledge") }}</p>
                    </div>
                </div>


                <div class="balanceBox">
                    <!-- <a :href="accountUrl" target="_blank" v-if="isBtnActive">
                        <p class="balanceBox_leftText">{{ $t("common.STBBalance") + ": " }}
                            <span class="balanceBox_value">
                                {{ balanceStr(userInfo) + " STB" }}
                            </span>
                        </p>
                    </a> -->
                    <p class="balanceBox_leftText" @click="balanceBoxClick">{{ $t("common.STBBalance") + ": " }}
                        <span class="balanceBox_value">
                            {{ balanceStr(userInfo) + " STB" }}
                        </span>
                    </p>
                    <p class="balanceBox_rightText">{{ $t("common.STBDes") }}</p>
                </div>
            </div>
        </div>
    </div>

</template>

<script>


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

import {
    etherscanBlockNumberBase,
    etherscanAccountBalanceBase
} from "@/common/starblockdao";
import { gsap } from "gsap"
export default {
    name: "myfarmdata",
    components: {

    },
    data() {
        return {
            showImgLoading_refresh: false,
            getAwardBox_imgMarginLeft: 0,
            getAwardBox_imgMarginTop: 0,
            getAwardIconShow: false,
            awardAmount: 0,
            showImgLoading: false,
            windowWidth: document.documentElement.clientWidth, //实时屏幕宽度
            rowNum: document.documentElement.clientWidth > 600 ? 6 : 12,
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
            isRequestServiceRate: false,
            isShowMobile: document.documentElement.clientWidth > 750 ? false : true

        };
    },
    created() {

    },
    computed: {
        blockNumberUrl() {
            if (this.userInfo.blockNumber != "--") {
                return etherscanBlockNumberBase() + this.userInfo.blockNumber;
            }
            return ""
        },

        accountUrl() {
            if (this.userInfo.selectedAddress != undefined && this.userInfo.selectedAddress) {
                var url = etherscanAccountBalanceBase(this.userInfo.selectedAddress);
                return url;
            } else {
                return ""
            }

        },
        refeshImgUrl() {
            return this.$t("common.refeshImgUrl")
        },

        isBtnActive() {
            if (!window.ethereum) {
                return false;
            }
            if (!this.userInfo.selectedAddress) {
                return false;
            }
            // if (!window.ethereum.selectedAddress) {
            //     return false;
            // }
            if (Number(this.userInfo.mining) <= 0) {
                return false
            }
            return true;
        },
        // awardAmountStr() {
        //     if (this.userInfo.mining != "--") {
        //         this.awardAmount = (this.userInfo.mining * Math.pow(10, -18)).toFixed(4);
        //         // return (this.userInfo.mining * Math.pow(10, -18)).toFixed(4) + " STB";
        //     }
        //     // if (this.userInfo.mining == "--") {
        //     //     return "-- STB";
        //     // }
        //     return this.awardAmount;
        // },
        canClainmReward() {
            if (this.canClaimResult == []) {
                return "--";
            }
            var itemArr = this.canClaimResult[1];
            if (itemArr) {
                return formmatToToLocaleStringEnUS(Number(itemArr[0]) * Math.pow(10, -18)) + " STB";
            } else {
                return "--"
            }

        },
    },
    props: {
        userInfo: {
            type: Array,
            default() {
                return [];
            }
        },
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
            that.rowNum = that.windowWidth > 600 ? 6 : 12;
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
        },
        awardAmountStr: function (newValue) {
            gsap.to(this.$data, { duration: 0.5, awardAmount: newValue });
        }
    },

    mounted() {
        var that = this;
        // <!--把window.onresize事件挂在到mounted函数上-->
        window.onresize = () => {
            return (() => {
                window.fullHeight = document.documentElement.clientHeight;
                window.fullWidth = document.documentElement.clientWidth;
                that.windowHeight = window.fullHeight; // 高
                that.windowWidth = window.fullWidth; // 宽
                that.setImgMarginLeftOfGetAward();
            })();
        };
        this.$bus.$on("hiddenRefeshIcon", val => {
            this.getAwardIconShow = false;
            this.showImgLoading_refresh = false;
        });
        this.$bus.$on("resetBtnStatusNoti", val => {
            this.showImgLoading = false;

        });
        this.$bus.$on("showRefeshIcon", val => {
            if (!window.ethereum) {
                return;
            }
            if (!window.ethereum.selectedAddress) {
                return;
            }
            if (Number(this.userInfo.wnftQuantity) == 0) {
                return;
            }
            this.getAwardIconShow = true;
            // this.setImgMarginLeftOfGetAward();
            // console.log("miniDataBox_topPwidth", this.getWH("miniDataBox_topP", "width"))
        });

        this.$bus.$on("userInfoUpdateNoti", val => {
            gsap.to(this.$data, { duration: 0.5, awardAmount: 1333 });

        });



    },
    methods: {

        balanceBoxClick() {
            const h = this.$createElement;

            this.$message({
                message: h('p', null, [
                    h('span', { fontSize: '10px' }, '内容可以是 '),
                    // h('i', {}, 'VNode')
                ])
            });
            return;
            // if (!this.isBtnActive) {
            //     return;
            // }

            if (!window.ethereum) {
                return false;
            }
            if (!this.userInfo.selectedAddress) {
                return false;
            }
            this.$bus.$emit("balanceBoxClickNoti", this.balanceStr(this.userInfo));
        },
        clickToBlockNumberUrl() {
            if (this.userInfo.blockNumber == "--") {
                return;
            }
            window.open(etherscanBlockNumberBase() + this.userInfo.blockNumber, "_blank");
            //    window.push(etherscanBlockNumberBase()+this.userInfo.blockNumber)
        },
        setImgMarginLeftOfGetAward() {
            let elem = document.querySelector('.miniDataBoxTopP1');
            let rect = elem.getBoundingClientRect();
            if (this.isShowMobile) {
                // this.getAwardBox_imgMarginLeft = (rect.width / 2.0 + 24 * document.documentElement.clientWidth / 750 * 4.6) + "px"
                this.getAwardBox_imgMarginLeft = (rect.right - document.documentElement.clientWidth * 0.025 - 10 * document.documentElement.clientWidth / 750) + "px"

            } else {
                // this.getAwardBox_imgMarginLeft = (rect.width * 2) + "px"
                this.getAwardBox_imgMarginLeft = (rect.right - document.documentElement.clientWidth * 0.025 - 15 * document.documentElement.clientWidth / 1920) + "px"
            }
        },

        // 考虑 IE 的兼容性
        getStyle(el) {
            if (window.getComputedStyle) {
                return window.getComputedStyle(el, null);
            } else {
                return el.currentStyle;
            }
        },
        getWH(el, name) {
            var val = name === "width" ? el.offsetWidth : el.offsetHeight,
                which = name === "width" ? ['Left', 'Right'] : ['Top', 'Bottom'];
            // display is none 
            if (val === 0) {
                return 0;
            }
            var style = this.getStyle(el);
            // 左右或上下两边的都减去
            for (var i = 0, a; a = which[i++];) {
                val -= parseFloat(style["border" + a + "Width"]) || 0;
                val -= parseFloat(style["padding" + a]) || 0;
            }
            return val;
        },
        getAwardBoxAction() {
            // this.getAwardIconShow = false;
            this.showImgLoading_refresh = true;
            this.$bus.$emit("refreshAllData", "1");

        },
        receiveReward() {
            this.$message.warning(this.$t("common.checkPassMsg"))
            return;
            if (this.showImgLoading) {
                return;
            }
            if (!this.isBtnActive) {
                return;
            }

            // var itemArr = this.canClaimResult[1];
            // if (Number(itemArr[0]) <= 0) {
            //     this.$message.error("没有奖励可领取");
            //     return;
            // }
            this.showImgLoading = true;
            if (checkChainIdError()) {
                this.$bus.$emit("checkChainIdError", "1");
                return;
            }
            this.pledgeBtnStr = "";
            this.$bus.$emit("harvestAllNoti", "1");
            // getAccounts()
            //     .then(accounts => {
            //         if (accounts) {
            //             this.pledgeBtnStr = "";
            //             this.$bus.$emit("harvestAllNoti", "1");
            //         } else {
            //             this.$message.error(this.$t("common.connectWalletMsg"));
            //         }
            //     })
            //     .catch(error => this.$message.error(this.$t("common.connectWalletMsg")));
        },
        daoporClaimSuccess(result) {
            this.showImgLoading = false;
            this.$bus.$emit("receiveRewardSuccess", result);
        },
        daoporClaimFail() {
            this.showImgLoading = false

        },
        pushAction() {
            window.open("https://starblockdao.io");
        },
        rewardPerNFTAmount(item) {
            if (Number(item.rewardPerNFTForEachBlock) > 0) {
                return (
                    (Number(item.rewardPerNFTForEachBlock) * 6500 * 30 * Math.pow(10, -18)).toFixed(4) +
                    " STB"
                );
            } else if (Number(item.rewardForEachBlock) > 0 && Number(item.poolInfo.amount) != 0) {
                return (
                    (
                        (Number(item.rewardForEachBlock) * 6500 * 30 * Math.pow(10, -18)) /
                        Number(item.poolInfo.amount)
                    ).toFixed(4) + " STB"
                );
            } else {
                return "--" + " STB";
            }
        },
        awardAmountStr(item) {
            if (item.mining != "--") {
                if (Number((item.mining * Math.pow(10, -18)).toFixed(2)) > 1000) {
                    this.awardAmount = formmatToToLocaleStringEnUS(Number((item.mining * Math.pow(10, -18)).toFixed(2))) + " STB";
                } else {
                    this.awardAmount = Number((item.mining * Math.pow(10, -18)).toFixed(2)) + " STB";
                }

                // let elem = document.querySelector('miniDataBox_topP1');
                // let rect = elem.getBoundingClientRect();
                // if (this.isShowMobile) {
                //     this.getAwardBox_imgMarginLeft = this.awardAmount.length * 0.6 / 2.0 + "rem"

                // } else {
                //     this.getAwardBox_imgMarginLeft = this.awardAmount.length * 0.5 / 2.0 + "rem"
                // }

                return this.awardAmount;
            }
            if (item.mining == "--") {
                return "-- STB";
            }
            return item.mining;
        },

        balanceStr(item) {
            if (item.tokenBalance != "--") {
                if (Number((item.tokenBalance * Math.pow(10, -18)).toFixed(2)) > 1000) {
                    return formmatToToLocaleStringEnUS(Number((item.tokenBalance * Math.pow(10, -18)).toFixed(2)));
                } else {
                    return Number((item.tokenBalance * Math.pow(10, -18)).toFixed(4));
                }
            }
            if (item.tokenBalance == "--") {
                return "--";
            }
        },

        bonusAmountStr(item) {
            if (item.dividend != "--") {
                return Number((item.dividend * Math.pow(10, -18)).toFixed(2)) + " WETH";
            }
            if (item.dividend == "--") {
                return "-- WETH";
            }
            return item.dividend;
        },
    }
};
</script>

<style scoped>
.contant {
    display: flex;
    /* margin-left: 10%; */
    /* width: 80%; */
}

.contantBack {
    /* background-color: aqua; */
    display: flex;
    flex-direction: column;
    /* flex-direction: row-reverse; */
    /* flex-direction: row; */
    align-items: center;
    /* background: #FFFFFF; */
    border-radius: .25rem;
    width: 100%;
    /* height: 5.45rem; */

}

.leftBox_super {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
}

.leftBox {
    margin-top: .75rem;
    margin-left: 0rem;
    border-radius: .25rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    /* height: 100%; */
    background-color: #FFFFFF;
    height: 100%;

}

.leftBox1 {
    margin-top: .75rem;
    margin-left: 0rem;
    border-radius: .25rem;
    display: flex;
    flex-direction: column;
    width: 100%;
    /* height: 100%; */
    background-color: #FFFFFF;
    height: 100%;

}

.leftBox_topBox {
    margin-top: .25rem;
    margin-left: .5rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
}

.leftBox_topBox_leftBox {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.leftBox_topBox_rightBtn_a {
    /* margin-top: -0.5rem; */
    /* margin-bottom: -0.25rem; */
    display: flex;
    flex-direction: column;
    justify-content: center;

}

.leftBox_topBox_rightBtn {
    cursor: pointer;
    margin-right: .5rem;
    padding-left: .6rem;
    padding-right: .6rem;
    height: 1.1rem;
    /* padding-top: .175rem; */
    /* padding-bottom: .175rem; */
    background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);
    border-radius: .1rem;
    font-size: .55rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    line-height: .5rem;
    border-style: none;
}

.itemTopImg {
    width: .75rem;
    height: .75rem;
}

.itemTopTitle {
    margin-left: .25rem;
    font-size: .6rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #111111;
    line-height: .625rem;
}

.descrip {
    margin-top: .45rem;
    width: 95%;
    margin-left: .5rem;
    margin-right: .5rem;
    font-size: .55rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8C9399;
    line-height: .7rem;
    margin-bottom: .35rem;
}

.rightBox {
    margin-top: .375rem;
    display: flex;
    width: 100%;
    background-color: #FFFFFF;
    border-radius: .25rem;
    display: flex;
    flex-direction: column;
    align-items: center;

}

.rightBox_topBox {
    margin-top: .3rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: space-between;
}

.rightBox_topBox_leftBox {
    margin-left: .5rem;
    display: flex;
    flex-direction: row;
}

.rightBox_topBox_rightButton {
    margin-right: .5rem;
    /* width: 7.3rem; */
    padding-left: .6rem;
    padding-right: .6rem;
    height: 1.1rem;
    border-radius: .1rem;
    font-size: .55rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    line-height: .5rem;
    border-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #e5e5e5;
    border-radius: 0.1rem;
    background: #f2f2f2;
    color: #8c9399;
    cursor: default;
}

.rightBox_topBox_rightButton_active {
    cursor: pointer;
    margin-right: .5rem;
    /* width: 7.3rem; */
    padding-left: .6rem;
    padding-right: .6rem;
    height: 1.1rem;
    /* padding-top: .175rem; */
    /* padding-bottom: .175rem; */
    background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);
    border-radius: .1rem;
    font-size: .55rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    line-height: .5rem;
    border-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
}

.rightBtnBox {
    cursor: pointer;
    margin-right: .5rem;
    width: 7.3rem;
    /* padding-left: .6rem; */
    /* padding-right: .6rem; */
    height: 1.1rem;
    /* padding-top: .175rem; */
    /* padding-bottom: .175rem; */
    background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);
    border-radius: .1rem;
    font-size: .55rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    line-height: .5rem;
    border-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
}


.rightBox_bottomBox {
    position: relative;
    border-radius: 5px;
    border: .7px solid #E5E5E5;
    display: flex;
    flex-direction: row;
    width: 95%;
    justify-content: space-between;
    margin-top: .35rem;
    margin-bottom: .5rem;
    align-items: center;
}

.rightBox_bottomBox_contant {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    /* background-color: aqua; */
}

.miniDataBox1_mobile {
    /* margin-left: 20%; */
    display: flex;
    flex-direction: column;
    align-items: center;
}

.miniDataBox1 {
    /* margin-left: 27%; */
    display: flex;
    flex-direction: column;
    align-items: center;
}

.miniDataBox_mobile {
    width: 33.33%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.miniDataBox {
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.miniDataBox_blockNumber {
    cursor: pointer;
    width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 100;
}

.miniDataBox_topP {
    margin-top: .5rem;
    font-size: .6rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #111111;
    line-height: .7rem;
    white-space: nowrap;
}

.miniDataBoxTopP1 {
    margin-top: .5rem;
    font-size: .6rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #111111;
    line-height: .7rem;
    white-space: nowrap;
}

.miniDataBox_bottomP {
    margin-top: .25rem;
    font-size: .4rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8C9399;
    line-height: .5rem;
    margin-bottom: .5rem;
    white-space: nowrap;
}

.rightBox_sepLine {
    margin-top: .275rem;
    width: 95%;
    height: 0.7px;
    background-color: #FFEBB3;
}

.vSepLine {
    width: .7px;
    height: 1rem;
    background-color: #E5E5E5;
}

.loadingImg {
    margin-top: -0.125rem;
    width: 1.75rem;
    height: 1.75rem;
    /* padding-left: .6rem; */
    /* padding-right: .6rem; */
}

.loadingImg_refresh {
    width: 1.2rem;
    height: 1.2rem;
}

.balanceBox {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 95%;
    justify-content: space-between;
    margin-bottom: .5rem;
}

.balanceBox_leftText {
    font-size: .5rem;
    font-family: Poppins-Medium, Poppins;
    font-weight: 500;
    color: #666666;
    line-height: .65rem;
}

.balanceBox_value {
    font-size: .5rem;
    font-family: Poppins-Medium, Poppins;
    font-weight: 500;
    color: #212121;
    line-height: .65rem;
}

.balanceBox_rightText {
    font-size: .5rem;
    font-family: Poppins-Regular, Poppins;
    font-weight: 400;
    color: #5C5E67;
    line-height: .65rem;
}

.getAwardBox {
    flex: 1;
    display: flex;
    flex-direction: row;
    /* align-items: center; */
    justify-content: center;
}

.getAwardBox_img {
    position: absolute;
    /* float: left; */
    margin-top: .25rem;
    cursor: pointer;
    margin-left: .5rem;
    width: 1.75rem;
}

.rightBox_topBox_rightBox {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.refreshBox {
    padding-left: .375rem;
    padding-right: .375rem;
    margin-top: .025rem;
    cursor: pointer;
    /* width: 2.5rem; */
    height: 1.1rem;
    border-radius: .1rem;
    border-width: .025rem;
    border-color: #F7B500;
    border-style: solid;
    background-color: white;
    margin-right: .25rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.refreshBox_img {
    margin-left: .125rem;
    width: .45rem;
    height: .45rem;
}

.refreshBox_text {
    font-size: .55rem;
    color: #F7B500;
}


@media screen and (-webkit-min-device-pixel-ratio: 1) and (min-width: 1200px) {
    .contant {
        display: flex;
        /* margin-left: 10%; */
        /* width: 80%; */
    }

    .contantBack {
        /* background-color: aqua; */
        display: flex;
        flex-direction: column;
        /* flex-direction: row; */
        align-items: center;
        /* background: #FFFFFF; */
        border-radius: .25rem;
        width: 100%;
        /* height: 5.45rem; */

    }

    .leftBox_super {
        height: 100%;
        width: 40%;
        display: flex;
        flex-direction: row;
    }

    .leftBox {
        margin-top: 0rem;
        margin-left: .375rem;
        /* margin-right: .75rem; */
        border-radius: .25rem;
        display: flex;
        flex-direction: column;
        width: 50%;
        /* width: 30%; */
        /* height: 100%; */
        background-color: #FFFFFF;
        height: 100%;

    }

    .leftBox1 {
        margin-top: 0rem;
        margin-left: .75rem;
        /* margin-right: .75rem; */
        border-radius: .25rem;
        display: flex;
        flex-direction: column;
        width: 50%;
        /* width: 30%; */
        /* height: 100%; */
        background-color: #FFFFFF;
        height: 100%;

    }

    .leftBox_topBox {
        margin-top: .25rem;
        margin-left: .5rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .leftBox_topBox_leftBox {
        display: flex;
        flex-direction: row;
        align-items: center;
    }

    .leftBox_topBox_rightBtn {
        cursor: pointer;
        margin-right: .5rem;
        padding-left: .6rem;
        padding-right: .6rem;
        height: .8rem;
        /* padding-top: .175rem; */
        /* padding-bottom: .175rem; */
        background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);
        border-radius: .1rem;
        font-size: .35rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        line-height: .5rem;
        border-style: none;
    }

    .itemTopImg {
        width: .5rem;
        height: .5rem;
    }

    .itemTopTitle {
        margin-left: .25rem;
        font-size: .45rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #111111;
        line-height: .625rem;
    }

    .descrip {
        margin-top: .45rem;
        width: 7.125rem;
        margin-left: .5rem;
        margin-right: .5rem;
        font-size: .35rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #8C9399;
        line-height: .7rem;
        margin-bottom: 0rem;
    }

    .rightBox {
        margin-top: 0rem;
        display: flex;
        width: 100%;
        background-color: #FFFFFF;
        border-radius: .25rem;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .rightBox_topBox {
        margin-top: .3rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        justify-content: space-between;
    }

    .rightBox_topBox_leftBox {
        margin-left: .5rem;
        display: flex;
        flex-direction: row;
    }

    .rightBox_topBox_rightButton {
        margin-right: .5rem;
        padding-left: .375rem;
        padding-right: .375rem;
        /* width: 6.1rem; */
        height: 1rem;
        /* padding-top: .175rem; */
        /* padding-bottom: .175rem; */
        border-radius: .1rem;
        font-size: .35rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        line-height: .5rem;
        border-style: none;
        background-color: #e5e5e5;
        border-radius: 0.1rem;
        background: #f2f2f2;
        color: #8c9399;
        cursor: default;
    }

    .rightBox_topBox_rightButton_active {
        cursor: pointer;
        /* margin-right: .5rem; */
        padding-left: .375rem;
        padding-right: .375rem;
        /* width: 6.1rem; */
        height: 1rem;
        /* padding-top: .175rem; */
        /* padding-bottom: .175rem; */
        background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);
        border-radius: .1rem;
        font-size: .35rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        line-height: .5rem;
        border-style: none;
    }


    .rightBox_bottomBox {
        position: relative;
        border-radius: 5px;
        border: .7px solid #E5E5E5;
        display: flex;
        flex-direction: row;
        width: 98%;
        justify-content: space-around;
        margin-top: .35rem;
        margin-bottom: .5rem;
        align-items: center;
    }

    .rightBox_bottomBox_contant {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        /* background-color: aqua; */
    }

    .miniDataBox {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .miniDataBox_blockNumber {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 100;
    }

    .miniDataBox_topP {
        margin-top: .5rem;
        font-size: .5rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #111111;
        line-height: .7rem;
        white-space: nowrap;
    }

    .miniDataBoxTopP1 {
        margin-top: .5rem;
        font-size: .5rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #111111;
        line-height: .7rem;
        white-space: nowrap;
    }

    .miniDataBox_bottomP {
        margin-top: .25rem;
        font-size: .35rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #8C9399;
        line-height: .5rem;
        margin-bottom: .5rem;
    }

    .rightBox_sepLine {
        margin-top: .275rem;
        width: 95%;
        height: 0.7px;
        background-color: #FFEBB3;
    }

    .vSepLine {
        width: .7px;
        height: 1rem;
        background-color: #E5E5E5;
    }

    .loadingImg {
        margin-top: -0rem;
        /* padding-left: .6rem; */
        /* padding-right: .6rem; */
        width: 1rem;
        height: 1rem;
    }

    .loadingImg_refresh {
        margin-top: -0rem;
        /* padding-left: .6rem; */
        /* padding-right: .6rem; */
        width: 1rem;
        height: 1rem;
    }


    .balanceBox {
        cursor: pointer;
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 98%;
        justify-content: space-between;
        margin-bottom: .5rem;
    }

    .balanceBox_leftText {
        font-size: .4rem;
        font-family: Poppins-Medium, Poppins;
        font-weight: 500;
        color: #666666;
        line-height: .65rem;
    }

    .balanceBox_value {
        font-size: .4rem;
        font-family: Poppins-Medium, Poppins;
        font-weight: 500;
        color: #212121;
        line-height: .65rem;
    }

    .balanceBox_rightText {
        font-size: .4rem;
        font-family: Poppins-Regular, Poppins;
        font-weight: 400;
        color: #5C5E67;
        line-height: .65rem;
    }

    .getAwardBox {
        flex: 1;
        display: flex;
        flex-direction: row;
        /* align-items: center; */
        justify-content: center;
    }

    .getAwardBox_img {
        position: absolute;
        margin-top: .25rem;
        cursor: pointer;
        margin-left: .5rem;
        width: 2rem;
    }

    .refreshBox {
        /* width: 4rem; */
        padding-left: .375rem;
        padding-right: .375rem;
        height: 1rem;
        border-radius: .1rem;
        border-width: .025rem;
        border-color: #F7B500;
        border-style: solid;
        background-color: white;
        margin-right: .5rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .refreshBox_img {
        margin-left: .125rem;
        width: .45rem;
        height: .45rem;
        cursor: pointer;
    }

    .refreshBox_text {
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        font-size: .35rem;
        color: #F7B500;
    }

}
</style>