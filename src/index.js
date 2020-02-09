import extractCode from './extract-code'
import exportFiles from './export-files'
import runJavascript from './run-javascript'
import interpolateJavascript from './interpolate-javascript'
import runJSON from './run-json'
import { join } from 'path'
import { readFile } from 'fs-extra'

function bindThis($this, arr){
	for(let prop of arr){
		$this[prop] = $this[prop].bind($this)
	}
}

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
			runJSON(),
			runJavascript(),
			interpolateJavascript(),
			exportFiles(),
		])
		this.eventListeners = {}

		bindThis(this, [
			`addEventListener`,
			`removeEventListener`,
			`triggerEvents`,
		])

		this.triggerEvents(`init`)
	}
	addEventType(type) {
		const els = this.eventListeners
		if (!(type in els)) {
			els[type] = []
		}
	}
	addEventListener(type, fn){
		this.addEventType(type)
		this.eventListeners[type].push(fn)
	}
	removeEventListener(type, fn) {
		this.addEventType(type)
		const index = this.eventListeners[type].indexOf(fn)
		if(index === -1) return
		this.eventListeners[type].splice(index, 1)
	}
	async triggerEvents(type, ...args) {
		this.addEventType(type)
		const els = this.eventListeners[type]
		for(let fn of els){
			await fn(...args)
		}
	}
	async processFile(path){
		const loc = join(this.config.input, path)
		let contents = await readFile(loc)
		contents = contents.toString()

		let data = {
			contents,
			config: this.config,
			path,
			_shared: {},
		}

		for(let plugin of this.config.plugins){
			let newData = await plugin(data)
			if(newData){
				data = newData
			}
		}

	}

}