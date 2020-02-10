# Example Omni-directional document!

Markdown content is not processed and all unless otherwise specified. It can be used for easily documenting code.

The yaml frontmatter block above can contain instructions on how the file should run, or contain variables that get transpiled into the code blocks below.

## run directive

Export function will run on build. Any values saved in the _shared variable will prepended to other code blocks.


```json run
{
  "_shared": {
    "title": "Omni Directional Documents"
  }
}
```

or:

```yaml run
_shared:
  title: Omni Directional Documents
```

could be interpolated to:

```es6 run
console.log(_shared.title) // Logs "Omni Directional Documents"
_shared.pageTitle = `This is my website: ${_shared.title}`
```

or:

```php run
print_r($_shared);
```


## export directive

Blocks with the export directive will be exported into a seperate file after being processed by any other plugins.

```js export:scripts
document.querySelector('h1').textContent = _shared.pageTitle
```

```html export
<h1></h1>
<script src='scripts.js'></script>
```

By default, the filename will use the filename of the file its in and just change the extension to match the code type. But you can route the code to another file with a `:` argument.

```html export:about
<h2>This is the About Us page</h2>
```

## bundle directive

```js bundle
console.log(`This should appear in bundle.js`)
```

## Plugin Types

- runners (example: omni-plugin-run-javascript)
  - Enables running scripts directly in omni files during file processing
- interpolators (example: omni-plugin-interpolate-javascript)
  - Enables the sharing of variables between scripts


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

## Packages

- @smarterlabs/omni-core
  + Omni (pre)compiler
  + Looks for config
  + Compiles
  + Watches for changes and compiles
- @smarterlabs/omni-cli
  + Exposes the core through CLI
