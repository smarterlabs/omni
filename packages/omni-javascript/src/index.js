function isJS(type){
	if (type === `js` || type === `javascript` || type === `es6`) return true
	return false
}

export default function javascriptPlugin() {
	return async omni => {
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