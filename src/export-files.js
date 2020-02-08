import { join } from 'path'
import replaceExt from 'replace-ext'
import { outputFile } from 'fs-extra'

export default function exportFiles() {
	return async data => {

		const promises = []
		for (let obj of data.blocks) {
			if(obj.directives.ignore) continue
			let outputPath = join(data.config.output, data.path)
			outputPath = replaceExt(outputPath, `.${obj.type}`)
			promises.push(outputFile(outputPath, obj.code))
		}
		await Promise.all(promises)
	}
}