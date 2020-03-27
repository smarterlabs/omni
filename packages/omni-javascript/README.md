# Omni JavaScript Plugin

A plugin that allows you to run JavaScript in [Omni-Directional Documents](https://github.com/smarterlabs/omni).

## Installation

```
npm install @smarterlabs/omni-javascript --save
```

or

```
yarn add @smarterlabs/omni-javascript
```

## Usage

```js
import Omni  from '@smarterlabs/omni'
import omniJS from '@smarterlabs/omni-javascript'

const omni = new Omni({
	input: `src`,
  output: `dist`,
  plugins: [
    omniJS(),
  ],
})

omni.watch()
```

## Example

<pre lang='no-highlight'><code>
```js run
console.log(`Omni file processed!`)
```
</code></pre>