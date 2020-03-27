# @smarterlabs/omni-php

A plugin that allows you to run and autowrap PHP blocks with `<?php ?>` in [Omni-Directional Documents](https://github.com/smarterlabs/omni).

## Installation

```
npm install @smarterlabs/omni-php
```

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

## Usage

<pre lang='no-highlight'><code>
```php run
echo "Hello world!";
```
</code></pre>