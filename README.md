![Omni Logo](https://raw.githubusercontent.com/smarterlabs/omni/master/assets/logo.svg)

# Omni-Directional Documents (.omni, .md)

Think of Omni-Directional Documents as "smart markdown files" that are capable of doing things such as variable interpolation between files, file bundling, using multiple languages in one file, and more. Since the syntax is 90% markdown, you can benefit from linting and code highlighting that you get in markdown file code blocks.

## Example

Even this markdown file can actually be run as an Omni file. Only the code blocks will be executed. Any documentation in markdown like this sentence will be ignored.

**Note:** You may have to view the raw version of this file to see the Omni directives.

The `config` directive tells Omni that this code tells the rest of the code blocks after it how to behave. In this case, it's telling Omni to replace any occurrences of "__scope" with "navigation". We can use this to scope our web component.

```yaml config interpolate
interpolate:
  __scope: navigation
```

Code blocks with the `run` directive will run the block immediately when encountered during parsing.

```js run
console.log(`Omni component created with class "__scope"`)
```

The following three blocks of code will output to three seperate .js, .css, and .liquid files.

```html export:templates/navigation.liquid
<nav class='__scope'>
  ...
</nav>
```

```js export:js/nav
let navEl = document.querySelector(`.__scope`)
navEl.addEventListener(`click`, () => {
  console.log(`Nav was clicked!`)
})
```

```css export:css/nav
.__scope{
  background: #eee;
}
```

We can then watch this file for changes and transpile to those three files any time this Omni file changes. Techniques like this can be used for bringing component based patterns into a monolithic framework that might not otherwise support it.

## All directives

- on:start (executes before the file is transpiled)
- on:done (executes after the file is transpiled)
- export (exports the code block to a file)
  + Change file path with `export:../dist/index.html`
  + If multiple files are pointing to the same export location, they will be bundled into 1 file
- config (a block of code for Omni config and plugin settings)
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