module.exports = {
  root: true,
  extends: "@react-native-community",
  rules: {
    quotes: ["error", "double"],
    "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
    "no-shadow": "off",
  },
};
