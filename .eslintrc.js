module.exports = {
  root: true,
  env: {
    browser: true,
    jquery: true,
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  rules: {
    // don't allow to ship with console statements unless specified
    'no-console': 1,
    // don't allow shadowing variables
    'no-shadow': 1,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    // allow no-undef's to fix jQuery selectors
    'no-undef': 0,
    // enforce dot notation where possible
    'dot-notation': 1,
    // make sure vars are placed on top of their scope
    'vars-on-top': 2
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
