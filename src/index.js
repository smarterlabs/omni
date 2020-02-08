import extractCode from './extract-code'
import { join } from 'path'
import { readFile, outputFile } from 'fs-extra'
import replaceExt from 'replace-ext'

export default class Odd{
	constructor(config){
		this.config = {
			input: `./`,
			output: `./dist`,
			...config,
		}
	}
	async processFile(path){
		const loc = join(this.config.input, path)
		let contents = await readFile(loc)
		contents = contents.toString()
		const parsed = extractCode(contents)
		const promises = []
		for(let obj of parsed){
			let outputPath = join(this.config.output, path)
			outputPath = replaceExt(outputPath, `.${obj.type}`)
			promises.push(outputFile(outputPath, obj.code))
		}
		await Promise.all(promises)
		console.log(JSON.stringify(parsed, null, 3))
	}
}