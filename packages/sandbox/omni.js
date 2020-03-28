import Omni  from '@smarterlabs/omni'
import omniInterpolation from '@smarterlabs/omni-interpolation'
import omniJS from '@smarterlabs/omni-javascript'
import omniYAML from '@smarterlabs/omni-yaml'

const omni = new Omni({
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

export default omni