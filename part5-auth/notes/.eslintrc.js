module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
    "cypress/globals": true
  },
  extends: [
    'standard',
    'plugin:react/recommended',
    "plugin:cypress/recommended"
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react', 'jest', 'cypress'
  ],
  rules: {
    'indent': ['error', 2],
    "linebreak-style": ["error", "unix"],
    "quotes": ["error", "single"],
    "semi": ["error", "never"],
    "eqeqeq": "error",
    "no-trailing-spaces": "error",
    "object-curly-spacing": ["error", "always"],
    "arrow-spacing": ["error", { "before": true, "after": true }],
    'react/react-in-jsx-scope': 'off',
    "no-console": 0,
    "react/prop-types": 0,
    "react/react-in-jsx-scope": "off",
    'react/jsx-uses-react': 'off',
    'react/display-name': 'off'
  }
}
