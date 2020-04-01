# Omni Yaml JSON

A plugin that allows you to use `json` config blocks in [Omni-Directional Documents](https://github.com/smarterlabs/omni).

## Installation

```
npm install @smarterlabs/omni-plugin-json --save
```

or

```
yarn add @smarterlabs/omni-plugin-json
```

## Usage

```js
import Omni  from '@smarterlabs/omni'
import omniJSON from '@smarterlabs/omni-plugin-json'

const omni = new Omni({
  input: `src`,
  output: `dist`,
  plugins: [
    omniJSON(),
  ],
})

omni.watch()
```

## Example

<pre lang='no-highlight'><code>
```json config
{
	"interpolate": {
		"_scope_": "scope-name"
	}
}
```
</code></pre>