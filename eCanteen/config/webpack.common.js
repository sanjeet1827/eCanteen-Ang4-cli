var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var helpers = require('./helpers');

module.exports = {
    entry: {
        'polyfills': './polyfills.ts',
        'vendor': helpers.root('app/vendor.ts'),
        'app': helpers.root('app/main.ts'),
        'bootstrap': './content/bootstrap.css',
        'bootstrap-theme': './content/bootstrap-theme.css',
        'font-awesome': './content/font-awesome.min.css',
        'Site': './content/Site.css',
        'ui-grid': './content/ui-grid.css'
    },

    resolve: {
        extensions: ['.ts', '.js', '.jpeg', '.jpg', '.png', '.gif', '.css']
    },

    module: {
        rules: [
          {
              test: /\.ts$/,
              loaders: [
                {
                    loader: 'awesome-typescript-loader',
                    options: { configFileName: helpers.root('.', 'tsconfig.json') }
                }, 'angular2-template-loader'
              ]
          },
          {
              test: /\.html$/,
              loader: 'html-loader'
          },
          {
              test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
              loader: 'file-loader?name=assets/[name].[hash].[ext]'
          },
          {
              test: /\.css$/,
              use: ExtractTextPlugin.extract({
                  fallback: 'style-loader',
                  loader: [{
                      loader: 'css-loader',
                      options: {sourceMap:true,importLoaders:1}
                  },
                  {
                      loader: 'postcss-loader',
                      options: {
                          plugins: (loader) =>[
                            require('autoprefixer'),
                          ]
                      }
                  }
                  ]
              })
          },
          
        ]
    },

    plugins: [
      // Workaround for angular/angular#11580
      new webpack.ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        helpers.root('./src'), // location of your src
        {} // a map of your routes
      ),

      new webpack.optimize.CommonsChunkPlugin({
          //name: ['app', 'vendor', 'polyfills']
          minChunks:2,
          name: 'commons'
      }),

      new HtmlWebpackPlugin({
          template: 'index.html',
          chunksSortMode: 'dependency'
      }),

      new ExtractTextPlugin('[name].bundle.[chunkhash].css'),
      new OptimizeCssAssetsPlugin({
          assetNameRegExp: /^.*.css$/g,
          cssProcessor: require('cssnano'),
          cssProcessorOptions: { discardComments: { removeAll: true } },
          canPrint:true
      })
    ]
};
