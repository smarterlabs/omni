import { join } from 'path'
import { outputFile, remove } from 'fs-extra'
import replaceExt from 'replace-ext'
import { exec } from 'child_process'

export default function phpPlugin(options) {
	options = {
		wrap: true,
		...options,
	}
	return async omni => {
		// Interpolate shared variables
		// omni.on(`parseBlock`, async (block, data) => {
		// 	const {
		// 		directives: dirs,
		// 		type,
		// 	} = block
		// 	if (type !== `php`) return
		// 	if(dirs.interpolate && dirs.interpolate[0] === false) return
		// 	let str = JSON.stringify(data._shared)
		// 	str = str.replace(/"/g, `\\"`)
		// 	block.code = [
		// 		`$_shared = json_decode("${str}", true);`,
		// 		block.code,
		// 		`print "\n";`,
		// 		`print json_encode($_shared);`,
		// 	].join(`\n\n`)
		// 	if(dirs.wrap){
		// 		block.code = `<?php\n\n${block.code}\n\n?>`
		// 	}
		// })

		// Wrap block
		omni.on(`parseBlock`, async (block) => {
			const {
				directives: dirs,
				type,
			} = block
			if (type !== `php`) return
			if (dirs.wrap && dirs.wrap[0] === false) return
			if (dirs.wrap || options.wrap) {
				block.code = `<?php\n\n${block.code}\n\n?>`
			}
		})

		// Run PHP
		omni.on(`parseBlock`, async (block, data) => {
			const {
				type,
				// code,
				directives: { run },
			} = block

			if (run && type === `php`) {


				const dirs = block.directives
				if (!dirs.run) return

				let outputPath = join(omni.config.output, data.path)
				outputPath = replaceExt(outputPath, `.php.tmp`)
				await outputFile(outputPath, block.code)

				let res
				try {
					res = await execShellCommand(`php "${outputPath}"`)
					console.log(`res`, res)
				}
				catch(err){
					console.error(err)
				}
				try {
					const userRes = res.trim().split(/\n/g)
					const shared = userRes.pop()
					data._shared = JSON.parse(shared)
					res = userRes.join(`\n`)
				}
				catch(err){
					console.log(err)
					console.log(`Can't read PHP output, ignoring`)
				}

				await remove(outputPath)
			}
		})
	}
}

function execShellCommand(cmd) {
	return new Promise((resolve) => {
		exec(cmd, (error, stdout, stderr) => {
			if (error) {
				console.warn(error)
			}
			resolve(stdout ? stdout : stderr)
		})
	})
}