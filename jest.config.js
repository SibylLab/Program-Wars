module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,vue}',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/coverage/**',
    '!**/router/**',
    '!**/*.config.*',
    '!**/main.js'],
  coverageReporters: ['html', 'text-summary', 'lcov']
}
