const { createMacro } = require('babel-plugin-macros');

module.exports = createMacro(requireContextMacro);

// Credit https://github.com/smrq/babel-plugin-require-context-hook
function requireContextMacro({ references, state, babel: { types: t } }) {
  if (process.env.NODE_ENV === 'test') {
    registerHookGlobally();
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
