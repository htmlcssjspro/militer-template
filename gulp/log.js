'use strict';

const c = require('ansi-colors');

//******************************************************************************
//*** console.log()
//******************************************************************************
function logFile(message, filePath) {
    log(c.greenBright(pad(message)), c.magentaBright(filePath));
}
function logFTP(first, ...other) {
    log(pad(first), ...other); // eslint-disable-line no-console
}
function logHeader(...header) {
    console.log(title()); // eslint-disable-line no-console
    logLength(...header); // eslint-disable-line no-console
    console.log(title()); // eslint-disable-line no-console
}
function logLength(...args) {
    const text = [...args].join(' ' + title(3) + ' ');
    const textLength = text.replace(/\x1B\[\d\dm/g, '').length; // eslint-disable-line no-control-regex

    const strLength = 80;
    const startLength = 10;
    const padLength = strLength - startLength - textLength - 2;

    console.log(title(startLength), text, title(padLength)); // eslint-disable-line no-console
}
function logYellowFirst(first, ...other) {
    console.log(c.yellowBright(first), ...other); // eslint-disable-line no-console
}
function logWarning(...warning) {
    console.log(c.yellowBright('WARNING'), ...warning); // eslint-disable-line no-console
}
function logError(...error) {
    console.log(c.redBright('ERROR'), ...error); // eslint-disable-line no-console
}

//* Helpers
function log(...args) {
    let time = new Date().toTimeString().slice(0, 8);
    time = `[${c.gray(time)}]`;
    console.log(time, ...args); // eslint-disable-line no-console
}
function title(length = 80) {
    return c.cyanBright('#'.repeat(length));
}
function pad(message, length = 10) {
    return message.padEnd(length, ' ');
}

module.exports = {logFile, logFTP, logHeader, pad, logYellowFirst, logWarning, logError};
