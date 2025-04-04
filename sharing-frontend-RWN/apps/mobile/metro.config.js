const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// Add this to make it work with the monorepo structure
config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [path.resolve(projectRoot, "node_modules"), path.resolve(workspaceRoot, "node_modules")];

// Disable hierarchical lookup to make it work with monorepo packages
config.resolver.disableHierarchicalLookup = true;

// Add custom resolver for handling .web extensions
config.resolver.sourceExts = ["jsx", "js", "ts", "tsx", "json", "cjs"];

module.exports = withNativeWind(config, {
	input: "./global.css",
	configPath: "./tailwind.config.js",
});
