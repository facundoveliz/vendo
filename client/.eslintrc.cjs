module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "airbnb"],
  root: true,
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/jsx-filename-extension": [0],
    // disables error with _id
    "no-underscore-dangle": [0],
    "react/jsx-props-no-spreading": "off",
    // TODO: remove this
    "react/prop-types": [0],
    // FIX: fix this (remove images inside a li)
    "jsx-a11y/click-events-have-key-events": [0],
    // same as before
    "jsx-a11y/no-noninteractive-element-interactions": [0],
  },
};
