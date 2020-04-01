// TODO: Add subcommander for cli args
export default function cliPlugin() {
	return omni => {
		omni.addEventListener(`init`, () => {
			if (omni.config.cli === true && typeof process !== undefined && process.argv) {
				let [, , cmd] = process.argv
				if (cmd === `build`) {
					omni.processDirectory()
				}
				else if (cmd === `watch`) {
					omni.watch()
				}
			}
		})
	}
}