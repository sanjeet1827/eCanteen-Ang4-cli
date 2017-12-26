const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const helpers = require('./helpers');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const commonConfig = require('./webpack.common.js');

//const ENV = process.env.NODE_ENV = process.env.ENV = 'developement';
//const SERV = 'IIS';

const METADATA = webpackMerge(commonConfig({ env: 'developement', serv: 'IIS' }).metadata, {
    ENV: 'developement',
    SERV: 'IIS'
});

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

};

module.exports = function (options) {

    return webpackMerge(commonConfig({ env: 'developement', serv: 'IIS' }), {
        entry: {
            //'site': ['./Content/bootstrap.css', './Content/bootstrap-theme.css',
            //         './Content/ui-bootstrap-csp.css', './Content/sb-client-2.css',
            //         './Content/font-awesome.min.css', './Content/Site.css',
            //         './Content/ui-grid.css'],

            'app': './app/app.module.ts',
            //'vendors': helpers.root('')
        },
        output: {
            path: helpers.root('distLocal'),
            filename: '[name].bundle.[chunkhash].js',
            sourceMapFilename: '[name].bundle.[chunkhash].js.map',
            publicPath: ''
        },
        plugins: [
            new HtmlWebpackPlugin({
                "filename": helpers.root('/') + 'index.html',
                "hash": true,
                "inject": true,
                "compile": true,
                "minify": false,
                "cache": true,
                "showErros": true,
                "chunks": ["commons", "site", "app", "vendors"],
                "chunksSortMode": orderByList(["commons", "app", "site", "vendors"]),
                "excludeChunks": [],
                "title": "eCanteen",
                "baseUrl": "/distLocal/",
                "xhtml": true
            }),
            new webpack.optimize.CommonsChunkPlugin({
                minChunks: 2,
                name: 'commons'
            }),
            new DefinePlugin({
                'ENV': JSON.stringify(METADATA.ENV),
                'SERV': METADATA.SERV,
                'process.env': {
                    'ENV': JSON.stringify(METADATA.ENV),
                    'NODE_ENV': JSON.stringify(METADATA.ENV),
                    'SERV': METADATA.SERV
                }
            })
        ]
    });
}