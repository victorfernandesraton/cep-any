/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	extensionsToTreatAsEsm: [".ts"],
	globals: {
		"ts-jest": {
			useESM: true,
		},
	},
	moduleNameMapper: {
		"^(\\.{1,2}/.*)\\.js$": "$1",
	},
	preset: "ts-jest",
	testEnvironment: "node",
	roots: ["./test/"],

	testTimeout: 1000000,
	slowTestThreshold: 20,
};
