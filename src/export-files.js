import { join } from 'path'
import replaceExt from 'replace-ext'
import { outputFile } from 'fs-extra'

export default function exportFiles() {
	return async data => {
		const promises = []
		const bundles = {}


		for (let obj of data.blocks) {
			const dirs = obj.directives
			if (dirs.ignore || dirs.run) continue

			if(dirs.bundle){
				let path = obj.directives.bundle[0] || `bundle.${obj.type}`
				if(!(path in bundles)){
					bundles[path] = []
				}
				bundles[path].push(obj.code)
				continue
			}

			let outputPath = join(data.config.output, data.path)
			outputPath = replaceExt(outputPath, `.${obj.type}`)
			promises.push(outputFile(outputPath, obj.code))
		}

		for (let path in bundles) {
			let outputPath = join(data.config.output, path)
			let code = bundles[path].join(`\n\n`)
			promises.push(outputFile(outputPath, code))
		}

		await Promise.all(promises)
	}
}