export default function javascriptPlugin() {
	return async omni => {
		omni.on(`parseBlock`, async (block, data) => {
			const {
				directives: dirs,
				type,
			} = block
			if (!dirs.export) return
			if (type !== `js` && type !== `javascript` && type !== `es6`) return
			block.code = `;!function(_shared){${block.code}}(${JSON.stringify(data._shared)});`
		})
		omni.on(`parseBlock`, async (block, data) => {
			const {
				type,
				code,
				directives: { run },
			} = block

			if (run && (type === `js` || type === `javascript` || type === `es6`)) {
				let fn = new Function(`_shared`, code)
				await fn(data._shared)
			}
		})
	}
}