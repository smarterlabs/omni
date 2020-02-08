const sample = `
	This is a test

	# Test Title

	\`\`\`js bundle:scripts
	const test = 0;
	console.log(test);
	\`\`\`

	This is some more markdown!

	\`\`\`html
	<div>This is some test html.</div>
	\`\`\`

	More markdown

	\`\`\`
	Unmarked code block
	\`\`\`

	End of file.

`

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

function extractCode(str){
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

console.log(
	JSON.stringify(extractCode(sample), null, 3)
)