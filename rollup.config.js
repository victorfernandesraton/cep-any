export default [
	{	input: "src/index.js",
		output: {
			file: "dist/cjs/index.js",
			format: "cjs"
		}},
	{
		input: "src/index.js",
		output: {
			file: "dist/esm/index.mjs",
			format: "esm"
		}
	}
]