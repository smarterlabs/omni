function isLetter(str) {
	return str.length === 1 && str.match(/[a-z]/i);
}

function parseDirectives(arr){
	arr = arr
		.shift()
		.trim()
		.split(/\s+/)
		.map(str => str.trim())

	const type = arr.shift()
	const directives = {}

	for (let str of arr) {
		const [directive, ...args] = str.split(`:`)
		directives[directive] = args
	}

	return {
		type,
		directives,
	}
}

export default function extractCode() {
	return data => {
		const arr = data.contents.split('```')
		const blocks = []
		arr.shift()
		for (let block of arr) {
			// If it's a marked code block
			if (isLetter(block.charAt(0))) {
				const arr = block.split(/(?<=)\n/)
				const { type, directives } = parseDirectives(arr)
				const code = arr.join(`\n`).trim()
				blocks.push({
					code,
					type,
					directives,
					original: block,
				})
			}
		}
		data.blocks = blocks
		return data
	}
}