var webpackConfig = require('./config/webpack.test');

module.exports = function (config) {
  var _config = {
    basePath: '',

    frameworks: ['jasmine'],

    files: [
      {pattern: './config/main.test.js', watched: false}
    ],

    preprocessors: {
        './config/main.test.js': ['webpack', 'sourcemap', 'coverage'],
    },

    webpack: webpackConfig,

    webpackMiddleware: {
      stats: 'errors-only'
    },

    webpackServer: {
      noInfo: true
    },

    reporters: ['progress', 'html', 'coverage'],
    
    coverageReporter : {
        type : 'html',
        dir : 'coverage/'
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['Chrome'],
    singleRun: true
  };

  config.set(_config);
};