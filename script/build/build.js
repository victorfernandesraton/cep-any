require("esbuild").buildSync({
	entryPoints: ["./src/index.js"],
	bundle: true,
	minify: true,
	platform: "neutral",
	target: "esnext",
	sourcemap: true,
	// target: ["chrome58", "firefox57", "safari11", "edge16"],
	outfile: "./dist/esm/index.mjs",
})