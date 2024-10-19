import * as esbuild from "npm:esbuild";
import { denoPlugins } from "jsr:@luca/esbuild-deno-loader";

const plugins = [...denoPlugins()];
const builders = [
  esbuild.build({
    plugins,
    entryPoints: ["./mod.ts"],
    outfile: "dist/index.js",
    format: "cjs",
    bundle: true,
  }),

  esbuild.build({
    plugins,
    entryPoints: ["./mod.ts"],
    outfile: "dist/esm.mjs",
    format: "esm",
    bundle: true,
  }),
];

await Promise.all(builders);
