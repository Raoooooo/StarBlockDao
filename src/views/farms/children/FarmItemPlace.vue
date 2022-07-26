<template>
    <el-row :gutter="gutterSpace" class="row-bg">
        <el-col v-for="(item, index) in items" :span="rowNum">
            <div class="grid-content bg-purple">
                <div class="contantDetailBox">
                    <img class="backGroundImg" src="@/assets/img/common/item_placeHoder.svg" />
                </div>
            </div>
        </el-col>
    </el-row>
</template>

<script>


export default {
    name: "Farmitemplace",
    components: {
    },
    data() {
        var rowNum = 0;
        if (document.documentElement.clientWidth <= 700) {
            rowNum = 24;
        } else {
            rowNum = 6;
        }
        return {
            currentPollItem: null,
            isNftPrrove: false,
            isWNftPrrove: false,
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

    },
    computed: {

    },
    props: {
        items: {
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

    }
};
</script>

<style scoped>
.el-col {
    margin-bottom: 0.75rem;
    border-radius: 4px;
    /* background-color: antiquewhite; */
}

.bg-purple-dark {
    background: #99a9bf;
    border-color: lightgray;
    border-width: 0.05px;
}

.bg-purple {
    background: white;
    border-color: #99a9bf;
    /* border-width: 0.05px; */
    /* border-style: solid; */
    /* box-shadow: 0px 5px 12px 0px rgb(207 214 230 / 30%); */
    /* border-color: #F1F1F1; */
    /* border-style: solid; */
    border-width: .025rem;
    margin-left: 2px;
    margin-right: 2px;
}

.bg-purple-light {
    background: #e5e9f2;
}

.grid-content {
    border-radius: 10px;
    /* min-height: 80px; */
    display: flex;
    /* flex-direction: column; */
    flex-wrap: wrap;
    z-index: -1;
}

.row-bg {
    padding: 0 0.25rem;
    /* background-color: white; */
    /* background-color: tomato; */
}

.contantDetailBox {
    width: 100%;
    /* background-color: aquamarine; */
    display: flex;
    flex-direction: column;
    align-items: center;
    /* margin-left: 0.5rem; */
    /* margin-right: 0.5rem; */
    height: 100%;
    cursor: default;
}

.backGroundImg {
    width: 100%;
}



@media screen and (-webkit-min-device-pixel-ratio: 1) and (min-width: 1200px) {
    .el-col {
        /* margin-left: -0.25rem; */
        margin-bottom: 0.9rem;
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #99a9bf;
        border-color: rgb(48, 29, 29);
        border-width: 0.05px;
    }

    .row-bg {
        padding: 0 0.75rem;
        /* padding: 0 -0.25rem; */
        /* background-color: white; */
        /* background-color: tomato; */
    }

    .contantDetailBox {
        width: 100%;
        /* background-color: aquamarine; */
        display: flex;
        flex-direction: column;
        align-items: center;
        /* margin-left: 0.5rem; */
        /* margin-right: 0.5rem; */
        height: 100%;
    }
}
</style>