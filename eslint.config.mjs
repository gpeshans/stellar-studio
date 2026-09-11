import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Standalone design references at the repo root. Not imported by the app,
    // not part of the build, and not covered by tsconfig.
    "stellar-studio-concept.jsx",
    "stellar-studio-design-system.jsx",
  ]),
]);

export default eslintConfig;
