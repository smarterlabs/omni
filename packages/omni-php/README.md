# Omni PHP Plugin

A plugin that allows you to run PHP in [Omni-Directional Documents](https://github.com/smarterlabs/omni).

## Installation

```
npm install @smarterlabs/omni-php --save-dev
```

or

```
yarn add @smarterlabs/omni-php
```

## Usage

```js
import Omni  from '@smarterlabs/omni'
import omniPHP from '@smarterlabs/omni-php'

const omni = new Omni({
	input: `src`,
  output: `dist`,
  plugins: [
    omniPHP(),
  ],
})

omni.watch()
```

## Example

<pre lang='no-highlight'><code>
```php run
echo "Hello world!";
```
</code></pre>