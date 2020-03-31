# Omni Yaml Plugin

A plugin that allows you to use `yaml` config blocks in [Omni-Directional Documents](https://github.com/smarterlabs/omni).

## Installation

```
npm install @smarterlabs/omni-plugin-yaml --save
```

or

```
yarn add @smarterlabs/omni-plugin-yaml
```

## Usage

```js
import Omni  from '@smarterlabs/omni'
import omniYaml from '@smarterlabs/omni-plugin-yaml'

const omni = new Omni({
	input: `src`,
  output: `dist`,
  plugins: [
    omniYaml(),
  ],
})

omni.watch()
```

## Example

<pre lang='no-highlight'><code>
```yaml config
interpolate:
  __scope: scope-name
```
</code></pre>