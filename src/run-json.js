import deepmerge from 'deepmerge'

export default function runJSON() {
	return async data => {
		for (let obj of data.blocks) {
			const {
				type,
				code,
				directives: { run, config }
			} = obj
			if ((run || config) && type === `json`) {
				const obj = JSON.parse(code)
				if (obj._shared) {
					data._shared = deepmerge(data._shared, obj._shared)
				}
			}
		}
	}
}