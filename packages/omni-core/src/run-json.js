import deepmerge from 'deepmerge'

export default function runJSON() {
	return async omni => {
		omni.on(`parseBlock`, async (block, data) => {
			const {
				type,
				code,
				directives: { run, config },
			} = block
			if ((run || config) && type === `json`) {
				const obj = JSON.parse(code)
				for(let i in obj){
					data[i] = deepmerge(data[i], obj[i])
				}
			}
		})
	}
}