const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/index.mjs'],
  outdir: 'dist',
  format: 'cjs',
  bundle: true,
}).catch(() => process.exit(1));

esbuild.build({
  entryPoints: ['src/index.mjs'],
  outfile: 'dist/esm.mjs',
  format: 'esm',
  bundle: true,
}).catch(() => process.exit(1));

