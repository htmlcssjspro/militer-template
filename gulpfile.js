/* eslint-disable no-unused-vars */
'use strict';

//* Gulp Main
//* const {src, dest, watch, series, parallel} = require('gulp');
const {src, dest, watch} = require('gulp');

//* Gulp Common
// const rename     = require('gulp-rename');
// const webpConfig = {
//     preset      : 'default', // string: *default | photo | picture | drawing | icon | text
//     quality     : 75, // number: 0 - 100, *75
//     alphaQuality: 100, // number: 0 - 100, *100
//     method      : 4, // 0 (fastest) and 6 (slowest), *4
//     // size        : 100, // number: target size in bytes
//     sns         : 80, // number: 0 - 100, *80, Set the amplitude of spatial noise shaping
//     filter      : 0, // number: deblocking filter strength between 0 (off) and 100
//     autoFilter  : false, // boolean: Adjust filter strength automatically
//     sharpness   : 0, // number: *0, filter sharpness between 0 (sharpest) and 7 (least sharp)
//     lossless    : false, // boolean: *false, Encode images losslessly
//     nearLossless: 100, // number: 0-100, *100, Encode losslessly with an additional lossy pre-processing step, with a quality factor between 0 (maximum pre-processing) and 100 (same as lossless)
//     // crop        : {x: number, y: number, width: number, height: number},
//     // resize  : { width: number, height: number },
//     metadata    : 'none', // string | string[], *none | all | exif | icc | xmp
//     // buffer: // Buffer: Buffer to optimize
// };
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const webp = require('gulp-webp');
const del = require('del');

//* SCSS
const sass = require('gulp-sass')(require('sass'));
const sassGlob = require('gulp-sass-glob');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const gcmq = require('gulp-group-css-media-queries');

//* npm CommonJS
const path = require('path');
const c = require('ansi-colors');
const through2 = require('through2');

//* Militer Helpers
const {logFile, logFTP, logHeader, pad, logYellowFirst, logWarning} = require('./gulp/log.js');
const {execute, slash} = require('./gulp/helpers.js');

//* FTP
const vinylFtp = require('vinyl-ftp');
const ftpConfig = require('./gulp/ftpConfig');
let ftp = {};
ftp = vinylFtp.create({
    host:           ftpConfig.host,
    user:           ftpConfig.user,
    password:       ftpConfig.password,
    parallel:       8,
    maxConnections: 1024,
    reload:         true,
    log:            logFTP,
});
ftp.root = ftpConfig.root ? ftpConfig.root : '/';


//*****************************************************************************
//*** Project Settings
//*****************************************************************************
const DEV = true; // * true | false
const PROD = !DEV;
const USE_PHP = true; // * true | false
const INCLUDE_SCSS = false; // * true | false
const USE_FTP = false; // * true | false

//*****************************************************************************

const mode = DEV ? 'development' : 'production';


const config = {};

config.root = process.cwd();
config.src = 'src';
config.www = 'www';
config.pub = `${config.www}/public`;


config.php = {};
config.php.srcWatchGlobs = [
    `${config.src}/components/**/*.php`,
    `${config.src}/layout/**/*.php`,
    `${config.src}/views/**/*.php`,
];
config.php.ftpWatchGlobs = [
    `${config.www}/config/**/*.php`,
    `${config.www}/components/**/*.php`,
    `${config.www}/layout/**/*.php`,
    `${config.www}/views/**/*.php`,
    `${config.pub}/index.php`,
];

config.js = {};
config.js.src = `${config.src}/js`;
config.js.pub = `${config.pub}/js`;
config.js.srcGlobs = `${config.js.src}/**/*.js`;
config.js.watchGlobs = `${config.js.src}/**/*.?(m)js`;
config.js.pubGlobs = `${config.js.pub}/**/*.js?(.map)`;

config.scss = {};
config.scss.src = `${config.src}/scss`;
config.scss.pub = `${config.pub}/css`;
// config.scss.srcGlobs = [
//     `${config.scss.src}/**/*.scss`,
//     '!**/_*.scss'
// ];
config.scss.srcGlobs = `${config.scss.src}/**/!(_)*.scss`;
config.scss.watchGlobs = [
    `${config.scss.src}/**/*.scss`,
    `${config.src}/assets/**/*.scss`,
    `${config.src}/components/**/*.scss`,
    `${config.src}/layout/**/*.scss`,
    `${config.src}/views/**/*.scss`,
];

config.css = {};
config.css.src = `${config.src}/css`;
config.css.pub = `${config.pub}/css`;
config.css.srcGlobs = `${config.css.src}/**/*.css`;
config.css.pubGlobs = `${config.css.pub}/**/*.css?(.map)`;

config.img = {};
config.img.src = `${config.src}/img`;
config.img.pub = `${config.pub}/img`;
config.img.srcGlobs = `${config.img.src}/**`;
config.img.pubGlobs = `${config.img.pub}/**`;

// config.restPubGlobs = `${config.pub}/**/*.(txt|xml|json)`; // work
config.restPubGlobs = [
    `${config.www}/.htaccess`,
    `${config.pub}/*.{html,txt,xml,ico,json}`, // work too //! NO Spases in brases !
];
USE_PHP && config.restPubGlobs.push(`${config.www}/log/errors.log`);


config.srcWatchGlobs = [
    config.js.watchGlobs,
    config.scss.watchGlobs,
    config.css.srcGlobs,
].flat();
USE_PHP && (config.srcWatchGlobs = config.srcWatchGlobs.concat(config.php.srcWatchGlobs));

config.ftpGlobs = [
    config.js.pubGlobs,
    config.css.pubGlobs,
    config.restPubGlobs,
].flat();
USE_PHP && (config.ftpGlobs = config.ftpGlobs.concat(config.php.ftpWatchGlobs));


const options = {};

options.src = {};
options.dest = {};
options.watch = {
    cwd:                    process.cwd(),
    delay:                  300,
    ignorePermissionErrors: true,
    events:                 ['all'],
};
options.ftp = {
    base:   config.www,
    buffer: false,
};
options.ftpClean = {
    base:   ftp.root,
    buffer: false,
};


//******************************************************************************
//*** Watchers
//******************************************************************************

function watcher() {
    logHeader(
        c.greenBright('Gulp START'),
        c.greenBright('Mode: ') + c.yellowBright(mode),
        c.greenBright('USE_FTP: ') + c.magentaBright(USE_FTP)
    );

    //* options.watch.events = ['add', 'addDir', 'change', 'unlink', 'unlinkDir', 'ready'];
    //* options.watch.events = ['all'];
    const scanMessage = 'scan complete. Ready for changes';


    //* SRC Watcher
    options.watch.events = ['change', 'add', 'unlink', 'ready'];
    const srcWatcher = watch(config.srcWatchGlobs, options.watch);
    srcWatcher.on('ready', () => logYellowFirst(pad('SRC', 3), scanMessage));
    srcWatcher.on('change', filePath => dispatch(change, filePath, c.bold.inverse(pad('CHANGESRC'))));
    srcWatcher.on('add', filePath => dispatch(change, filePath, c.bold.inverse(pad('ADDSRC'))));
    srcWatcher.on('unlink', filePath => dispatch(srcUnlink, filePath, c.bold.inverse(pad('DELSRC'))));


    //* IMG Watcher
    options.watch.events = ['change', 'add', 'unlink', 'ready'];
    const imgWatcher = watch(config.img.srcGlobs, options.watch);
    imgWatcher.on('ready', () => logYellowFirst(pad('IMG', 3), scanMessage));
    imgWatcher.on('add', filePath => dispatch(img, filePath, 'ADDImgLoc'));
    imgWatcher.on('change', filePath => dispatch(img, filePath, 'CHGImgLoc'));
    imgWatcher.on('unlink', filePath => dispatch(imgUnlink, filePath, 'DELImgLoc'));


    //* FTP Watcher
    options.watch.events = ['all'];
    const ftpWatcher = watch(config.ftpGlobs, options.watch);
    ftpWatcher.on('ready', () => logYellowFirst(pad('FTP', 3), scanMessage));
    ftpWatcher.on('change', filePath => dispatch(ftpCopy, filePath, 'CHANGELoc'));
    ftpWatcher.on('add', filePath => dispatch(ftpCopy, filePath, 'ADDLoc'));
    ftpWatcher.on('addDir', folderPath => dispatch(ftpCopy, folderPath, 'ADDDirLoc'));
    ftpWatcher.on('unlink', filePath => dispatch(ftpUnlink, filePath, 'DELLoc'));
    ftpWatcher.on('unlinkDir', folderPath => dispatch(ftpUnlinkDir, folderPath, 'RMDirLoc'));
}

//* options.watch.events = ['add', 'addDir', 'change', 'unlink', 'unlinkDir', 'ready'];
//* options.watch.events = ['all'];
const scanMessage = 'scan complete. Ready for changes';
function logInitial() {
    logHeader(
        c.greenBright('Gulp START'),
        c.greenBright('Mode: ') + c.yellowBright(mode),
        c.greenBright('USE_FTP: ') + c.magentaBright(USE_FTP)
    );
}

//* SRC Watcher
function srcWatcher() {
    options.watch.events = ['change', 'add', 'unlink', 'ready'];
    const srcWatcher = watch(config.srcWatchGlobs, options.watch);
    srcWatcher.on('ready', () => logYellowFirst(pad('SRC', 3), scanMessage));
    srcWatcher.on('change', filePath => dispatch(change, filePath, c.bold.inverse(pad('CHANGESRC'))));
    srcWatcher.on('add', filePath => dispatch(change, filePath, c.bold.inverse(pad('ADDSRC'))));
    srcWatcher.on('unlink', filePath => dispatch(srcUnlink, filePath, c.bold.inverse(pad('DELSRC'))));
}

//* IMG Watcher
function imgWatcher() {
    options.watch.events = ['change', 'add', 'unlink', 'ready'];
    const imgWatcher = watch(config.img.srcGlobs, options.watch);
    imgWatcher.on('ready', () => logYellowFirst(pad('IMG', 3), scanMessage));
    imgWatcher.on('add', filePath => dispatch(img, filePath, 'ADDImgLoc'));
    imgWatcher.on('change', filePath => dispatch(img, filePath, 'CHGImgLoc'));
    imgWatcher.on('unlink', filePath => dispatch(imgUnlink, filePath, 'DELImgLoc'));
}

//* FTP Watcher
function ftpWatcher() {
    options.watch.events = ['all'];
    const ftpWatcher = watch(config.ftpGlobs, options.watch);
    ftpWatcher.on('ready', () => logYellowFirst(pad('FTP', 3), scanMessage));
    ftpWatcher.on('change', filePath => dispatch(ftpCopy, filePath, 'CHANGELoc'));
    ftpWatcher.on('add', filePath => dispatch(ftpCopy, filePath, 'ADDLoc'));
    ftpWatcher.on('addDir', folderPath => dispatch(ftpCopy, folderPath, 'ADDDirLoc'));
    ftpWatcher.on('unlink', filePath => dispatch(ftpUnlink, filePath, 'DELLoc'));
    ftpWatcher.on('unlinkDir', folderPath => dispatch(ftpUnlinkDir, folderPath, 'RMDirLoc'));
}

function dispatch(func, filePath, message) {
    filePath = slash(filePath);
    logFile(message, filePath);
    setTimeout(() => func(filePath), 300);
}

function change(filePath) {
    const ext = path.extname(filePath);

    switch (ext) {
        // case '.html':
        // case '.json':
        // case '.htaccess':
        //     ftpCopy(filePath);
        //     break;
        case '.php':
            copy(filePath);
            break;
        case '.js':
        case '.mjs':
            js(filePath);
            break;
        case '.scss':
            scss(filePath);
            break;
        case '.css':
            css(filePath);
            break;
    }
}


//******************************************************************************
//*** COPY
//******************************************************************************
function copy(filePath) {
    return src(filePath, {base: config.src})
        .pipe(dest(config.www));
}


//******************************************************************************
//*** JavaScript
//******************************************************************************
function js(filePath) {
    {
        //* process.env.entry = JSON.stringify({name: path});
        //* process.env.entryName = 'name'; //* default 'main' in webpack.common.js
        //* process.env.entryPath = 'src/path'; //* abslute or relative path; default 'src/js/main.js' in webpack.common.js
        //* process.env.outputFilename = '[name].js'; //* default '[name].js' in webpack.common.js
        //* process.env.outputPath = config.js.pub; //* abslute or relative path, default 'public/js' in webpack.common.js
    }

    const command = 'npx webpack --config webpack/webpack.gulp.js';
    process.env.mode = mode;
    if (path.extname(filePath) === '.mjs') {
        const entry = {};
        return src(config.js.srcGlobs, {base: config.js.src})
            .pipe(through2.obj(function(file, enc, cb) {
                let {name} = path.parse(file.path);
                const {relDir} = getDest(file.path, file.base);
                name = path.posix.join(relDir, name);
                const entryPath = slash(file.path);
                const data = {[name]: entryPath};
                // this.push(data);
                cb(null, data);
            }))
            .on('data', data => Object.assign(entry, data))
            .on('end', () => {
                process.env.name = 'All JS files';
                process.env.entry = JSON.stringify(entry);
                process.env.outputPath = config.js.pub;
                execute(command);
            });
    } else {
        const {name} = path.parse(filePath);
        const {relDir} = getDest(filePath, config.js.src);
        process.env.name = name;
        process.env.entryName = path.posix.join(relDir, name);
        process.env.entryPath = filePath;
        process.env.outputPath = config.js.pub; // default
        execute(command);
    }
}


//******************************************************************************
//*** SCSS, CSS
//******************************************************************************
function scss(filePath) {
    const sourceMapPath = 'maps';
    const sourceRoot = path.posix.join('/', config.scss.src);

    const _src = filePath.startsWith(config.scss.src);
    const module = path.basename(filePath).startsWith('_');
    const globs = module ? config.scss.srcGlobs : filePath;

    INCLUDE_SCSS && _src && copy(filePath);

    return src(globs, {base: config.scss.src})
        .pipe(gulpif(DEV, sourcemaps.init()))
        .pipe(gulpif(DEV, sourcemaps.identityMap()))
        // .pipe(sassGlob())
        .pipe(sass.sync({includePaths: [config.src, 'node_modules']})
            .on('error', sass.logError))
        .pipe(gulpif(DEV,
            postcss([autoprefixer()]),
            postcss([autoprefixer(), cssnano()]))
        )
        .pipe(gulpif(DEV,
            sourcemaps.write(sourceMapPath, {sourceRoot}))
        )
        .pipe(gulpif(PROD, gcmq()))
        .pipe(dest(config.scss.pub));
}

function css(filePath) {
    const sourceMapPath = 'maps';
    const sourceRoot = path.posix.join('/', config.css.src);
    return src(filePath, {base: config.css.src})
        .pipe(gulpif(DEV, sourcemaps.init()))
        .pipe(gulpif(DEV,
            postcss([autoprefixer()]),
            postcss([autoprefixer(), cssnano()])
        ))
        .pipe(gulpif(DEV,
            sourcemaps.write(sourceMapPath, {sourceRoot}))
        )
        .pipe(gulpif(PROD, gcmq()))
        .pipe(dest(config.css.pub));
}


//******************************************************************************
//*** Unlink
//******************************************************************************

function srcUnlink(filePath) {
    const ext = path.extname(filePath);
    const php = ext === '.php';
    const js = ext === '.js';
    // const mjs = ext === '.mjs';
    const scss = ext === '.scss';
    const css = ext === '.css';

    const src = php && config.src || js && config.js.src || scss && config.scss.src || css && config.css.src;
    const out = php && config.www || js && config.js.pub || scss && config.scss.pub || css && config.css.pub;
    filePath = scss ? filePath.replace('.scss', '.css') : filePath;
    const {relFile, destFile} = getDest(filePath, src, out);
    del(destFile);
    del(path.posix.join(out, 'maps', relFile + '.map'));
}


//******************************************************************************
//*** FTP
//******************************************************************************

function ftpCopy(globs) {
    return USE_FTP && src(globs, options.ftp)
        .pipe(ftp.dest(ftp.root))
        .on('data', file => logFile('COPYFTP', getDest(file.path, options.ftp.base).ftpFile));
}

function ftpCopyNewer(globs) {
    return USE_FTP && src(globs, options.ftp)
        .pipe(ftp.newer(ftp.root))
        .pipe(ftp.dest(ftp.root));
}
function ftpUnlink(filePath) {
    if (USE_FTP) {
        const {ftpFile} = getDest(filePath);
        ftp.delete(ftpFile, () => logFile('DELFTP', ftpFile));
    }
}
function ftpUnlinkDir(folderPath) {
    if (USE_FTP) {
        const {ftpFile} = getDest(folderPath);
        ftp.rmdir(ftpFile, () => logFile('RMDIRFTP', ftpFile));
    }
}


//******************************************************************************
//*** Image
//******************************************************************************
function img(filePath) {
    return src(filePath, {base: config.img.src})
        .pipe(dest(config.img.pub))
        // .pipe(webp(webpConfig))
        .pipe(webp())
        .pipe(dest(config.img.pub));
}
function imgUnlink(filePath) {
    const {name} = path.parse(filePath);
    const {destDir} = getDest(filePath, config.img.src, config.img.pub);
    del(path.posix.join(destDir, name + '.*'));
}


//******************************************************************************
//*** Refresh Remote Files
//******************************************************************************
function ftpRefresh(cb) {
    if (USE_FTP) {
        const cleanGlobs = config.ftpGlobs.map(item => path.posix.join(ftp.root, item));
        cleanGlobs.push('/*');
        return src(config.ftpGlobs, options.ftp)
            .pipe(ftp.newer(ftp.root))
            .pipe(ftp.dest(ftp.root))
            .on('end', () => ftp.clean(cleanGlobs, config.www, options.ftpClean));
    } else {
        logWarning('USE_FTP = false');
        cb();
    }
}


//******************************************************************************
//*** Helpers
//******************************************************************************
function getDest(globs, src = config.src, out = config.www) {
    let filePath = Array.isArray(globs) ? globs[0] : globs;
    filePath = filePath.replace('/**/', '/');
    const relFile  = slash(path.relative(src, filePath));
    const relDir   = path.posix.dirname(relFile);
    const destFile = path.posix.join(out, relFile);
    const destDir  = path.posix.join(out, path.posix.dirname(relFile));
    const ftpFile  = path.posix.join(ftp.root, relFile);
    const ftpDir   = path.posix.join(ftp.root, path.posix.dirname(relFile));
    return {relFile, relDir, destFile, ftpFile, destDir, ftpDir};
}




//******************************************************************************
//*** TEST
//******************************************************************************

function test(cb) {

    cb(); // work
}



exports.default = watcher;

exports.ftpRefresh = ftpRefresh;

exports.test = test;
