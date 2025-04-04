module.exports = function (api) {
	api.cache(true);
	return {
		presets: [
			["@babel/preset-env", { targets: { node: "current" } }],
			"@babel/preset-typescript",
			[
				"module:metro-react-native-babel-preset",
				{
					jsxImportSource: "nativewind",
				},
			],
		],
		plugins: ["nativewind/babel"],
	};
};
