<template>
    <el-row :gutter="gutterSpace" class="row-bg">
        <el-col v-for="(item, index) in goods" :span="rowNum">
            <a :href="$t(item.linkUrl)" target="_blank">
                <div class="grid-content bg-purple" @click="goodItemClick(item)">
                    <div class="itemImg-box">
                        <img @load="imgLoad" alt="" src="@/assets/img/common/courseItemBack.png" class="itemImg" />
                        <div class="itemImg-boxContantBox">
                            <p class="itemImg-box_text">{{ $t(item.name) }}</p>
                        </div>

                    </div>
                    <!-- <div class="itemTitleBack"> -->
                    <p :class="titleClass">{{ $t(item.des) }}</p>
                    <!-- </div> -->
                </div>
            </a>
        </el-col>
    </el-row>
</template>

<script>
import qs from "qs";
import { isLogin } from "@/common/utils";
export default {
    name: "Courseitem",
    data() {
        var descripHeight = "0px";
        if (document.documentElement.clientWidth > 1440) {
            descripHeight = this.$i18n.locale == "en" ? "80px" : "50px";
        } else if (document.documentElement.clientWidth <= 500) {
            descripHeight = this.$i18n.locale == "en" ? "60px" : "40px";
        } else {
            descripHeight = "270px";
        }
        return {
            titleClass: "itemTitle_en",
            descripHeight: descripHeight,
            windowWidth: document.documentElement.clientWidth, //实时屏幕宽度
            rowNum: document.documentElement.clientWidth > 1200 ? 6 : 12,
            gutterSpace: document.documentElement.clientWidth > 1200 ? 27 : 10,
            isSave: false
        };
    },
    props: {
        goods: {
            type: Array,
            default() {
                return [];
            }
        },
        isRecommend: {
            type: Boolean,
            default() {
                return false;
            }
        },
        goodsHeight: {
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
            // console.log("实时屏幕宽度：", that.windowWidth);
            that.rowNum = that.windowWidth > 1200 ? 6 : 12;
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

        this.$bus.$on("changeDescripHeight", val => {
            if (val == "navBar.chinese") {
                this.titleClass = "itemTitle"

            } else if (val == "navBar.English") {
                this.titleClass = "itemTitle_en"
            }
        });
    },
    methods: {
        itemImgClick(item) {
            // alert("dsddd");
            window.open(item.linkUrl);
            // window.location.href = item.linkUrl;
        },
        imgLoad() {
            // 发射事件总线
            this.$bus.$emit("imgLoad");
        },
        // 跳转到详情页
        goodItemClick(item) { },
        // 动态显示图片
        showImage(item) {
            // if (item.imageUrl) {
            return item.coverImgUrl;
            // }

            // return "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2Ftp06%2F2006292003305493-0-lp.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1637480196&t=7a9920bb68e5db6ab9a1dc666ae27e66";
            // return item.img || item.image || item.show.img;
        },
        showAvatar(item) {
            return "https://img2.baidu.com/it/u=1205915504,3217808836&fm=26&fmt=auto&gp=0.jpg";
        }
    }
};
</script>

<style scoped>
.el-row {
    margin-bottom: 0.25rem;
    /* &:last-child {
      margin-bottom: 0;
    } */
}

.el-col {
    margin-bottom: 0.5rem;
    border-radius: 4px;
    /* background-color: tomato; */
}

.bg-purple-dark {
    background: #99a9bf;
    border-color: lightgray;
    border-width: 0.05px;
    margin-bottom: 0.25rem;
}

.bg-purple {
    background: white;
    border-color: #99a9bf;
    /* border-width: 0.05px; */
    /* border-style: solid; */
    box-shadow: 0px 5px 12px 0px rgb(207 214 230 / 30%);
    /* box-shadow: 0px 0px 2px 2px #f1efef; */
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

.itemImg-box {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 60%;
}

.itemImg-boxContantBox {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.itemImg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 10px 10px 0px 0px;
    /* transform: scale(1);
  -ms-transform: scale(1);
  -webkit-transform: scale(1);
  -o-transform: scale(1);
  -moz-transform: scale(1); */
}

.itemImg-box_text {
    width: 100%;
    /* position: absolute; */
    /* top: 40%; */
    /* left: 0%; */
    font-size: .7rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 1rem;
    text-align: center;
}

.itemTitle {
    width: 100%;
    text-align: center;
    margin-top: .5rem;
    font-size: .45rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #111111;
    line-height: .45rem;
    margin-bottom: .5rem;
    height: auto;
    /* background-color: aqua; */

}

.itemTitle_en {
    width: 100%;
    text-align: center;
    margin-top: .5rem;
    font-size: .45rem;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #111111;
    line-height: .45rem;
    margin-bottom: .5rem;
    height: 1rem;
    /* background-color: aqua; */

}



@media screen and (-webkit-min-device-pixel-ratio: 1) and (min-width: 1200px) {

    .el-row {
        margin-bottom: 0.15rem;
        /* &:last-child {
      margin-bottom: 0;
    } */
    }

    .el-col {
        margin-bottom: 0.75rem;
        border-radius: 4px;
    }

    .bg-purple-dark {
        background: #99a9bf;
        border-color: lightgray;
        border-width: 0.05px;
        margin-bottom: 0.75rem;
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
        padding: 0 0.75rem;
        /* background-color: white; */
        /* background-color: tomato; */
    }

    .itemTitleBack {
        margin-top: 0.35rem;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        width: 100%;
        background-color: blue;
        /* justify-content: space-between; */
        /* background-color: aquamarine; */
    }

    .itemTitle {
        text-align: center;
        margin-top: .45rem;
        font-size: .4rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #111111;
        line-height: .55rem;
        margin-bottom: .525rem;
        height: auto;
    }

    .itemTitle_en {
        text-align: center;
        margin-top: .45rem;
        font-size: .4rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #111111;
        line-height: .55rem;
        margin-bottom: .525rem;
        height: auto;
    }

    .itemImg-box_text {
        width: 100%;
        /* position: absolute; */
        /* top: 40%; */
        /* left: 0%; */
        font-size: .7rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 1rem;
        text-align: center;
    }

}
</style>