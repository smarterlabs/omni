import deepmerge from 'deepmerge'

export default function runJSON() {
	return async omni => {
		omni.on(`parseBlock`, async (block, data) => {
			const {
				type,
				code,
				directives: { run, config },
			} = block
			if ((run || config) && type === `json`) {
				const obj = JSON.parse(code)
				if (obj._shared) {
					data._shared = deepmerge(data._shared, obj._shared)
				}
			}
		})
	}
}