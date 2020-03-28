export default function parseDirectives(str, noLanguage){
	let arr = str
		.trim()
		.split(/\s+/)
		.map(str => str.trim())

	let directives = {}
	let type
	if (!noLanguage) {
		type = arr.shift()
	}

	for (let str of arr) {
		let [directive, ...args] = str.split(`:`)
		directives[directive] = args.join(`:`) || true
	}

	return {
		type,
		directives,
	}
}