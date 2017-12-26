const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const helpers = require('./helpers');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const OptimizeCssAssestPlugin = require('optimize-css-assets-webpack-plugin');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');

module.exports = function (options) {
    isProd = options.env === "production";
    isDev = options.env === "developement";

    const config = {
        resolve: {
            extensions: ['.ts', '.js', '.jpg', '.jpeg', '.png', '.gif', '.css'],
            alias: {
                "app":helpers.root("app")
            }
        },
        module: {
            rules: [
                {
                    test: /\.(jpg|png|gif)$/,
                    use:"file-loader?name=assests/[name].[]hasg:20].[ext]"+(isDev?'':'&publicPath=../')
                },
                {
                    test: /\.css$/,
                    use: ExtractTextPlugin.extract({
                        fallback: 'style-loader',
                        use:['css-loader']
                        //loader: [{
                        //    loader: 'css-loader',
                        //    options:{sourceMap:true,importLoaders:1}
                        //},
                        //{
                        //    loader:'postcss-loader?sourceMap'
                        //}]
                    })
                },
                {
                    test: /\.tsx$/,
                    use: 'awesome-typescript-loader',
                    exclude:[/node_modules/,/\.(spec|e2e)\.ts$/]
                },
                {
                    test: /\.html$/,
                    use: [{
                        loader:'text-loader'
                    }]
                },
                {
                    test: require.resolve("jquery"),
                    use:"expose-loader?$!expose-loader?JQuery"
                }
            ]
        },
        devtool: '#source-map',
        plugins: [
            new CleanWebpackPlugin(['distLocal', 'distProd'], {
                root: helpers.root(),
                verbose: true,
                dry: false,
                exclude:[]
            }),
            new webpack.ProvidePlugin({
                '$':'jquery',
                'JQuery': 'jquery',
                'window.JQuery': 'jquery',
                'require':'require'
            }),
            new ExtractTextPlugin('[name].bundle.[chunkhash].css'),
            new OptimizeCssAssestPlugin({
                assetNameRegExp: /^.*.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorOptions: { discardComments: { removeAll: true } },
                canPrint:true
            })
        ]

    }

    return config;
};
