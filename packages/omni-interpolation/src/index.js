export default function interpolationPlugin(options) {
	options = {
		transformKey: false,
		...options,
	}
	return async omni => {

		// Interpolate shared variables
		omni.on(`parseBlock`, async (block, data) => {
			const {
				directives: dirs,
				type,
			} = block

			if(dirs.interpolate && dirs.interpolate[0] === false) return

			if (dirs.interpolate) {
				if(type === `json`){
					data.interpolate = {
						...data.interpolate,
						...JSON.parse(block.code),
					}
				}
			}
			else {
				for (let key in data.interpolate) {
					if (options.transformKey) {
						key = options.transformKey(key)
					}
					let exp = new RegExp(key, `g`)
					block.code = block.code.replace(exp, data.interpolate[key])
				}
			}
		})

	}
}