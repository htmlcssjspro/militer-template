<?php

session_start();

require dirname(__DIR__) . '/config/env.php';
require CONFIG . '/exception.php';
exceptionInit();
require CONFIG . '/config.php';
require CONFIG . '/dbconfig.php';
require CONFIG . '/functions.php';

getLayout('landing-layout');
