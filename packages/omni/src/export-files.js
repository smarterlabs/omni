import { join, extname, basename } from 'path'
import replaceExt from 'replace-ext'
import { outputFile } from 'fs-extra'

export default function exportFiles() {
	return async omni => {
		omni.addEventListener(`exportFile`, async data => {
			const promises = []

			for (let block of data.blocks) {
				const dirs = block.directives
				if (!dirs.export) continue

				// Get original .omni file name
				let extension = extname(data.path)
				let originalName = basename(data.path, extension)

				// Get code block export path from export directive argument
				let blockPath = dirs.export
				if (blockPath) {
					blockPath = blockPath.replace(/\*/g, originalName)
					if(blockPath.charAt(blockPath.length - 1) === `/`){
						blockPath = join(blockPath, originalName)
					}
				}

				// Create final output path
				let outputPath = join(omni.config.output, blockPath || data.path)
				let ext = extname(outputPath)
				if (!ext) {
					outputPath = replaceExt(outputPath, `.${block.type}`)
				}
				data.outputPath = outputPath

				await omni.triggerEvents(`export`, data)

				promises.push(outputFile(outputPath, block.code))
			}

			await Promise.all(promises)
		})
	}
}