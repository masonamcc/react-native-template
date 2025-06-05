const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// This is the key line to add or ensure is present and set to false
config.resolver.unstable_enablePackageExports = false;

module.exports = config;