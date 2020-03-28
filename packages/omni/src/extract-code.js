import parseDirectives from './parse-directives'

export default function extractCode() {
	return omni => {
		omni.addEventListener(`parseFile`, async data => {
			let arr = data.contents.split(`\`\`\``)
			let blocks = []
			arr.shift()
			for (let block of arr) {
				// If it's a marked code block
				if (isLetter(block.charAt(0))) {
					let arr = block.split(/(?<=)\n/)
					let directivesStr = arr.shift()
					let { type, directives } = parseDirectives(directivesStr)
					let newDirectives = await omni.triggerEvents(`parseDirectives`, directives)
					if (newDirectives){
						directives = newDirectives
					}
					let code = arr.join(`\n`).trim()
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
		})
	}
}

function isLetter(str) {
	return str.length === 1 && str.match(/[a-z]/i)
}