import parseDirectives from './parse-directives'

export default function directiveAliasesPlugin() {
	return omni => {
		omni.addEventListener(`parseDirectives`, directives => {
			let { aliases } = omni.config
			for(let directive in directives){
				if(directive in aliases){
					delete directives[directive]
					const { directives: newDirectives } = parseDirectives(aliases[directive], true)
					for (let newDirective in newDirectives){
						directives[newDirective] = newDirectives[newDirective]
					}
				}
			}
			return directives
		})
	}
}