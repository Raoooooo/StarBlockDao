
import { web3ProviderUrl, getRequestBaseUrl, getRequestBaseTokenUrI, contractProviderUrl, getProdcutMode } from '../common/starBlockConfig'


// 防抖函数,解决重复频繁调用问题
export function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

function padLeftZero(str) {
  return ("00" + str).substr(str.length);
}

export function formatDateWithSp(date) {
  var date = new Date(date);
  var YY = date.getFullYear() + "-";
  var MM = (date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1) + "-";
  var DD = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  var hh = (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  var mm = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) + ":";
  var ss = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return YY + MM + DD + " " + hh + mm + ss + " ";
}
// 时间格式化
export function formatDate(date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }

  let o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds()
  };

  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + "";
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }

  return fmt;
}

// 动态改变根元素Html的fontSize
// export function changeHtmlFontSize() {
//   var html = document.documentElement; //获取到html元素
//   var hWidth = html.getBoundingClientRect().width; //获取到html的宽度
//   if (hWidth < 725) hWidth = 725; // 当hWidth大于640时，则物理分辨率小于1280（这就看设备的devicePixelRatio这个值了），应该去访问pc网站了
//   html.style.fontSize = hWidth / 7.5 + "px";
// }



/* 
 *存储 Localstorage
 */
export const setLocalStorage = (name, value) => {
  if (!name) return;
  if (typeof value !== 'string') {
    value = JSON.stringify(value);
  }
  window.localStorage.setItem(name, value)
}
/**
* 获取localStorage
*/
export const getLocalStorage = name => {
  if (!name) return;
  return window.localStorage.getItem(name)
}

/* 
* 删除LocalStorage
*/
export const removeLocalStorage = name => {
  if (!name) return;
  window.localStorage.removeItem(name)
}

export function isLogin() {
  var localLoginKey = getLocalStorage("isLogin");
  return localLoginKey;
  // if (localLoginKey == "1") {
  //   return true;
  // } else {
  //   return false;
  // }
}


export function localAccount() {
  if (!getLocalStorage("account") || getLocalStorage("account") == 'undefined') {
    return null;
  } else {
    var localAccount = getLocalStorage("account");
    return localAccount;
  }

}

export function accountChangeNotiAction() {
  this.$bus.$emit("accountChange", "1");
}

export function localSigned() {

}

export function localUserLoginObject() {

  var userLoginObjectSPrama = null;
  if (!getLocalStorage("userLoginObjectSPrama") || getLocalStorage("userLoginObjectSPrama") == 'undefined') {
    return null;
  } else {
    userLoginObjectSPrama = JSON.parse(getLocalStorage("userLoginObjectSPrama"));
    if (localAccount()) {
      // console.log("localAccount*******", localAccount());
      // console.log(userLoginObjectSPrama);
      if (userLoginObjectSPrama) {
        if (userLoginObjectSPrama.hasOwnProperty(localAccount())) {
          return JSON.stringify(userLoginObjectSPrama[localAccount()]);
        }
        return null;
      }
      return null;
    }
    return null;
  }

  return null;
  // return getLocalStorage("userLoginObject");
}


function isEmptyObject(obj) {
  for (var key in obj) {
    return false;
  }
  return true;
}


export function formatHourMinitSecondSp(date) {
  var date = new Date(date);
  return (date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds()) * 1000;
}

export function getCurrentChainId() {
  return getLocalStorage("chaiIdNum");
}



export function checkChainIdError() {
  var chainId = getCurrentChainId();
  var isError = false;
  if (getProdcutMode() == 1) {
    if (getProdcutMode() == 1 && chainId != 1) {
      isError = true;
    } else {
      isError = false;
    }
  }

  if (getProdcutMode() == 0) {
    if (getProdcutMode() == 0 && chainId != 4) {
      isError = true;
    } else {
      isError = false;
    }
  }
  return isError;
}


