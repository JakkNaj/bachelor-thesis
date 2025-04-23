// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const CompressionPlugin = require('compression-webpack-plugin');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Enable minification with Terser
config.transformer.minifierConfig = {
  compress: {
    drop_console: true,
    passes: 2,
    reduce_vars: true,
    pure_getters: true,
    collapse_vars: true,
    keep_fargs: false,
    unused: true,
    dead_code: true,
    global_defs: {
      __DEV__: false
    }
  },
  mangle: true,
};

// Enable tree shaking
config.resolver.unstable_enablePackageExports = true;
config.resolver.unstable_enableTransformCache = true;
config.resolver.unstable_disableSymlinks = true;

module.exports = config;
