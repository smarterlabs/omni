import glob from 'globby'
import { join } from 'path'
import Chokidar from 'chokidar'
import extractCode from './extract-code'
import exportFiles from './export-files'
import readFiles from './read-files'

function bindThis($this, arr){
	for(let prop of arr){
		if (typeof prop === `string`) {
			$this[prop] = $this[prop].bind($this)
		}
		else{
			$this[prop] = prop.bind($this)
		}
	}
}

export default class Odd{
	constructor(config){
		this.config = {

			// Default settings
			input: `./`,
			output: `./dist`,
			plugins: [],
			fileTypes: [`md`, `omni`, `odd`, `od`],

			...config,
		}
		this.eventListeners = {}

		bindThis(this, [
			`addEventListener`,
			`removeEventListener`,
			`triggerEvents`,
		])
		this.on = this.addEventListener
		this.off = this.removeEventListener

		this.config.plugins.unshift(...[
			readFiles(),
			extractCode(),
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
	watch() {
		this.chokidar = Chokidar.watch(`.`, { cwd: this.config.input })
		this.chokidar.on(`all`, (event, path) => {
			if(event == `add` || event == `change`){
				this.processFile(path)
			}
		})
	}
	unwatch(){
		if (this.chokidar) {
			this.chokidar.unwatch()
		}
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
				if(block.directives.config){
					let obj = await trigger(`parseConfig`, block, data)
					if (obj){
						block.code = JSON.stringify(obj)
						block.type = `json`
					}
				}
			}
			for(let block of data.blocks){
				await trigger(`parseBlock`, block, data)
			}
		}

		// Write files with plugins
		await trigger(`exportFile`, data)

	}
	async processDirectory(subdir){
		let {
			input,
			fileTypes,
		} = this.config
		if (subdir){
			input = join(input, subdir)
		}
		const inputGlob = join(input, `**/*.{${fileTypes.join(`,`)}}`)
		const files = await glob(inputGlob)
		for(let file of files){
			const path = file.replace(input, ``)
			await this.processFile(path)
		}
	}
}