import pluginTester from 'babel-plugin-tester';
import plugin from 'babel-plugin-macros';

pluginTester({
  plugin,
  snapshot: true,
  babelOptions: { filename: __filename },
  tests: [
    `
    import requireContext from '../require-context.macro';

    requireContext('../src/components', true, /\.stories\.js$/);
  `,
  ],
});
