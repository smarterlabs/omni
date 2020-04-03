module.exports = {
	parser: `babel-eslint`,
	extends: [
		`eslint:recommended`,
		`plugin:jest/recommended`,
	],
	env: {
		es6: true,
		node: true,
	},
	parserOptions: {
		sourceType: `module`,
	},
	plugins: [
		`jest`,
	],
	globals: {
		window: true,
		document: true,
		localStorage: true,
	},
	rules: {
		indent: [
			`error`,
			`tab`,
			{
				SwitchCase: 1,
			},
		],
		'linebreak-style': [
			`error`,
			`unix`,
		],
		quotes: [
			`error`,
			`backtick`,
		],
		semi: [
			`error`,
			`never`,
		],
		'comma-dangle': [
			`error`,
			`always-multiline`,
		],
		'no-console': 0,
		'require-atomic-updates': 0,
		'no-unused-expressions': 0,
	},
}
