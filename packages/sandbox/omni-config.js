const Omni = require(`@smarterlabs/omni`)
const omniInterpolation = require(`@smarterlabs/omni-interpolation`)
const omniJS = require(`@smarterlabs/omni-javascript`)
const omniYAML = require(`@smarterlabs/omni-yaml`)

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