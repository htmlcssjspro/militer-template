'use strict';

//*****************************************************************************
//*** Project Settings
//*****************************************************************************

const DEV = true; // * true | false
const USE_PHP = true; // * true | false
const INCLUDE_SCSS = false; // * true | false
const USE_FTP = true; // * true | false

//*****************************************************************************

const PROD = !DEV;
const MODE = DEV ? 'development' : 'production';

module.exports = {
    DEV,
    PROD,
    MODE,
    USE_PHP,
    INCLUDE_SCSS,
    USE_FTP,
};
