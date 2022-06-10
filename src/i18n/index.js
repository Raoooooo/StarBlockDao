
import Vue from "vue"
import VueI18n from "vue-i18n"
import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import enLocale from './config/en'
import zhLocale from './config/zh'
import locale from 'element-ui/lib/locale'
// import Cookies from 'js-cookie'
Vue.use(VueI18n)//注入到所有的子组件


const messages = {
    en: {
        ...enLocale,
        ...elementEnLocale
    },
    zh: {
        ...zhLocale,
        ...elementZhLocale
    }
}
var langType = navigator.language;
var defaultLocale = "en";
// alert(langType);
console.log("navigator.language*******", navigator.language);
// alert(langType);
// alert(navigator.languages);

// if (localStorage.getItem('lang')) {
//     defaultLocale = localStorage.getItem('lang');
// } else {
console.log("langType****", langType);
// if (langType == "en") {
//     defaultLocale = "en";
// } else if (langType.startsWith("zh")) {
//     defaultLocale = "zh";
// } else {
//     defaultLocale = "en";
// }

// defaultLocale = "zh";
// defaultLocale = "en";
// }

const i18n = new VueI18n({
    locale: defaultLocale,
    // locale: localStorage.getItem('lang') || "zh",
    messages
})

locale.i18n((key, value) => i18n.t(key, value));
export default i18n;

//require.context(path，deep，regExp)
//有3个方法 分别是keys() 


// let langFileds = require.context('./config', false, /\.js$/)

// let regExp = /\.\/([^\.\/]+)\.([^\.]+)$/ //正则用于匹配 ./en.js中的'en'

// // regExp.exec('./en.js')

// let messages = {} //声明一个数据模型，对应i18n中的message属性

// langFileds.keys().forEach(key => {
//     let prop = regExp.exec(key)[1] //正则匹配en|zh这样的值
//     //messages[prop]相当于 messages['en'] = {table:{...}}
//     messages[prop] = langFileds(key).default

// })


// console.log(messages);
// console.log(langFileds('./en.js'));

// // let locale = 'en'
// let locale = localStorage.getItem('lang') || "zh" //从localstorag中获取

// export default new VueI18n({
//     legacy: true,
//     globalInjection: true,
//     locale,//指定语言字段
//     messages//定义语言字段
// })