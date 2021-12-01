'use strict';

const root = process.cwd();
const path = require('path');

const { exec } = require('child_process');
const { logYellowFirst, logError } = require('./log.js');

//******************************************************************************
//*** Helpers
//******************************************************************************
function slash(filePath) {
    return filePath.split(path.sep).join(path.posix.sep);
}
function resolve(relPath) {
    return slash(path.resolve(root, relPath));
}

function execute(command, cb = () => {}) {
    exec(command, (error, stdout, stderr) => {
        logYellowFirst('Command:', command);
        error && logError(error);
        console.log(stdout); // eslint-disable-line no-console
        stderr && logError('stderr:', stderr);
        cb();
    });
}

{
// function spawner(command, args, options = undefined, cb) {
//     logYellowFirst('Command:', command);
//     let child;
//     if (options) {
//         child = spawn(command, args, options);
//     } else {
//         child = spawn(command, args);
//     }

//     child.stdout.on('data', data => {
//         console.log(data); // eslint-disable-line no-console
//     });
//     child.stderr.on('data', data => {
//         console.error(data);
//     });
//     child.on('close', code => {
//         console.log(`child process exited with code ${code}`); // eslint-disable-line no-console
//         cb(code);
//     });
// }
}

// module.exports = {execute, spawner, slash, resolve};
module.exports = {execute, slash, resolve};
