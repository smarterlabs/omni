function isJS(type){
	if (type === `js` || type === `javascript` || type === `es6`) return true
	return false
}

export default function javascriptPlugin(options) {
	options = {
		declaration: `var`,
		wrap: false,
		...options,
	}
	return async omni => {
		omni.on(`parseBlock`, async (block, data) => {
			const {
				directives: dirs,
				type,
			} = block
			if (!isJS(type)) return
			if (dirs.interpolate && dirs.interpolate[0] === false) return
			let dec = dirs.declaration ? dirs.declaration[0] : options.declaration
			if (dirs.wrap || options.wrap) {
				block.code = `;!function(_shared){\n${block.code}}(${JSON.stringify(data._shared)}\n);`
			}
			else {
				block.code = `${dec} _shared = ${JSON.stringify(data._shared)};\n\n${block.code}`
			}
		})
		omni.on(`parseBlock`, async (block, data) => {
			const {
				type,
				code,
				directives: { run },
			} = block

			if (run && isJS(type)) {
				let fn = new Function(`_shared`, code)
				try {
					await fn(data._shared)
				}
				catch(err){
					console.error(err)
				}
			}
		})
	}
}