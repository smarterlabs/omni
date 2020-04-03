import { join } from 'path'
import glob from 'globby'

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

export default class OmniCore{
	constructor(config){
		this.config = {

			// Default settings
			input: `./`,
			output: `./dist`,
			ignore: [`**/_*.omni`],
			plugins: [],
			fileTypes: [`md`, `omni`, `odd`],
			cli: true,

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
	addEventListener(labels, fns){
		if(!Array.isArray(labels)) labels = [labels]
		if(!Array.isArray(fns)) fns = [fns]
		for (let label of labels) {
			this.addEventType(label)
			for (let fn of fns) {
				this.eventListeners[label].push(fn)
			}
		}
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
	async watch() {
		await this.triggerEvents(`watch`)
	}
	async unwatch(){
		await this.triggerEvents(`unwatch`)
	}
	async processFile(path){
		const trigger = this.triggerEvents
		await trigger(`preProcessFile`)
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
		await trigger(`postProcessFile`)

	}
	async processDirectory(subdir) {
		await this.triggerEvents(`preProcessDirectory`)
		let {
			input,
			ignore,
			fileTypes,
		} = this.config
		if (subdir){
			input = join(input, subdir)
		}
		const ignoreGlobs = ignore.map(str => `!${str}`)
		const inputGlob = join(input, `**/*.{${fileTypes.join(`,`)}}`)
		const files = await glob([inputGlob, ...ignoreGlobs])


		for(let file of files){
			const path = file.replace(input, ``)
			await this.processFile(path)
		}

		await this.triggerEvents(`postProcessDirectory`)
	}
}