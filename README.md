<p align="center">
  <img src="https://res.cloudinary.com/smarterlabs/image/upload/v1585347380/omni/lockup-dark.svg" width="100" alt="Omni logo" />
</p>

# Omni-Directional Documents (.omni, .odd)

**Note:** All packages in this monorepo should be considered a work-in-progress. APIs may change dramatically.

Think of Omni-Directional Documents as "smart markdown files" that are capable of doing things such as variable interpolation between files, file bundling, using multiple languages in one file, and more. Since the syntax is 90% markdown, you can benefit from linting and code highlighting that you get in markdown file code blocks.

[Example .omni file](https://github.com/smarterlabs/omni/blob/master/example.omni)

# Current Packages

- [Omni Core](https://github.com/smarterlabs/omni/tree/master/packages/omni): A JS module that acts as the core of the Omni compiler
- [PHP Language Plugin](https://github.com/smarterlabs/omni/tree/master/packages/omni-php): Enables PHP usage in .omni files
- [JavaScript Language Plugin](https://github.com/smarterlabs/omni/tree/master/packages/omni-javascript): Enables JS usage in .omni files
- [Yaml Language Plugin](https://github.com/smarterlabs/omni/tree/master/packages/omni-yaml): Enables Yaml config in .omni files
- [Interpolation Plugin](https://github.com/smarterlabs/omni/tree/master/packages/omni-interpolation): Enables string interpolation in .omni code blocks
- [VS Code Omni Extension](https://marketplace.visualstudio.com/items?itemName=smarterlabs.vscode-omni): VS Code extension that enables code highlighting for .omni and .odd files

## Directives

**Note:** More on the way!

### `config`

A code block with a `config` directive is usually used to give instructions to Omni about how a file should be run or processed.

### `run`

A code block with a `run` directive will execute the code block every time the file is processed. This can be useful for fetching data from an API to pass to another code block, or logging out debug information about the file that is being processed.

### `export`

A code block with the `export` directive will export the code block to its own file after it has been processed

## Use Cases

- Using component-style patterns with frameworks that don't support them
- Keeping documentation with code
- Keeping tests with code
- Coordinating events between server and client side code in a decoupled environment
- Rapid prototyping in your documentation
- Working with multiple frameworks simultaneously
- Getting backend devs more familiar with front end or front end devs more familiar with backend
- Expressing user flow in production code