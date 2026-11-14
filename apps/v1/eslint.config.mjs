import unusedImports from "eslint-plugin-unused-imports";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    plugins: {
      "unused-imports": unusedImports,
    },
  },
  {
    rules: {
      "react/no-unescaped-entities": 0,
      "unused-imports/no-unused-imports": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { varsIgnorePattern: "^_", argsIgnorePattern: "^_" },
      ],
      "no-console": [
        "error",
        {
          allow: ["warn", "error", "info", "time", "timeEnd", "trace"], // Allow specific console methods
        },
      ],
    },
  },
]);

export default eslintConfig;
