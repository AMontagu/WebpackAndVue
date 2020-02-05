const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: "umd",
        filename: "bundle.webpack.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['@babel/preset-env']
                }
            }
        ]
    },
    plugins: [
      new CopyPlugin([
        { from: 'vue-bg.jpg', to: 'assets/img' },
      ]),
    ],
};