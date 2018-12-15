'use strict';

module.exports = {
  presets: [
    [
      '@babel/preset-env', {
        targets: {
          node: true,
        }
      }
    ]
  ],
  plugins: ['macros'],
};
