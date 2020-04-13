module.exports = {
  chainWebpack: config => {
    config.module
      .rule("meta")
      .resourceQuery(/blockType=meta/)
      .use("meta")
      .loader("./meta-loader")
      .end();
  },
};
