require("esbuild").buildSync({
	entryPoints: ["./src/index.js"],
	bundle: true,
	minify: true,
	platform: "node",
	sourcemap: false,
	target: ["node18"],
	outfile: "./dist/cjs/index.js",
})