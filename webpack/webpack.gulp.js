'use strict';

const root = process.cwd();
const path = require('path');
const c      = require('ansi-colors');
const common = require(path.posix.join(root, 'webpack/webpack.common'));

console.log(c.cyanBright('WebpackConfig:'), __filename); // eslint-disable-line no-console
console.log(c.greenBright('Mode:'), common.getMode()); // eslint-disable-line no-console


module.exports = {
    name:   common.getName(), //* 'name'; default 'main'
    entry:  common.getEntry(), //* common.getEntry('rel/entry'); default 'src/js/main.js'
    output: {
        filename:          common.getFilename(), //* common.getFilename('name') | 'name.js'; default '[name].js'
        path:              common.getPath(), //*  common.getPath('rel/path') | './rel/path'; default 'www/public/js'
        sourceMapFilename: common.getSourceMapFilename(), //* default 'maps/[file].map'
    },
    mode:         common.getMode(),
    resolve:      common.resolve,
    optimization: common.getOptimization(),
    devtool:      common.getDevtool(),
    target:       common.target,
};
