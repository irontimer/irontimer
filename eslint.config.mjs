import prettier from "eslint-plugin-prettier";
import solid from "eslint-plugin-solid";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all
});

export default [...compat.extends(
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:solid/recommended",
    "prettier",
), {
    plugins: {
        prettier,
        solid,
        "@typescript-eslint": typescriptEslint,
    },

    languageOptions: {
        globals: {
            ...globals.node,
            ...globals.browser,
        },

        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",

        parserOptions: {
            ecmaFeatures: {
                jsx: true,
            },

            project: "**/tsconfig.json",
        },
    },

    rules: {
        "prettier/prettier": "error",
        "linebreak-style": ["error", "unix"],

        indent: ["error", "tab", {
            SwitchCase: 1,
        }],
    },
}, {
    files: ["**/*.ts", "**/*.tsx"],

    rules: {
        "no-unused-vars": "off",

        "@typescript-eslint/no-unused-vars": ["error", {
            argsIgnorePattern: "^_",
        }],

        "@typescript-eslint/explicit-function-return-type": ["error", {
            allowExpressions: true,
            allowTypedFunctionExpressions: true,
            allowHigherOrderFunctions: true,
        }],

        "@typescript-eslint/strict-boolean-expressions": ["error", {
            allowString: false,
            allowNumber: false,
            allowNullableObject: false,
        }],

        curly: ["error", "all"],
        quotes: ["error", "double"],
        "arrow-parens": ["error", "always"],
        semi: ["error", "always"],
        "comma-dangle": ["error", "always-multiline"],
        "solid/no-array-handlers": "error",
        "solid/prefer-classlist": "error",
        "solid/prefer-show": "error",
    },
}];