module.exports = {
  root: true,
  plugins: ["react-hooks"],
  extends: "@react-native-community",
  rules: {
    quotes: ["error", "double"],
    "no-unused-vars": ["error", { "vars": "all", "args": "after-used", "ignoreRestSiblings": false }],
    "no-shadow": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
};
