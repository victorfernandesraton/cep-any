const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/index.mjs'],
  outdir: 'dist',
  format: 'cjs',
  minify: true,
  bundle: true,
}).catch(() => process.exit(1));

esbuild.build({
  entryPoints: ['src/index.mjs'],
  outfile: 'dist/esm.mjs',
  format: 'esm',
  minify: true,
  bundle: true,
}).catch(() => process.exit(1));

