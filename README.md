# require-context.macro

A macro needed for some advanced Storybook@4 and Storybook@3 setups

[![Babel Macro](https://img.shields.io/badge/babel--macro-%F0%9F%8E%A3-f5da55.svg?style=flat-square)](https://github.com/kentcdodds/babel-plugin-macros)

Credit to [the original plugin](https://github.com/smrq/babel-plugin-require-context-hook/).

## Usage

Ensure you have `babel-plugin-macros` installed within your project.

`yarn add -D babel-plugin-macros`

Then install this specific macro

`yarn add -D require-context.macro`

Afterwards, simply import this function and call it in place of `require.context()` inside
`.storybook/config.js`.

```javascript
// .storybook/config.js

import { configure } from '@storybook/react';
import requireContext from 'require-context.macro';

import '../src/index.css';

const req = requireContext('../src/components', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
```

You may also need to make Storybook aware of the fact that you're using Babel macros! You can do
this by declaring `macros` as one of the options in your array of plugins within your babel config.

One example, with a `.babelrc` at the root-level of your repository:

```json
{
  "plugins": ["macros"]
}
```
