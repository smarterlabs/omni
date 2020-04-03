import Chokidar from 'chokidar'

export default function watchPlugin() {
	let chokidar

	function unwatch() {
		if (chokidar) {
			chokidar.close()
		}
	}

	return omni => {
		omni.addEventListener(`watch`, () => {
			unwatch()
			// const input = [
			// 	`.`,
			// 	`!*.omni`,
			// 	// ...omni.config.ignore.map(path => `!${path}`),
			// ]
			// console.log(`INPUT`, input)
			chokidar = Chokidar.watch(`.`, {
				cwd: omni.config.input,
				ignored: omni.config.ignore,
			})
			chokidar.on(`all`, (event, path) => {
				if (event == `add` || event == `change`) {
					omni.processFile(path)
				}
				omni.triggerEvents(`watcher:${event}`, path)
			})
		})
		omni.addEventListener(`unwatch`, unwatch)
	}
}