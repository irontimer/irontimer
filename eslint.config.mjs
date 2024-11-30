import js from "@eslint/js";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import prettierConfig from "eslint-config-prettier";
import prettier from "eslint-plugin-prettier";
import solid from "eslint-plugin-solid/configs/recommended";
import typescriptEslintConfig from "eslint-plugin-solid/configs/typescript";
import globals from "globals";

export default [
	js.configs.recommended,
	prettierConfig,
	typescriptEslintConfig,
	{
		files: ["src/**/*.ts", "src/**/*.tsx"],
		plugins: {
			prettier,
			"@typescript-eslint": typescriptEslint,
			solid: solid.plugins.solid,
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
				project: "tsconfig.json",
			},
		},
		rules: {
			...solid.rules,
			"prettier/prettier": "error",
			"linebreak-style": ["error", "unix"],
			eqeqeq: ["error", "always"],
			indent: [
				"error",
				"tab",
				{
					SwitchCase: 1,
				},
			],
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
