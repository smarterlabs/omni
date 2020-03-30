const Omni = require(`@smarterlabs/omni`).default
const omniInterpolation = require(`@smarterlabs/omni-interpolation`).default
const omniJS = require(`@smarterlabs/omni-javascript`).default
const omniYAML = require(`@smarterlabs/omni-yaml`).default

new Omni({
	input: `example`,
	output: `dist`,
	aliases: {
		dist: `export:../dist/`,
		css: `export:../dist/css/components/`,
	},
	plugins: [
		omniInterpolation(),
		omniJS(),
		omniYAML(),
	],
})