import extractCode from './extract-code'
import exportFiles from './export-files'
import runJavascript from './run-javascript'
import readFiles from './read-files'
import interpolateJavascript from './interpolate-javascript'
import runJSON from './run-json'

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
		this.eventListeners = {}

		bindThis(this, [
			`addEventListener`,
			`removeEventListener`,
			`triggerEvents`,
		])


		this.on = this.addEventListener.bind(this)
		this.config.plugins.unshift(...[
			readFiles(),
			extractCode(),
			runJSON(),
			runJavascript(),
			interpolateJavascript(),
			exportFiles(),
		])

		this.config.plugins.forEach(initPlugin => {
			initPlugin(this)
		})

		this.triggerEvents(`init`)
	}
	addEventType(label) {
		const els = this.eventListeners
		if (!(label in els)) {
			els[label] = []
		}
	}
	addEventListener(label, fn){
		this.addEventType(label)
		this.eventListeners[label].push(fn)
	}
	removeEventListener(label, fn) {
		this.addEventType(label)
		const index = this.eventListeners[label].indexOf(fn)
		if(index === -1) return
		this.eventListeners[label].splice(index, 1)
	}
	async triggerEvents(label, ...args) {
		this.addEventType(label)
		const els = this.eventListeners[label]
		let res
		for(let fn of els){
			let newRes = await fn(...args)
			if(newRes !== undefined){
				res = newRes
			}
		}
		return res
	}
	async processFile(path){
		const trigger = this.triggerEvents
		let newData

		// Data that gets passed through events for this file
		let data = {
			contents: ``,
			path,
			_shared: {},
		}

		// Get file contents with plugins
		newData = await trigger(`readFile`, data)
		if(newData) data = newData


		// Parse file with plugins
		newData = await trigger(`parseFile`, data)
		if (newData) data = newData

		// Do stuff with code blocks
		if(data.blocks){
			for(let block of data.blocks){
				await trigger(`parseBlock`, block, data)
			}
		}

		// Write files with plugins
		await trigger(`exportFile`, data)

	}

}