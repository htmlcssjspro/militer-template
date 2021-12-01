'use strict';

const root = process.cwd();
const path = require('path');
const c = require('ansi-colors');
const common = require(path.posix.join(root, 'webpack/webpack.common'));
//* OR
/* const {
    entry,
    output,
    mode,
    devtool,
    optimization,
    target,
    resolve,
    devServer
} = require('./webpack.common'); */

module.exports = function(env, argv) {
    // eslint-disable-next-line no-console
    console.log(c.cyanBright('WebpackConfig:'), __filename);
    const DEV = (argv.mode && argv.mode === 'development') || env.development;

    const output = {
        filename: '[name].js',
        path:     common.output.path('www/public/js'),
    };
    const mode         = common.mode(DEV);
    const resolve      = common.resolve;
    const devtool      = common.devtool(DEV);
    const optimization = common.optimization(DEV);
    const target       = common.target;
    const devServer    = common.devServer('www/public');

    return [
        //* Вариант 1
        {
            name:  env.name,
            entry: {
                [env.name]: common.entry(env.entry)
            },
            output: {
                filename: common.output.filename(env.name),
                path:     common.output.path(env.output),
            },
            mode:         common.mode(env.development),
            devtool:      common.devtool(env.development),
            optimization: common.optimization(env.development),
            target:       common.target,
            resolve:      common.resolve,
        },
        //* Вариант 2
        {
            name:  'main+admin',
            entry: {
                main:  common.entry('src/js/main.js'),
                admin: common.entry('src/js/admin.js'),
            },
            output: {
                filename: '[name].js',
                path:     common.output.path('www/public/js'),
            },
            mode:         common.mode(DEV),
            resolve:      common.resolve,
            devtool:      common.devtool(DEV),
            optimization: common.optimization(DEV),
            target:       common.target,
            devServer:    common.devServer('www/public'),
        },
        //* Вариант 3
        {
            name:  'main+admin',
            entry: {
                main:  './src/js/main.js',
                admin: './src/js/admin.js',
            },
            output,
            mode,
            resolve,
            devtool,
            optimization,
            target,
            devServer,
        },
        //* Вариант 4 Плагины и Лоудеры
        {
            name:  'babel',
            entry: {
                main:  ['core-js/stable', 'regenerator-runtime/runtime', './src/js/index.js'],
                admin: ['core-js/stable', 'regenerator-runtime/runtime', './src/js/admin.js'],
            },
            output,
            mode,
            devtool,
            devServer,
            module: {
                rules: [
                    {
                        test:    /\.js$/,
                        exclude: /node_modules/,
                        use:     {
                            loader:  'babel-loader',
                            options: {
                                presets: ['@babel/preset-env'],
                                plugins: ['@babel/plugin-proposal-class-properties']
                            }
                        }
                    }
                ],
            },
        },
    ];
};
