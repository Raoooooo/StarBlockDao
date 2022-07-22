<template>
    <div class="contant">
        <div class="contantBack">
            <div class="leftBox_super">
                <div class="leftBox">
                    <div class="leftBox_topBox">
                        <div class="leftBox_topBox_leftBox">
                            <img class="itemTopImg" src="@/assets/img/common/alertWaring.svg" />
                            <p class="itemTopTitle">交易奖励</p>
                        </div>
                        <button class="leftBox_topBox_rightBtn">了解更多</button>
                    </div>
                    <p class="descrip">当您在StartBlock上购买或出售任何W-NFT，都可获得交易奖励（私人交易除外）。奖励每天发放一次</p>
                </div>

                <div class="leftBox1">
                    <div class="leftBox_topBox">
                        <div class="leftBox_topBox_leftBox">
                            <img class="itemTopImg" src="@/assets/img/common/alertWaring.svg" />
                            <p class="itemTopTitle">交易奖励</p>
                        </div>
                        <button class="leftBox_topBox_rightBtn">了解更多</button>
                    </div>
                    <p class="descrip">当您在StartBlock上购买或出售任何W-NFT，都可获得交易奖励（私人交易除外）。奖励每天发放一次</p>
                </div>
            </div>

            <div class="rightBox">
                <div class="rightBox_topBox">
                    <div class="rightBox_topBox_leftBox">
                        <img class="itemTopImg" src="@/assets/img/common/alertWaring.svg" />
                        <p class="itemTopTitle">我的NFT抵押挖矿</p>
                    </div>
                    <!-- <a href="https://starblockdao.io" target="_blank" class=""> -->
                    <button class="rightBox_topBox_rightButton" @click="receiveReward">
                        <img class="loadingImg" src="@/assets/img/common/requestLoading_white.svg"
                            v-show="showImgLoading" />
                        <p v-show="!showImgLoading">领取奖励</p>
                    </button>
                    <!-- </a> -->
                </div>
                <!-- <div class="rightBox_sepLine"></div> -->
                <div class="rightBox_bottomBox">
                    <div class="miniDataBox">
                        <!-- <p class="miniDataBox_topP">{{ awardAmountStr(lpObject) }}</p> -->
                        <p class="miniDataBox_topP">{{ "dsdsd" }}</p>
                        <p class="miniDataBox_bottomP">待领取交易奖励</p>
                    </div>

                    <div class="vSepLine"></div>
                    <div class="miniDataBox">
                        <!-- <p class="miniDataBox_topP">{{ bonusAmountStr(lpObject) }}</p>
                         -->
                        <p class="miniDataBox_topP">{{ "sdd" }}</p>
                        <p class="miniDataBox_bottomP">当前结算日期</p>
                    </div>
                    <div class="vSepLine"></div>
                    <div class="miniDataBox">
                        <!-- <p class="miniDataBox_topP">{{ lpObject.nftQuantity + " NFT" }}</p> -->
                        <p class="miniDataBox_topP">{{ "dsddsds"
                        }}</p>
                        <p class="miniDataBox_bottomP">贡献交易额</p>
                    </div>

                    <div class="vSepLine"></div>
                    <div class="miniDataBox">
                        <!-- <p class="miniDataBox_topP">{{ lpObject.nftQuantity + " NFT" }}</p> -->
                        <p class="miniDataBox_topP">{{ "dsddsds"
                        }}</p>
                        <p class="miniDataBox_bottomP">贡献交易额</p>
                    </div>
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
    daoportAction,
    getBlockNumber,
    onBlockNumberChange,
    onLogsChange,
    approveNFTAction,
    approveWNFTAction,
    getBonusRewardAction,
    getNFTTokenIDs,
    daoporDeposit,
    getWNFTTokenIDs,
    daoporWithdraw,
    daoporHarvest,
    openseaApiBaseUrl,
    daoportCanClaim,
    daoporClaim
} from "@/common/starblockdao";
export default {
    name: "myfarmdata",
    components: {

    },
    data() {
        return {
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
            isRequestServiceRate: false
        };
    },
    created() {

    },
    computed: {
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
        lpObject: {
            type: Object,
            default() {
                return {};
            }
        },
        canClaimResult: {
            type: Array,
            default() {
                return [];
            }
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
            })();
        };
    },
    methods: {

        receiveReward() {
            if (this.showImgLoading) {
                return;
            }

            var itemArr = this.canClaimResult[1];
            if (Number(itemArr[0]) <= 0) {
                this.$message.error("没有奖励可领取");
                return;
            }
            this.showImgLoading = true

            daoporClaim(this.lpObject.treeNodes, this.daoporClaimSuccess, this.daoporClaimFail);
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
                return (item.mining * Math.pow(10, -18)).toFixed(4) + " STB";
            }
            return item.mining;
        },

        bonusAmountStr(item) {
            if (item.dividend != "--") {
                return (item.dividend * Math.pow(10, -18)).toFixed(4) + " WETH";
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
    flex-direction: column-reverse;
    /* flex-direction: row; */
    align-items: center;
    /* background: #FFFFFF; */
    border-radius: .25rem;
    width: 100%;
    /* height: 5.45rem; */

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
    height: 1.1rem;
    /* padding-top: .175rem; */
    /* padding-bottom: .175rem; */
    background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);
    border-radius: .55rem;
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
    margin-right: 0rem;
    margin-top: .375rem;
    display: flex;
    margin-left: 0rem;
    width: 100%;
    /* margin-right: .75rem; */
    flex: 1;
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
    cursor: pointer;
    margin-right: .5rem;
    width: 3.1rem;
    /* padding-left: .6rem; */
    /* padding-right: .6rem; */
    height: 1.1rem;
    /* padding-top: .175rem; */
    /* padding-bottom: .175rem; */
    background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);
    border-radius: .55rem;
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
    border-radius: 5px;
    border: .7px solid #E5E5E5;
    display: flex;
    flex-direction: row;
    width: 97%;
    justify-content: space-around;
    margin-top: .35rem;
    margin-bottom: .5rem;
    align-items: center;
}

.miniDataBox {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.miniDataBox_topP {
    margin-top: .5rem;
    font-size: .6rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #111111;
    line-height: .7rem;
}

.miniDataBox_bottomP {
    margin-top: .25rem;
    font-size: .4rem;
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
    width: 1.75rem;
    height: 1.75rem;
    /* padding-left: .6rem; */
    /* padding-right: .6rem; */
}

.leftBox_super {
    height: 100%;
    width: 40%;
    display: flex;
    flex-direction: row;
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
        flex-direction: row-reverse;
        /* flex-direction: row; */
        align-items: center;
        /* background: #FFFFFF; */
        border-radius: .25rem;
        width: 100%;
        /* height: 5.45rem; */

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
        border-radius: .4rem;
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
        margin-right: .375rem;
        margin-top: 0rem;
        width: auto;
        display: flex;
        margin-left: 0rem;
        flex: 1;
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
        cursor: pointer;
        margin-right: .5rem;
        /* padding-left: .6rem; */
        /* padding-right: .6rem; */
        width: 3.1rem;
        height: .8rem;
        /* padding-top: .175rem; */
        /* padding-bottom: .175rem; */
        background: linear-gradient(270deg, #FF9902 0%, #F7B500 100%);
        border-radius: .4rem;
        font-size: .35rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        line-height: .5rem;
        border-style: none;
    }


    .rightBox_bottomBox {
        border-radius: 5px;
        border: .7px solid #E5E5E5;
        display: flex;
        flex-direction: row;
        width: 97%;
        justify-content: space-around;
        margin-top: .35rem;
        margin-bottom: .5rem;
        align-items: center;
    }

    .miniDataBox {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .miniDataBox_topP {
        margin-top: .5rem;
        font-size: .5rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #111111;
        line-height: .7rem;
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
        /* padding-left: .6rem; */
        /* padding-right: .6rem; */
        width: 1rem;
        height: 1rem;
    }

}
</style>