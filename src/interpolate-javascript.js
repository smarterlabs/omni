
export default function interpolateJavascript() {
	return async data => {
		const promises = []
		for (let obj of data.blocks) {
			const {
				directives: dirs,
				type,
			} = obj
			if (!dirs.export) continue
			if (type !== `js` && type !== 'javascript' && type !== `es6`) continue
			obj.code = `;!function(_shared){${obj.code}}(${JSON.stringify(data._shared)});`
		}

		await Promise.all(promises)
	}
}