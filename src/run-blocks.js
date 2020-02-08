import deepmerge from 'deepmerge'

export default function runBlocks() {
	return async data => {
		const promises = []
		const bundles = {}

		for (let obj of data.blocks) {
			if (obj.directives.run) {
				let fn = new Function(`_shared`, obj.code)
				await fn(data._shared)
			}
		}
	}
}