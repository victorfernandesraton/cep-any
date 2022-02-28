const path = require("path");

module.exports = {
	entry: ["./src/index.ts"],
	mode: "production",
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
		],
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	output: {
		library: "cep",
		libraryTarget: "umd",
		filename: "./bundle.js",
		path: path.resolve(__dirname, "lib"),
	},
};
