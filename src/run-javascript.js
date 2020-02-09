import deepmerge from 'deepmerge'

export default function runJavascript() {
	return async data => {
		for (let obj of data.blocks) {
			const {
				type,
				code,
				directives: { run }
			} = obj
			if (run && (type === `js` || type === 'javascript' || type === `es6`)) {
				let fn = new Function(`_shared`, code)
				await fn(data._shared)
			}
		}
	}
}