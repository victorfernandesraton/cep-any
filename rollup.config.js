import swc from "rollup-plugin-swc"

export default [
	{
		input: "src/index.js",
		output: {
			file: "dist/cjs/index.js",
			format: "cjs"
		},
		// plugins: [
		// 	swc({
		// 		"jsc": {
		// 			"target": "es2022",
		// 			"parser": {
		// 				"syntax": "ecmascript",
		// 				"decorators": false,
		// 				"importAssertions": true,
		// 				"dynamicImport": true,
		// 				"exportNamespaceFrom": false
		// 			},
		// 			"keepClassNames": true,
		// 			"loose": true
		// 		},
		// 		"module": {
		// 			"strict": true,
		// 			"strictMode": true,
		// 			"type": "commonjs",
		// 			"noInterop": true,
		// 			"lazy": true,
		// 			"ignoreDynamic": true
		// 		},
		// 		"minify": false,
		// 		"env": {
		// 			"targets": {
		// 				"chrome": "86",
		// 				"firefox": "86",
		// 				"node": "16"
		// 			},
		// 			"mode": "usage",
		// 			"coreJs": 3.12
		// 		},
		// 		"isModule": true
		// 	})
		// ]
	},
	{
		input: "src/index.js",
		output: {
			file: "dist/esm/index.mjs",
			format: "esm"
		},
		// plugins: [
		// 	swc({
		// 		"jsc": {
		// 			"target": "es2022",
		// 			"parser": {
		// 				"syntax": "ecmascript",
		// 				"decorators": false,
		// 				"importAssertions": true,
		// 				"dynamicImport": true,
		// 				"exportNamespaceFrom": false
		// 			},
		// 			"keepClassNames": true,
		// 			"loose": true
		// 		},
		// 		"module": {
		// 			"strict": true,
		// 			"strictMode": true,
		// 			"type": "es6",
		// 			"noInterop": true,
		// 			"lazy": true,
		// 			"ignoreDynamic": true
		// 		},
		// 		"minify": false,
		// 		"env": {
		// 			"targets": {
		// 				"chrome": "86",
		// 				"firefox": "86",
		// 				"node": "16"
		// 			},
		// 			"mode": "usage",
		// 			"coreJs": 3.12
		// 		},
		// 		"isModule": true
		// 	})
		// ]
	}
]