var path = require('path');
var webpack = require('webpack');

var webpackConfigDev = require('./webpack.config.js');
var webpackConfigKarma = {
  resolve: webpackConfigDev.resolve,
  cache: true,
  watch: true,
  debug: true,
  devtool: 'inline-source-map',
  module: {
    postLoaders: [
      { // << add subject as webpack's postloader
        test: /\.js$/,
        exclude: /(node_modules|_spec)/,
        loader: 'istanbul-instrumenter'
      }
    ]
  }
};

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: [
      'mocha',
      'chai'
    ],

    // list of files / patterns to load in the browser
    files: [
      'src/**/*_spec.js'
    ],

    // list of files to exclude
    exclude: [],

    // optionally, configure the reporter
    coverageReporter: {
      reporters: [
        {type: 'html', dir: 'coverage/'},
        {type: 'text-summary'}
      ]
    },

    webpack: webpackConfigKarma,

    webpackMiddleware: {
      // webpack-dev-middleware configuration
      // i. e.
      noInfo: true
    },

    plugins: [
      require("karma-sourcemap-loader"),
      require("karma-webpack"),
      require("karma-mocha"),
      require("karma-coverage"),
      require("karma-phantomjs-launcher"),
      require("karma-chai")
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/**/*_spec.js': [
        'webpack',
        'sourcemap'
      ]
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: [
      'progress',
      'coverage'
    ],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_WARN,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
