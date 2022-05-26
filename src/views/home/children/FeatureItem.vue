<template>
  <el-row :gutter="gutterSpace" class="row-bg">
    <el-col v-for="(item, index) in goods" :span="rowNum">
      <!-- <a :href="item.linkUrl" target="_blank"> -->
      <div class="grid-content bg-purple" @click="goodItemClick(item)">
        <!-- <div class="itemImg-box"> -->
        <div class="contantBox">
          <img @load="imgLoad" alt="" v-lazy="showImage(item)" class="itemImg" />
          <!-- </div> -->
          <div class="itemTitleBack">
            <p class="itemTitle">{{ $t(item.name) }}</p>
          </div>
          <!-- <p class="descrip" v-bind:style="{ height: descripHeight }">{{ $t(item.des) }}</p> -->
          <p class="descrip">{{ $t(item.des) }}</p>
        </div>
      </div>
      <!-- </a> -->
    </el-col>
  </el-row>
</template>

<script>
import qs from "qs";
import { isLogin } from "@/common/utils";
export default {
  name: "Featureitem",
  created() {
    // alert(document.documentElement.clientWidth);
  },
  data() {
    var descripHeight = "0px";
    if (document.documentElement.clientWidth > 1200) {
      descripHeight = this.$i18n.locale == "en" ? "160px" : "95px";
    } else if (document.documentElement.clientWidth <= 500) {
      descripHeight = this.$i18n.locale == "en" ? "110px" : "80px";
    } else {
      descripHeight = "270px";
    }
    return {
      descripHeight: descripHeight,
      windowWidth: document.documentElement.clientWidth, //实时屏幕宽度
      rowNum: document.documentElement.clientWidth > 1200 ? 6 : 24,
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
      } else if (val == "navBar.English") {
      }
      console.log(val);
      if (document.documentElement.clientWidth > 1200) {
        this.descripHeight = val == "navBar.English" ? "190px" : "130px";
      } else if (document.documentElement.clientWidth <= 500) {
        this.descripHeight = val == "navBar.English" ? "120px" : "80px";
      } else {
        this.descripHeight = val == "navBar.English" ? "270px" : "200px";
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
    goodItemClick(item) {},
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
  box-shadow: 0px 4px 13px 1px #f2f4f6;
  border: 1px solid rgba(238, 238, 238, 0.87);

  /* box-shadow: 0px 5px 12px 0px rgb(207 214 230 / 30%); */
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

.contantBox {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.itemImg-box {
  position: relative;
  width: 100%;
  height: 0;
  padding-top: 1.75rem;
}
.itemImg {
  /* margin-left: 0.25rem; */
  margin-top: 0.75rem;
  /* position: absolute; */
  width: 1.5rem;
  height: 1.5rem;
  /* width: 100%; */
  /* height: 100%; */
  /* border-radius: 10px 10px 0px 0px; */
  /* transform: scale(1);
  -ms-transform: scale(1);
  -webkit-transform: scale(1);
  -o-transform: scale(1);
  -moz-transform: scale(1); */
}

.itemTitle {
  margin-top: 0.5rem;
  font-size: 0.75rem;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #2d1500;
  line-height: 0.75rem;
}

.lookCount {
  font-size: 0.25rem;
  color: #666;
  margin-right: 0.15rem;
}

.descrip {
  margin-top: 0.25rem;
  font-size: 0.6rem;
  margin-left: 0.5rem;
  margin-right: 0.5rem;
  color: #666;
  line-height: 0.95rem;
  margin-bottom: 0.5rem;
  /* height: 2.625rem; */
  overflow: hidden;
  /* overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  height: 2.5rem; */
}

@media screen and (-webkit-min-device-pixel-ratio: 1) and (min-width: 1000px) {
  .el-row {
    margin-bottom: 0.75rem;
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
    flex-direction: column;
    align-items: center;
    width: 100%;
    /* justify-content: space-between; */
    /* background-color: aquamarine; */
  }
  .itemTitle {
    margin-top: 0rem;
    font-size: 0.45rem;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #2d1500;
    line-height: 0.45rem;
  }

  .lookCount {
    font-size: 0.35rem;
    color: #666;
    margin-right: 0.45rem;
  }
  .descrip {
    margin-top: 0.375rem;
    font-size: 0.4rem;
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    /* text-align: center; */
    color: #8c9399;

    /* overflow: hidden; */
    /* text-overflow: ellipsis; */
    /* display: -webkit-box; */
    line-height: 0.75rem;
    /* -webkit-line-clamp: 4; */
    /* -webkit-box-orient: vertical; */
    margin-bottom: 0.35rem;
    /* height: 3.65rem; */
    font-weight: 400;
    /* height: 5.25rem; */
    overflow: hidden;
  }

  .itemImg {
    /* margin-left: 0.5rem; */
    margin-top: 0.875rem;
    /* position: absolute; */
    width: 1.25rem;
    height: 1.25rem;
    /* width: 100%; */
    /* height: 100%; */
    /* border-radius: 10px 10px 0px 0px; */
    /* transform: scale(1);
  -ms-transform: scale(1);
  -webkit-transform: scale(1);
  -o-transform: scale(1);
  -moz-transform: scale(1); */
  }
}
</style>