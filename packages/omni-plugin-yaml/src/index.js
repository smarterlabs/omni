import yaml from 'yaml'
import deepmerge from 'deepmerge'

export default function yamlPlugin() {
	return async omni => {
		omni.on(`parseBlock`, async (block, data) => {
			if (block.type != `yaml` || !block.directives.config) return
			let obj = yaml.parse(block.code)
			for (let i in obj) {
				data[i] = deepmerge(data[i], obj[i])
			}
			return yaml.parse(block.code)
		})

	}
}