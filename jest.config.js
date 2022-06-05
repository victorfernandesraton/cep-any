module.exports = {
	transform: {
		"^.+\\.(t|j)sx?$": ["@swc/jest"],
	},
	testTimeout: 60 * 1000,
};
