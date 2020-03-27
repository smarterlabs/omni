import Omni  from 'omni-core'
import omniInterpolate from 'omni-plugin-interpolate'
import omniJS from 'omni-plugin-javascript'
import omniYAML from 'omni-plugin-yaml'

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