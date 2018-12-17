const { createMacro } = require('babel-plugin-macros');

// Credit https://github.com/smrq/babel-plugin-require-context-hook
function requireContext({ references, state, babel: { types: t } }) {
  if (process.env.NODE_ENV === 'test') {
    references.default.forEach(path =>
      path.parentPath.replaceWith(
        t.callExpression(t.identifier("require('require-context.macro/context')"), [
          t.identifier('__dirname'),
          ...path.parent.arguments,
        ])
      )
    );
  } else {
    references.default.forEach(path =>
      path.parentPath.replaceWith(
        t.callExpression(t.identifier('require.context'), [...path.parent.arguments])
      )
    );
  }
}

module.exports = createMacro(requireContext);
