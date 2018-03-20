var webpackMerge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var commonConfig = require('./webpack.common.js');
var helpers = require('./helpers');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var orderByList = function (list) {
    return function (chunk1, chunk2) {
        var index1 = list.indexOf(chunk1.names[0]);
        var index2 = list.indexOf(chunk2.names[0]);
        if (index2 == -1 || index1 < index2) {
            return -1;
        }
        if (index1 == -1 || index1 > index2) {
            return 1;
        }
        return 0;
    }
}

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-eval-source-map',

    output: {
        path: helpers.root('distLocal'),
        publicPath: 'http://localhost:8080/',
        filename: '[name].bundle.js',
        chunkFilename: '[id].bundle.chunk.js'
    },

    plugins: [
      new ExtractTextPlugin('[name].css'),
      new HtmlWebpackPlugin({
          "template": helpers.root('/') + 'index.ejs',
          "filename": helpers.root('/') + 'index.html',
          "hash": true,
          "inject": true,
          "compile": true,
          "minify": false,
          "cache": true,
          "showErrors": true,
          "chunks": ["polyfills", "commons", "bootstrap", "bootstrap-theme", "font-awesome", "Site", "ui-grid", "vendor", "app"],
          "chunksSortMode": orderByList(["polyfills", "commons", "vendor", "app"]),
          "excludeChunks": [],
          "title": "e-Canteen",
          "baseUrl":"/",
          "xhtml": true

      })
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
});
