module.exports = {
  "root": true,
  "env": {
    "browser": true,
    "jquery": true,
    "node": true
  },
  "extends": [
    "plugin:vue/essential",
    "eslint:recommended"
  ],
  "parserOptions": {
    "parser": "babel-eslint",
    "sourceType": "module"
  },
  "rules": {
    "no-unused-vars": "warn"
  },
  "overrides": [
    {
      "files": [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      "env": {
        "jest": true
      }
    }
  ]
}
