import pluginVue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginJs from "@eslint/js";

export default [
  {
    ignores: ["node_modules/**", "dist/**", "**/*.d.ts"],
  },
  // Recommended Vue configurations
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  // Global settings
  {
    files: ["src/components/**/*.{js,mjs,cjs,ts,vue}"],
    languageOptions: {
      parser: vueParser,
      globals: globals.browser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
  },
  // Override or add custom rules
  {
    rules: {
      "vue/multi-word-component-names": "off", // Example custom override
    },
  },
  // Node scripts / tooling
  {
    files: ["tools/**/*.{js,mjs,cjs,ts}", "vite.config.{js,ts}", "eslint.config.js"],

    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },
];
