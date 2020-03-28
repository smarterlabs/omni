import { join, extname } from 'path'
import replaceExt from 'replace-ext'
import { outputFile } from 'fs-extra'

export default function exportFiles() {
	return async omni => {
		omni.addEventListener(`exportFile`, async data => {
			const promises = []

			for (let block of data.blocks) {
				const dirs = block.directives
				if (!dirs.export) continue

				console.log(`data`, data)
				let blockPath = dirs.export[0]

				let outputPath = join(omni.config.output, blockPath || data.path)
				let ext = extname(outputPath)
				if (!ext) {
					outputPath = replaceExt(outputPath, `.${block.type}`)
				}
				promises.push(outputFile(outputPath, block.code))
			}

			await Promise.all(promises)
		})
	}
}