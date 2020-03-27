# @smarterlabs/omni

Core module for [Omni-Directional Documents](https://github.com/smarterlabs/omni).

## Installation

```
npm install @smarterlabs/omni --save
```

or

```
yarn add @smarterlabs/omni
```

## Usage

```js
import Omni  from '@smarterlabs/omni'

const omni = new Omni({
	input: `src`,
	output: `dist`,
})

omni.watch()
```