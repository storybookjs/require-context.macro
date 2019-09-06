function context(basedir, directory, useSubdirectories = false, regExp = /^\.\//) {
  const path = require('path');
  const fs = require('fs');

  function enumerateFiles(basedir, dir) {
    let result = [];
    fs.readdirSync(path.join(basedir, dir)).forEach(function(file) {
      const relativePath = dir + '/' + file;
      let filepath = path.join(basedir, relativePath);
      let stats = fs.lstatSync(filepath);
      while (stats.isSymbolicLink()) {
        filepath = fs.realpathSync(filepath);
        stats = fs.lstatSync(filepath);
      }

      if (stats.isDirectory()) {
        if (useSubdirectories) {
          result = result.concat(enumerateFiles(basedir, relativePath));
        }
      } else if (regExp.test(relativePath)) {
        result.push(relativePath);
      }
    });
    return result;
  }

  const absoluteDirectory = path.resolve(basedir, directory);
  const keys = enumerateFiles(absoluteDirectory, '.');

  function resolve(key) {
    if (!keys.includes(key)) {
      throw new Error(`Cannot find module '${key}'.`);
    }
    return require('path').resolve(absoluteDirectory, key);
  }
  
  function requireContext(key) {
    return require(resolve(key));
  }

  requireContext.keys = () => keys;
  requireContext.resolve = resolve;

  return requireContext;
}

module.exports = context;
