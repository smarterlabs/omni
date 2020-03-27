# @smarterlabs/omni-interpolate

String interpolation plugin for [Omni-Directional Documents](https://github.com/smarterlabs/omni).

## Installation

```
npm install @smarterlabs/omni-interpolate
```

```js
import Omni  from '@smarterlabs/omni'
import omniInterpolate from '@smarterlabs/omni-interpolate'

const omni = new Omni({
	input: `src`,
  output: `dist`,
  plugins: [
    omniInterpolate(),
  ],
})

omni.watch()
```

## Usage

<pre lang='no-highlight'><code>
```json interpolate
{
  "__scope": "nav"
}
```

```js export
console.log(`__scope`) // Logs "nav"
```
</code></pre>