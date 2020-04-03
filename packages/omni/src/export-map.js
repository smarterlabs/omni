import { remove } from 'fs-extra'

export default function fileMapPlugin() {
	return omni => {

		// A map of all src and dist files Omni knows about
		// Key: omni file
		// Value: array of output files
		omni.srcFiles = {}
		omni.distFiles = {}


		function addFile(src, dist) {
			if (!omni.srcFiles[src]) {
				omni.srcFiles[src] = []
			}
			omni.srcFiles[src].push(dist)

			if(!omni.distFiles[dist]){
				omni.distFiles[dist] = []
			}
			omni.distFiles[dist].push(src)
		}
		function removeSrc(src){
			if(omni.srcFiles[src]){
				for(let dist of omni.srcFiles[src]){
					let files = omni.distFiles[dist]
					if (files){
						let index = files.indexOf(src)
						if(index > -1){
							files.splice(index, 1)
						}
						if(files.length == 0){
							delete omni.distFiles[dist]
						}
					}
				}
				delete omni.srcFiles[src]
			}
		}

		let previousPaths = []
		function savePreviousPaths(){
			previousPaths = Object.keys(omni.distFiles)
		}
		async function fileCleanup(){
			let promises = []
			for(let path of previousPaths){
				if(!(path in omni.distFiles)){
					promises.push(remove(path))
				}
			}
			await Promise.all(promises)
		}

		omni.addEventListener([`preProcessFile`, `preProcessDirectory`], savePreviousPaths)
		omni.addEventListener(`parseFile`, data => {
			removeSrc(data.path)
		})
		omni.addEventListener([`postProcessFile`, `postProcessDirectory`], fileCleanup)
		omni.addEventListener(`export`, data => {
			addFile(data.path, data.outputPath)
		})

		omni.addEventListener(`watcher:unlink`, async function(path){
			savePreviousPaths()
			removeSrc(path)
			await fileCleanup()
		})
	}
}