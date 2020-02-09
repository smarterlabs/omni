import Odd  from './src/index'

const odd = new Odd({
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

odd.processFile(`example.md`)