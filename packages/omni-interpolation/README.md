# Omni Interpolation Plugin

String interpolation plugin for [Omni-Directional Documents](https://github.com/smarterlabs/omni).

## Installation

```
npm install @smarterlabs/omni-interpolation --save
```

or

```
yarn add @smarterlabs/omni-interpolation
```

## Usage

```js
import Omni  from '@smarterlabs/omni'
import omniInterpolation from '@smarterlabs/omni-interpolation'

const omni = new Omni({
	input: `src`,
  output: `dist`,
  plugins: [
    omniInterpolation(),
  ],
})

omni.watch()
```

## Example

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