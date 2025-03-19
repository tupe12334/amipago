module.exports = {
  "*.{js,jsx,ts,tsx}": ["prettier --write", "eslint --fix --debug"],
  "*.{json,css,md}": ["prettier --write"],
};
