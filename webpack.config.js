const path = require("path");

module.exports = {
	entry: ["./dist/web/index.js"],
	mode: "production",
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
		],
	},
	resolve: {
		extensions: [".js"],
	},
	output: {
		library: "cep",
		libraryTarget: "umd",
		filename: "./bundle.js",
		path: path.resolve(__dirname, "dist/web"),
	},
};
