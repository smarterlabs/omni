import yaml from 'yaml'

export default function yamlPlugin() {
	return async omni => {

		// Convert yaml config to json
		omni.on(`parseConfig`, async block => {
			if (block.type !== `yaml`) return
			return yaml.parse(block.code)
		})

	}
}