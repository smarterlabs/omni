const { extractCode } = require('./index')

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

console.log(
	JSON.stringify(extractCode(sample), null, 3)
)