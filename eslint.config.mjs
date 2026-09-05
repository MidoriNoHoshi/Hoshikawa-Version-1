import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "no-prototype-builtins": "off",
    },
  },
  {
    ignores: [
      "main.js",
      "main.js.map",
      "styles.css",
      "dist/**",
      "node_modules/**",
      "esbuild.config.mjs",
    ],
  },
);
