import Omni  from '@smarterlabs/omni-core'
import omniInterpolate from '@smarterlabs/omni-plugin-interpolate'
import omniJS from '@smarterlabs/omni-plugin-javascript'
import omniYAML from '@smarterlabs/omni-plugin-yaml'

const omni = new Omni({
	input: `example`,
	output: `dist`,
	plugins: [
		omniInterpolate(),
		omniJS(),
		omniYAML(),
	],
})

omni.processDirectory()