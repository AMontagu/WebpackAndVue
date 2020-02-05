module.exports = {
  lintOnSave: false,
  // publicPath: '/sub-site/',
  pages: {
    app: {
      entry: "src/main.js",
      template: "public/index.html",
      filename: "index.html",
      excludeChunks: ["app2"]
    },
    app2: {
      entry: "src2/main.js",
      template: "public/index2.html",
      filename: "index2.html",
      excludeChunks: ["app"]
    }
  },

  chainWebpack: config => {
    config.module
      .rule("i18n")
      .resourceQuery(/blockType=i18n/)
      .type("javascript/auto")
      .use("i18n")
      .loader("@kazupon/vue-i18n-loader")
      .end();
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
};
