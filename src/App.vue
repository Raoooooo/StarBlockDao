<template>
  <div id="app" ref="app" class="container">
    <keep-alive>
      <!-- <transition name="fade"> -->
      <router-view class="content" v-if="$route.meta.keepAlive" :key="$route.query.t"></router-view>
      <!-- </transition> -->
    </keep-alive>
    <transition name="fade">
      <router-view class="content" v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <nav-bar v-if="!isShowMobile"></nav-bar>
    <nav-bar-mobile v-if="isShowMobile"></nav-bar-mobile>
  </div>
</template>

<script>
import NavBar from "@/views/home/children/NavBar.vue";
import NavBarMobile from "@/views/home/children/NavBarMobile.vue";

export default {
  name: "app",
  components: {
    NavBar,
    NavBarMobile
    // TabBar
  },
  mounted() {
    var that = this;
    this.$bus.$on("isShowMobileNoti", val => {
      that.isShowMobile = val;
    });
  },
  data() {
    return {
      windowWidth: document.documentElement.clientWidth, //实时屏幕宽度
      screenWidth: document.body.clientWidth,
      isShowMobile: document.documentElement.clientWidth > 750 ? false : true
    };
  },
  methods: {
    getCurrentTime() {
      var date = new Date(date);
      return Number(date.getSeconds()) * 1000;
    }
  },
  // watch: {
  //   $route(to, from) {
  //     this.$router.go(0);
  //   }
  // },
  created() {
    var html = document.documentElement; //获取到html元素
    var hWidth = document.documentElement.clientWidth; //获取到html的宽度
    // 当hWidth大于640时，则物理分辨率小于1280（这就看设备的devicePixelRatio这个值了），应该去访问pc网站了
    // alert(hWidth);
    if (hWidth <= 750) {
      //   hWidth = 1000;

      //   html.style.fontSize = hWidth / 7.5 + "px";
      // html.style.fontSize = hWidth / 75 + "px";
      //  html.style.fontSize = 40+ "px";
      html.style.fontSize = (40.0 * hWidth) / 750 + "px";
    }
    if (hWidth > 750) {
      //   hWidth = 2000;
      //   html.style.fontSize = hWidth / 15 + "px";
      html.style.fontSize = (40.0 * hWidth) / 1920 + "px";
      // html.style.fontSize = 40 + "px";
    }
  }
};
</script>

<style scoped>
.content {
  /* position: absolute; */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #f7faff;
  /* position: absolute; */
}
#app {
  /* position: absolute; */
  /* padding-top: 0.9rem; */
  background-color: #f7faff;
  /* overflow-x: hidden; */
  font-size: 40px;
  /* overflow-x: auto; */
  width: 100%;
  height: 100%;
  background-color: #f7faff;
  /* position: relative; */
}

.container {
  /* position: absolute; */
  /* padding-top: 0.9rem; */
  font-size: 40px;
  /* overflow-x: hidden; */
  width: 100%;
  height: 100%;
  background-color: #f7faff;
  /* overflow-x: hidden; */
  /* position: relative; */
}

img {
  display: block;
  margin: 0 auto;
}
input[type="file"] {
  outline: none;
  margin-top: 20px;
}
* {
  margin: 0;
  padding: 0;
}
#clip_button {
  position: absolute;
  right: 10%;
  bottom: 20px;
  width: 80px;
  height: 40px;
  border: none;
  border-radius: 2px;
  background: #1aad19;
  color: #fff;
}
#cancel_clip {
  position: absolute;
  left: 10%;
  bottom: 20px;
  width: 80px;
  height: 40px;
  border: none;
  border-radius: 2px;
  color: #fff;
  background: #e64340;
}
#clip_container.container {
  z-index: 99;
  position: fixed;
  padding-top: 60px;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 1);
}
#clip_container.container > div {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
#clip_image {
  max-width: 100%;
}

.cropper-container {
  font-size: 0;
  line-height: 0;
  position: relative;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  direction: ltr;
  -ms-touch-action: none;
  touch-action: none;
}
.crop_loading,
.crop_success {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
}
.crop_loading .crop_content {
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  background: #000;
  opacity: 0.9;
  height: 100px;
  width: 100px;
  vertical-align: middle;
  color: #fff;
  padding-top: 20px;
  font-size: 16px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.crop_loading .crop_content img {
  margin-top: 15px;
  margin-bottom: 10px;
}
.crop_success .crop_success_text {
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  background: #000;
  opacity: 0.9;
  width: 120px;
  height: 30px;
  color: #fff;
  line-height: 30px;
  font-size: 16px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}
.cropper-container img {
  /* Avoid margin top issue (Occur only when margin-top <= -height) */
  display: block;
  min-width: 0 !important;
  max-width: none !important;
  min-height: 0 !important;
  max-height: none !important;
  width: 100%;
  height: 100%;
  image-orientation: 0deg;
}

.cropper-wrap-box,
.cropper-canvas,
.cropper-drag-box,
.cropper-crop-box,
.cropper-modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}

.cropper-wrap-box {
  overflow: hidden;
}

.cropper-drag-box {
  opacity: 0;
  background-color: #fff;
}

.cropper-modal {
  opacity: 0.5;
  background-color: #000;
}

.cropper-view-box {
  display: block;
  overflow: hidden;

  width: 100%;
  height: 100%;

  outline: 1px solid #39f;
  outline-color: rgba(51, 153, 255, 0.75);
}

.cropper-dashed {
  position: absolute;

  display: block;

  opacity: 0.5;
  border: 0 dashed #eee;
}

.cropper-dashed.dashed-h {
  top: 33.33333%;
  left: 0;
  width: 100%;
  height: 33.33333%;
  border-top-width: 1px;
  border-bottom-width: 1px;
}

.cropper-dashed.dashed-v {
  top: 0;
  left: 33.33333%;
  width: 33.33333%;
  height: 100%;
  border-right-width: 1px;
  border-left-width: 1px;
}

.cropper-center {
  position: absolute;
  top: 50%;
  left: 50%;

  display: block;

  width: 0;
  height: 0;

  opacity: 0.75;
}

.cropper-center:before,
.cropper-center:after {
  position: absolute;
  display: block;
  content: " ";
  background-color: #eee;
}

.cropper-center:before {
  top: 0;
  left: -3px;
  width: 7px;
  height: 1px;
}

.cropper-center:after {
  top: -3px;
  left: 0;
  width: 1px;
  height: 7px;
}

.cropper-face,
.cropper-line,
.cropper-point {
  position: absolute;

  display: block;

  width: 100%;
  height: 100%;

  opacity: 0.1;
}

.cropper-face {
  top: 0;
  left: 0;

  background-color: #fff;
}

.cropper-line {
  background-color: #39f;
}

.cropper-line.line-e {
  top: 0;
  right: -3px;
  width: 5px;
  cursor: e-resize;
}

.cropper-line.line-n {
  top: -3px;
  left: 0;
  height: 5px;
  cursor: n-resize;
}

.cropper-line.line-w {
  top: 0;
  left: -3px;
  width: 5px;
  cursor: w-resize;
}

.cropper-line.line-s {
  bottom: -3px;
  left: 0;
  height: 5px;
  cursor: s-resize;
}

.cropper-point {
  width: 5px;
  height: 5px;

  opacity: 0.75;
  background-color: #39f;
}

.cropper-point.point-e {
  top: 50%;
  right: -3px;
  margin-top: -3px;
  cursor: e-resize;
}

.cropper-point.point-n {
  top: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: n-resize;
}

.cropper-point.point-w {
  top: 50%;
  left: -3px;
  margin-top: -3px;
  cursor: w-resize;
}

.cropper-point.point-s {
  bottom: -3px;
  left: 50%;
  margin-left: -3px;
  cursor: s-resize;
}

.cropper-point.point-ne {
  top: -3px;
  right: -3px;
  cursor: ne-resize;
}

.cropper-point.point-nw {
  top: -3px;
  left: -3px;
  cursor: nw-resize;
}

.cropper-point.point-sw {
  bottom: -3px;
  left: -3px;
  cursor: sw-resize;
}

.cropper-point.point-se {
  right: -3px;
  bottom: -3px;
  width: 20px;
  height: 20px;
  cursor: se-resize;
  opacity: 1;
}

@media (min-width: 768px) {
  .cropper-point.point-se {
    width: 15px;
    height: 15px;
  }
}

@media (min-width: 992px) {
  .cropper-point.point-se {
    width: 10px;
    height: 10px;
  }
}

@media (min-width: 1200px) {
  .cropper-point.point-se {
    width: 5px;
    height: 5px;
    opacity: 0.75;
  }
}

.cropper-point.point-se:before {
  position: absolute;
  right: -50%;
  bottom: -50%;
  display: block;
  width: 200%;
  height: 200%;
  content: " ";
  opacity: 0;
  background-color: #39f;
}

.cropper-invisible {
  opacity: 0;
}

.cropper-bg {
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC");
}

.cropper-hide {
  position: absolute;

  display: block;

  width: 0;
  height: 0;
}

.cropper-hidden {
  display: none !important;
}

.cropper-move {
  cursor: move;
}

.cropper-crop {
  cursor: crosshair;
}

.cropper-disabled .cropper-drag-box,
.cropper-disabled .cropper-face,
.cropper-disabled .cropper-line,
.cropper-disabled .cropper-point {
  cursor: not-allowed;
}
</style>