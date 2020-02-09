import { readFile } from 'fs-extra'
import { join } from 'path'

export default function readFiles() {
	return async omni => {
		omni.addEventListener(`readFile`, async data => {
			const loc = join(omni.config.input, data.path)
			let contents = await readFile(loc)
			data.contents = contents.toString()
		})
	}
}