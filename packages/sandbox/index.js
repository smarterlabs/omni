import Omni  from '@smarterlabs/omni-core'
import omniInterpolate from '@smarterlabs/omni-plugin-interpolate'
import omniJS from '@smarterlabs/omni-plugin-javascript'

const omni = new Omni({
	input: `example`,
	output: `dist`,
	plugins: [
		omniInterpolate(),
		omniJS(),
	],
})

omni.processDirectory()