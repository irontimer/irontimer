import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import prettier from "eslint-plugin-prettier";
import solid from "eslint-plugin-solid/configs/recommended";
import typescriptEslintPlugin from "eslint-plugin-solid/configs/typescript";
import globals from "globals";

export default [
	js.configs.recommended,
	prettierConfig,
	typescriptEslintPlugin,
	{
		plugins: {
			prettier,
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

			indent: [
				"error",
				"tab",
				{
					SwitchCase: 1,
				},
			],
		},
	},
	{
		files: ["**/*.ts", "**/*.tsx"],
		...solid,
		languageOptions: {
			parser: tsParser,
			parserOptions: {
				project: "tsconfig.json",
			},
		},
		rules: {
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": [
				"error",
				{
					argsIgnorePattern: "^_",
				},
			],

			"@typescript-eslint/explicit-function-return-type": [
				"error",
				{
					allowExpressions: true,
					allowTypedFunctionExpressions: true,
					allowHigherOrderFunctions: true,
				},
			],

			"@typescript-eslint/strict-boolean-expressions": [
				"error",
				{
					allowString: false,
					allowNumber: false,
					allowNullableObject: false,
				},
			],

			curly: ["error", "all"],
			quotes: ["error", "double"],
			"arrow-parens": ["error", "always"],
			semi: ["error", "always"],
			"comma-dangle": ["error", "always-multiline"],
			"solid/no-array-handlers": "error",
			"solid/prefer-classlist": "error",
			"solid/prefer-show": "error",
		},
	},
];
