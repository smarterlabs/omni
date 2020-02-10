function isJS(type){
	if (type === `js` || type === `javascript` || type === `es6`) return true
	return false
}

export default function javascriptPlugin() {
	return async omni => {
		omni.on(`parseBlock`, async (block, data) => {
			const {
				directives: dirs,
				type,
			} = block
			if (!dirs.export) return
			if (!isJS(type)) return
			block.code = `;!function(_shared){\n${block.code}}(${JSON.stringify(data._shared)}\n);`
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