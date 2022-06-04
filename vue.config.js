module.exports = {
  // BASE_API:"http://192.168.1.211:8886",
  productionSourceMap: false,
  publicPath: './',
  // publicPath: process.env.NODE_ENV === "production" ? "/shop" : "/",
  chainWebpack: config => {
    // 发布阶段打包入口
    config.when(process.env.NODE_ENV === "production", config => {
      config
        .entry("app")
        .clear()
        .add("./src/main-dev.js");

      // 配置cdn依赖
      config.set("externals", {
        // vue: "Vue",
        // "better-scroll": "BScroll",
        // vant: "vant"
      });

      // 是否发布模式,是
      config.plugin("html").tap(args => {
        args[0].isProd = true;
        return args;
      });
    });
    // 开发阶段打包入口
    config.when(process.env.NODE_ENV === "development", config => {
      config
        .entry("app")
        .clear()
        .add("./src/main-dev.js");
      // 是否发布模式,否
      config.plugin("html").tap(args => {
        args[0].isProd = false;
        return args;
      });
    });
  },
  configureWebpack: {
    resolve: {
      // 配置路径别名
      alias: {
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        network: "@/network",
        views: "@/views"
      }
    }
  },

  css: {
    loaderOptions: { // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    // https:true,
    proxy: {
      '/api': {
        target: 'http://192.168.1.52:8886',
        // target: "http://1.119.153.110:8886",
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
};
