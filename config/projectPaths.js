// node imports
var path = require('path')


// project root directory
var root = path.join(__dirname, '..')
// source directory
var sourceDir = path.join(root, 'src')
// configuration directory
var configDir = path.join(root, 'config')
// example directory
var exampleDir = path.join(root, 'example')


// export the project paths|globs object
module.exports = {
    // directories
    rootDir: root,
    sourceDir: sourceDir,
    entry: path.join(exampleDir, 'index.js'),
    // configuration files
    babelConfig: path.join(root, '.babelrc'),
}
