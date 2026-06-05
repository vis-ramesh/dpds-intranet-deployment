import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  // composite + dts via tsup don't compose well; tell tsup's dts pass to ignore the project
  // setting and treat src/index.ts as the entry of a normal program.
  dts: { compilerOptions: { composite: false, incremental: false } },
  sourcemap: false,
  clean: true,
  // Externalize every bare-module import (peer deps + direct deps + transitive),
  // so the DS bundle never inlines a CJS module whose require("react") would
  // explode in an ESM consumer. Only relative imports (./, ../) get bundled.
  external: [/^[a-zA-Z@]/],
  treeshake: true,
})
