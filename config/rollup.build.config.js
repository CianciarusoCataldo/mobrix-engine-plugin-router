import typescript from "rollup-plugin-typescript2";
import del from "rollup-plugin-delete";
import { terser } from "rollup-plugin-terser";
import banner2 from "rollup-plugin-banner2";

import pkg from "../package.json";

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: pkg.main,
        format: "cjs",
        plugins: [terser()],
      },
      {
        file: pkg.module,
        format: "esm",
        plugins: [terser()],
      },
    ],
    plugins: [
      del({ targets: ["dist/*"] }),
      banner2(() => `/* eslint-disable */`),
      typescript({
        rollupCommonJSResolveHack: false,
        clean: true,
      }),
    ],
    external: Object.keys(pkg.peerDependencies || {}),
  },
];
