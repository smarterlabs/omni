
const extract = require('extract-gfm')

const sample = `This is a test

	# Test Title

	\`\`\`js
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

function extractCode(str){
	const arr = str.split('```')
	const blocks = []
	arr.shift()
	for(let block of arr){
		// If it's a marked code block
		if (isLetter(block.charAt(0))){
			blocks.push(block)
		}
	}
	return blocks
}

console.log(extractCode(sample))