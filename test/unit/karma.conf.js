// This is a karma config file. For more details see
// http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
// https://github.com/webpack/karma-webpack

var webpackConfig = require('../../build/webpack.test.conf')

module.exports = function (config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    browsers: ['Firefox'],
    frameworks: ['mocha', 'sinon-chai', 'jasmine'],
    reporters: ['spec', 'coverage'],
    files: [
      './index.js'
      //  added these, but causing issues
      // '../../src/classes/*.js',
      // '../../test/**/**/*.spec.js',
      // '../../src/components/*.vue'
    ],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    plugins: [
      // launchers
      'karma-chrome-launcher',
      'karma-firefox-launcher',

      // Test libraries
      'karma-mocha',
      'karma-jasmine',
      'karma-sinon-chai',

      // preprocessors
      'karma-webpack',
      'karma-sourcemap-loader',
      // 'karma-babel-preprocessor',

      // reporters
      'karma-spec-reporter',
      'karma-coverage'
    ],
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      dir: './coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' },
        { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' }
      ]
    }
  })
}
