function isLetter(str) {
	return str.length === 1 && str.match(/[a-z]/i);
}

function parseDirectives(arr){
	let directives = arr
		.shift()
		.trim()
		.split(/\s+/)
		.map(str => str.trim())

	const type = directives.shift()

	directives = directives.map(str => {
		const [directive, ...arguments] = str.split(`:`)
		return {
			directive,
			arguments,
		}
	})

	return {
		type,
		directives,
	}
}

exports.extractCode = str => {
	const arr = str.split('```')
	const blocks = []
	arr.shift()
	for(let block of arr){
		// If it's a marked code block
		if (isLetter(block.charAt(0))){
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
	return blocks
}
