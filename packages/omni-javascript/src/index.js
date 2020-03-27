function isJS(type){
	if (type === `js` || type === `javascript` || type === `es6`) return true
	return false
}

export default function javascriptPlugin(options) {
	options = {
		wrap: false,
		...options,
	}
	return async omni => {
		omni.on(`parseBlock`, async (block) => {
			const {
				directives: dirs,
				type,
			} = block
			if (!isJS(type)) return
			if (dirs.interpolate && dirs.interpolate[0] === false) return
			if (dirs.wrap || options.wrap) {
				block.code = `;!function(){\n${block.code}}();`
			}
		})
		omni.on(`parseBlock`, async (block) => {
			const {
				type,
				code,
				directives: { run },
			} = block

			if (run && isJS(type)) {
				let fn = new Function(code)
				try {
					await fn()
				}
				catch(err){
					console.error(err)
				}
			}
		})
	}
}