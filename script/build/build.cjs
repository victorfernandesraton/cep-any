require("esbuild").buildSync({
	entryPoints: ["./src/index.js"],
	bundle: true,
	minify: true,
	platform: "node",
	sourcemap: true,
	target: ["node10.4"],
	outfile: "./dist/cjs/index.js",
})