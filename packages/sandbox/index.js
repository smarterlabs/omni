import Omni  from '@smarterlabs/omni-core'

const omni = new Omni({
	input: `example`,
	output: `dist`,
	plugins: [
		// consoleLog(),
	],
})

// function consoleLog(options){
// 	return function (data) {
// 		console.log(JSON.stringify(data, null, 3))
// 	}
// }

omni.processDirectory()