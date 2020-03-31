const Omni = require(`@smarterlabs/omni`)
const omniInterpolation = require(`@smarterlabs/omni-plugin-interpolation`)
const omniJS = require(`@smarterlabs/omni-plugin-javascript`)
const omniYAML = require(`@smarterlabs/omni-plugin-yaml`)

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