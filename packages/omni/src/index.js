import OmniCore from '@smarterlabs/omni-core'
import cliPlugin from '@smarterlabs/omni-plugin-cli'
import extractCodePlugin from './extract-code'
import exportFilesPlugin from './export-files'
import readFilesPlugin from './read-files'
import JSONPlugin from '@smarterlabs/omni-plugin-json'
import directiveAliasesPlugin from '@smarterlabs/omni-plugin-directive-aliases'
import exportMapPlugin from './export-map'
import watchPlugin from '@smarterlabs/omni-plugin-watch'

export default class Omni{
	constructor(config){
		if(!config.plugins) config.plugins = []

		// Prepend plugins
		config.plugins.unshift(...[
			readFilesPlugin(),
			JSONPlugin(),
			extractCodePlugin(),
			exportMapPlugin(),
			watchPlugin(),
			exportFilesPlugin(),
			directiveAliasesPlugin(),
		])
		// Append plugins
		config.plugins.push(...[
			cliPlugin(),
		])

		return new OmniCore(config)
	}
}