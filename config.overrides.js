const webpack = require("webpack");

module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    timers: require.resolve("timers-browserify"),
  };
  return config;
};
