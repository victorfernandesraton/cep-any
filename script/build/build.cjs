// eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
require('esbuild').buildSync({
	chunkNames: 'chunks/[name]-[hash]',
	entryPoints: ['./src/index.ts'],
	bundle: true,
	minify: true,
	platform: 'node',
	sourcemap: false,
	target: ['node18'],
	outfile: './dist/cjs/index.js',
})