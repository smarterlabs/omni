import Omni  from '@smarterlabs/omni'
import omniInterpolate from '@smarterlabs/omni-interpolate'
import omniJS from '@smarterlabs/omni-javascript'
import omniYAML from '@smarterlabs/omni-yaml'

const omni = new Omni({
	input: `example`,
	output: `dist`,
	plugins: [
		omniInterpolate(),
		omniJS(),
		omniYAML(),
	],
})

omni.watch()