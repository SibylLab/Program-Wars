// This is a karma config file. For more details see
// http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
// https://github.com/webpack/karma-webpack

var webpackConfig = require('../../build/webpack.test.conf')
module.exports = function (config) {
  config.set({
    browsers: ['Firefox'],
    frameworks: ['mocha', 'sinon-chai', 'jasmine'],
    reporters: ['spec', 'coverage', 'coveralls'],
    files: [
      './index.js'
    ],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-mocha',
      'karma-jasmine',
      'karma-sinon-chai',
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-spec-reporter',
      'karma-coverage',
      'karma-coveralls'
    ],
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    },
    coverageReporter: {
      dir: '../../coverage',
      reporters: [
        { type: 'lcov', subdir: '.' },
        { type: 'text-summary' },
        { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' }
      ]
    }
  })
}
