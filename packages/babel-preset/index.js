'use strict'
const { declare } = require(`@babel/helper-plugin-utils`)

const defaultTargets = {
	android: 30,
	chrome: 35,
	edge: 14,
	// explorer: 9,
	firefox: 52,
	safari: 8,
	ucandroid: 1,
}

function buildTargets({ additionalTargets }) {
	return Object.assign({}, defaultTargets, additionalTargets)
}

module.exports = declare((api, options) => {
	// see docs about api at https://babeljs.io/docs/en/config-files#apicache
	api.assertVersion(7)

	const {
		modules,
		targets = buildTargets(options),
	} = options

	if (typeof modules !== `undefined` && typeof modules !== `boolean` && modules !== `auto`) {
		throw new TypeError(`@smarterlabs/babel-preset only accepts \`true\`, \`false\`, or \`"auto"\` as the value of the "modules" option`)
	}

	const debug = typeof options.debug === `boolean` ? options.debug : false
	const development = typeof options.development === `boolean`
		? options.development
		: api.cache.using(() => process.env.NODE_ENV === `development`)

	return {
		presets: [
			[require(`@babel/preset-env`), {
				debug,
				targets,
				modules: modules === false ? false : `auto`,
			}],
			[require(`@babel/preset-react`), { development }],
		],
		plugins: [
			require(`@babel/plugin-transform-runtime`),
			require(`@babel/plugin-proposal-function-bind`),
			require(`@babel/plugin-proposal-export-default-from`),
			require(`@babel/plugin-proposal-logical-assignment-operators`),
			[require(`@babel/plugin-proposal-optional-chaining`), {
				loose: false,
			}],
			[require(`@babel/plugin-proposal-pipeline-operator`), {
				proposal: `minimal`,
			}],
			[require(`@babel/plugin-proposal-nullish-coalescing-operator`), {
				loose: false,
			}],
			require(`@babel/plugin-proposal-do-expressions`),
			[require(`@babel/plugin-proposal-decorators`), {
				legacy: true,
			}],
			require(`@babel/plugin-proposal-function-sent`),
			require(`@babel/plugin-proposal-export-namespace-from`),
			require(`@babel/plugin-proposal-numeric-separator`),
			require(`@babel/plugin-proposal-throw-expressions`),
			require(`@babel/plugin-syntax-dynamic-import`),
			require(`@babel/plugin-syntax-import-meta`),
			[require(`@babel/plugin-proposal-class-properties`), {
				loose: false,
			}],
			require(`@babel/plugin-proposal-json-strings`),
			require(`babel-plugin-dynamic-import-node`),
			require(`@babel/plugin-proposal-object-rest-spread`),
		],
	}
})
