# Example Omni-directional document!

Markdown content is not processed and all unless otherwise specified. It can be used for easily documenting code.

The yaml frontmatter block above can contain instructions on how the file should run, or contain variables that get transpiled into the code blocks below.


## config directive

```json config
{
  "title": "Omni Directional Document"
}
```

## run directive

Export function will run on build. Any values saved in the _shared variable will prepended to other code blocks.

```es6 run
console.log(_shared.title) // Logs "Omni Directional Document"
_shared.pageTitle = `This is my website: ${_shared.title}`
```


```html
<h1>{_shared.pageTitle}</h1>
```

## ignore directive

If you're using code blocks in your markdown, you'll probably want some of your code blocks to be ignored.

```js ignore
// This .js block will not be transpiled or executed and will stay in the generated .md file
const test = true
console.log(test)
```

## bundle directive

```js bundle
console.log(`This should appear in bundle.js`)
```

## Phases of plugins

- onInput
- onParse
- onOutput


## All directives

- on:start (executes before the file is transpiled)
- on:done (executes after the file is transpiled)
- export (exports the code block to a file)
  + Change file path with `export:../dist/index.html`
  + If multiple files are pointing to the same export location, they will be bundled into 1 file
- config (a block of code for .odd config settings and shared variable)
- md (process the block, but also leave it in the transpiled markdown)
- bundle (adds the file to a bundle of similar file extensions: ./bundle.*)
  + To change bundle name: `bundle:styles`
- output (outputs the result to markdown)


## Use Cases

- Using component-style patterns with frameworks that don't support them
- Keeping documentation with code
- Keeping tests with code
- Coordinating events between server and client side code in a decoupled environment
- Rapid prototyping in your documentation
- Working with multiple frameworks simultaneously
- Getting backend devs more familiar with front end or front end devs more familiar with backend
- Expressing user flow in production code

## Plugins

### Default

- shared-variables
- build
- export
- bundle
- scope
  + Creates a unique string name per file
  + `odd-${timestamp}`
  + Adds to the shared object for access in all code blocks
- test
  + Would bundle suffice?
- output

### Next Phase

- Sass
- Liquid
- JavaScript

## Packages

- @smarterlabs/omni-core
  + Omni (pre)compiler
  + Looks for config
  + Compiles
  + Watches for changes and compiles
- @smarterlabs/omni-cli
  + Exposes the core through CLI
