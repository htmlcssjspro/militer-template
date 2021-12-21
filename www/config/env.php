<?php

//* Directories for PHP
define('_ROOT_', dirname(__DIR__));

define('CONFIG',         _ROOT_ . '/config');
define('ERROR_LOG_FILE', _ROOT_ . '/log/errors.log');

define('_PUBLIC_',   _ROOT_ . '/public');
define('VIEWS',      _ROOT_ . '/views');
define('LAYOUT',     _ROOT_ . '/layout');
define('COMPONENTS', _ROOT_ . '/components');

define('PAGE_404', _PUBLIC_ . '/http/404.php');
define('PAGE_400', _PUBLIC_ . '/http/400.php');

//* Directories for pages & ajax
// define('ROOT', "{$_SERVER['REQUEST_SCHEME']}://{$_SERVER['SERVER_NAME']}");
$public = '/public';
define('JS',        $public . '/js');
define('CSS',       $public . '/css');
define('IMG',       $public . '/img');
define('UPLOADS',   $public . '/uploads');
define('DOWNLOADS', $public . '/downloads');

define('API',  '/api/v1');


define('DEV', true); // Установить в false на production

if (DEV) {
    ini_set('display_startup_errors', 1);
    ini_set('display_errors', 1);
    ini_set('error_reporting', -1);
    error_reporting(E_ALL);
    require CONFIG . '/dev-helper.php';
} else {
    error_reporting(0);
}
