const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './index.js',
    output: {
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
    }
};