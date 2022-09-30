// eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
require('esbuild').buildSync({
	entryPoints: ['./src/index.ts'],
	bundle: true,
	minify: true,
	platform: 'neutral',
	sourcemap: false,
	outfile: './dist/esm/index.mjs',
})