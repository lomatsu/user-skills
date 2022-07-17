module.exports = {
	env: {
		es2021: true,
		node: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:prettier/recommended",
		"prettier",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module",
	},
	plugins: ["@typescript-eslint"],
	rules: {
		"prettier/prettier": [
			"error",
			{
				endOfLine: "auto",
				singleQuote: false,
				tabWidth: 2,
				semi: false,
				trailingComma: "es5",
			},
		],
		"no-console": "off",
		"@typescript-eslint/no-explicit-any": "off",
	},
}

