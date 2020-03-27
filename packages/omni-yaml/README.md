# @smarterlabs/omni-yaml

A plugin that allows you to use `yaml` config blocks in [Omni-Directional Documents](https://github.com/smarterlabs/omni).

## Installation

```
npm install @smarterlabs/omni-yaml
```

```js
import Omni  from '@smarterlabs/omni'
import omniYaml from '@smarterlabs/omni-yaml'

const omni = new Omni({
	input: `src`,
  output: `dist`,
  plugins: [
    omniYaml(),
  ],
})

omni.watch()
```

## Usage

<pre lang='no-highlight'><code>
```yaml config
interpolate:
  __scope: scope-name
```
</code></pre>