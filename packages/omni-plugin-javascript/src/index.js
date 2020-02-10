function isJS(type){
	if (type === `js` || type === `javascript` || type === `es6`) return true
	return false
}

export default function javascriptPlugin(options) {
	options = {
		declaration: `var`,
		...options,
	}
	return async omni => {
		omni.on(`parseBlock`, async (block, data) => {
			const {
				directives: dirs,
				type,
			} = block
			if (!dirs.export) return
			if (!isJS(type)) return
			block.code = `${options.declaration} _shared = ${JSON.stringify(data._shared)};\n\n${block.code}`
		})
		omni.on(`parseBlock`, async (block, data) => {
			const {
				type,
				code,
				directives: { run },
			} = block

			if (run && isJS(type)) {
				let fn = new Function(`_shared`, code)
				await fn(data._shared)
			}
		})
	}
}