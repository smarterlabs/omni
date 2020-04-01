import { program as p } from 'commander'

export default function cliPlugin() {
	return omni => {
		omni.addEventListener(`init`, () => {
			if (omni.config.cli === true && typeof process !== undefined && process.argv) {
				p.version(`v${omni.config.version}`)

				p.command(`build`)
					.description(`Build an Omni project`)
					.action(() => {
						omni.processDirectory()
					})

				p.command(`watch`)
					.description(`Watches Omni project files and rebuilds if something changes`)
					.action(() => {
						omni.watch()
					})

				p.parse(process.argv)
			}
		})
	}
}