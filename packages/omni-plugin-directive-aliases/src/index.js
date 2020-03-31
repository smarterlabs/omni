export default function directiveAliasesPlugin() {
	return omni => {
		omni.addEventListener(`parseDirectives`, directives => {
			let { aliases } = omni.config
			for (let directive in directives) {
				if (directive in aliases) {
					delete directives[directive]
					const { directives: newDirectives } = parseDirectives(aliases[directive], true)
					for (let newDirective in newDirectives) {
						directives[newDirective] = newDirectives[newDirective]
					}
				}
			}
			return directives
		})
	}
}

function parseDirectives(str) {
	let arr = str
		.trim()
		.split(/\s+/)
		.map(str => str.trim())

	let directives = {}
	let type

	for (let str of arr) {
		let [directive, ...args] = str.split(`:`)
		directives[directive] = args.join(`:`) || true
	}

	return {
		type,
		directives,
	}
}