require("esbuild").buildSync({
	entryPoints: ["./src/index.js"],
	bundle: true,
	minify: true,
	platform: "neutral",
	sourcemap: false,
	outfile: "./dist/esm/index.mjs",
})