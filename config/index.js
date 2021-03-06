"use strict";
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require("path");

module.exports = {
  dev: {
    // Paths
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    assetsPublicPath: "/",
    proxyTable: {
      "/api": {
        target: "https://swcloud.tjsichuang.cn:1445/api/activity", //小方
        // target:'http://192.168.1.101:9200',//王博朋
        changeOrigin: true,
        pathRewrite: {
          "^/api": "/",
        },
      },
      "/user": {
        target: "https://swcloud.tjsichuang.cn:1445/api/user", //小方
        // target:'http://192.168.1.101:8082',//王博朋
        // target: 'http://192.168.1.233:8082',//小方
        // target:'http://localhost:8082',
        changeOrigin: true,
        pathRewrite: {
          "^/user": "/",
        },
      },

      "/order": {
        //  target:'http://192.168.1.101:9097',//王博朋
        target: "http://localhost:9097",
        changeOrigin: true,
        pathRewrite: {
          "^/order": "/",
        },
      },
    },

    // Various Dev Server settings
    // host: '172.26.16.97', // can be overwritten by process.env.HOST
    host: "localhost", // can be overwritten by process.env.HOST
    port: 3000, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: "cheap-module-eval-source-map",

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true,
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, "../dist/index.html"),

    // Paths
    assetsRoot: path.resolve(__dirname, "../dist"),
    assetsSubDirectory: "static",
    assetsPublicPath: "/Master/",

    productionSourceMap: false,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: "#source-map",

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ["js", "css"],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
  },
};
