import extractCode from './extract-code'
import exportFiles from './export-files'
import { join } from 'path'
import { readFile } from 'fs-extra'

export default class Odd{
	constructor(config){
		this.config = {
			input: `./`,
			output: `./dist`,
			plugins: [],
			...config,
		}
		this.config.plugins.unshift(...[
			extractCode(),
			exportFiles(),
		])
	}
	async processFile(path){
		const loc = join(this.config.input, path)
		let contents = await readFile(loc)
		contents = contents.toString()

		let data = {
			contents,
			files: {},
			config: this.config,
			path,
		}

		for(let plugin of this.config.plugins){
			let newData = await plugin(data)
			if(newData){
				data = newData
			}
		}

	}
}