module.exports = {
	presets: [["@babel/preset-env", { targets: "defaults" }], "@babel/preset-typescript", "@babel/preset-react"],
	plugins: [["nativewind/babel", { mode: "web" }]],
};
