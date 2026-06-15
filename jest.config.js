module.exports = {
  testEnvironment: 'jsdom',
  // Resolve the Node (CJS) build of packages like @vue/test-utils instead of
  // their browser build, which expects a global `Vue` and breaks under jsdom.
  testEnvironmentOptions: {
    customExportConditions: ['node', 'node-addons'],
  },
  transform: {
    '^.+\.vue$': ['@vue/vue3-jest', { compilerOptions: { compatConfig: { MODE: 3 } } }],
    '^.+\\.[jt]sx?$': ['babel-jest', { configFile: './babel.config.js' }],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  // Include 'vue' so extensionless imports of .vue single-file components resolve.
  moduleFileExtensions: ['js', 'mjs', 'cjs', 'jsx', 'json', 'vue', 'node'],
  transformIgnorePatterns: ['/node_modules/(?!(uuid)/)'],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,vue}',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/docs/**',
    '!**/coverage/**',
    '!**/router/**',
    '!**/*.config.*',
    '!**/main.js'],
  coverageReporters: ['html', 'text-summary', 'lcov']
}
