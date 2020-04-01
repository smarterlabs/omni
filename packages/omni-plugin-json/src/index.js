import deepmerge from 'deepmerge'

export default function JSONPlugin() {
	return async omni => {
		omni.on(`parseBlock`, async (block, data) => {
			if (!block.directives.config || block.type != `json`) return
			const obj = JSON.parse(block.code)
			for (let i in obj) {
				data[i] = deepmerge(data[i], obj[i])
			}
		})
	}
}