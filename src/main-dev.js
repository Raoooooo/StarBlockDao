import Vue from "vue";
import "./common/utils";

// 全局引入vant
// import "vant/lib/index.css";
// 全局引入样式
import "./assets/css/base.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios"
// 全局引入懒加载
import VueLazyLoad from 'vue-lazyload'; // 懒加载

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import elment from 'element-ui/lib/locale/lang/zh-CN'
import enLocale from 'element-ui/lib/locale/lang/en'
import i18n from "./i18n"
import 'view-design/dist/styles/iview.css';
import VueClipboard from "vue-clipboard2";

import { Dropdown, DropdownMenu, DropdownItem, Tag, Table } from 'view-design';

Vue.config.productionTip = true;

Vue.use(VueClipboard);

Vue.component('Dropdown', Dropdown);
Vue.component('DropdownMenu', DropdownMenu);
Vue.component('DropdownItem', DropdownItem);
Vue.component('Table', Table);
Vue.component('Tag', Tag);
// 全局实例化$bus事件总线
Vue.prototype.$bus = new Vue();

Vue.use(ElementUI);
Vue.use(ElementUI, { enLocale });
Vue.use(VueLazyLoad, {

});

Vue.prototype.$axios = axios;
// axios.defaults.baseURL = "/api";

axios.defaults.baseURL = "";

axios.interceptors.request.use(

  config => {
    if (config) {
      console.log('config************', config);
    }
    // if (config.url.match('user/updataIcon') || config.url.match("/nft/create/uploadImage")) {
    //   config["content-type"] = "multipart/form-data";
    //   config.headers["Accept"] = "application/json, text/plain,image/jpeg, */*";
    // }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)


axios.interceptors.response.use(
  res => {
    if (res.data.code == 401) {

    }
    return res;
  },
  err => {
    // Toast.clear();
    return Promise.reject(err);
  }
);
new Vue({

  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
