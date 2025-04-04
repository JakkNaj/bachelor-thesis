/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}", "../../packages/shared/src/**/*.{js,jsx,ts,tsx}"],
	presets: [require("nativewind/preset")],
	theme: {
		extend: {},
	},
	plugins: [],
	important: true,
	corePlugins: {
		preflight: false,
	},
};
