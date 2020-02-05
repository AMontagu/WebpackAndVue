const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path');

module.exports = {

    entry: './src/main.js',
    module: {
        rules: [
            // ... other rules
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            // this will apply to both plain `.js` files
            // AND `<script>` blocks in `.vue` files
            {
              test: /\.js$/,
              loader: 'babel-loader'
            },
            // this will apply to both plain `.css` files
            // AND `<style>` blocks in `.vue` files
            {
              test: /\.css$/,
              use: [
                'vue-style-loader',
                'css-loader'
              ]
            },
            {
              test: /\.(png|jpe?g|gif)$/i,
              use: [
                {
                  loader: 'file-loader',
                  options: {
                    esModule: false,
                  },
                },
              ],
            },
        ]
    },
    plugins: [
        // make sure to include the plugin!
        new VueLoaderPlugin(),
        new HTMLWebpackPlugin({
            showErrors: true,
            template: path.resolve(__dirname, 'public/index.html')
        })
    ]
}