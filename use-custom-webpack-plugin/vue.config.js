const CustomWebpackPlugin = require("simple-webpack-plugin")

module.exports = {
  configureWebpack: {
    plugins: [
      new CustomWebpackPlugin()
    ]
  }
};
