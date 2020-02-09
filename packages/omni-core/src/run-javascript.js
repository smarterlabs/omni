export default function runJavascript() {
	return async omni => {
		omni.addEventListener(`parseBlock`, async (block, data) => {
			const {
				type,
				code,
				directives: { run },
			} = block

			if(run && (type === `js` || type === `javascript` || type === `es6`)) {
				let fn = new Function(`_shared`, code)
				await fn(data._shared)
			}
		})
	}
}