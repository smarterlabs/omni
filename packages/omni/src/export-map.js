import { remove } from 'fs-extra'

export default function fileMapPlugin() {
	return omni => {

		omni.fileMap = {}

		omni.addEventListener(`export`, data => {
			if (!omni.fileMap[data.path]){
				omni.fileMap[data.path] = []
			}
			omni.fileMap[data.path].push(data.outputPath)
		})
		omni.addEventListener(`watcher:unlink`, async path => {
			if(path in omni.fileMap){
				let promises = omni.fileMap[path].map(path => remove(path))
				await Promise.all(promises)
				delete omni.fileMap[path]
			}
		})
	}
}