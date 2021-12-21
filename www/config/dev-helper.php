<?php

define('START', microtime(true));

function pre(string $func, $exp = null, string $name = '')
{
    echo '<pre>';
    if ($name) {
        echo "<strong>### $name: ###</strong><br>";
    }
    call_user_func($func, $exp);
    echo '</pre>';
}


function pr($exp, string $name = '')
{
    pre('print_r', $exp, $name);
}

function prd($exp, string $name = '')
{
    pr($exp, $name);
    echo '<pre>';
    debug_print_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS);
    echo '</pre>';
    showTime();
    exit;
}

function vd($exp, string $name = '')
{
    pre('var_dump', $exp, $name);
}

function vdd($exp, string $name = '')
{
    vd($exp, $name);
    echo '<pre>';
    debug_print_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS);
    echo '</pre>';
    showTime();
    exit;
}


function echoc($exp = null, string $name = '')
{
    echo '<pre>';
    if ($name) {
        echo "<strong>### $name: ###</strong>   ";
    }
    echo $exp;
    echo '</pre>';
}

function echod($exp = null, string $name = '')
{
    echoc($exp, $name);
    echo '<pre>';
    debug_print_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS);
    echo '</pre>';
    showTime();
    exit;
}


function showTime()
{
    $time = round((microtime(true) - START) * 1000, 3);
    echo "<p>Время выполнения скрипта: <strong>{$time}</strong> мс.</p>";
}

function method()
{
    $backTrace = debug_backtrace(DEBUG_BACKTRACE_IGNORE_ARGS, 2);
    $method = "{$backTrace[1]['class']}{$backTrace[1]['type']}{$backTrace[1]['function']}";
    // $method = "{$backTrace[1]['class']}::{$backTrace[1]['function']}";
    $line = $backTrace[0]['line'];
    echo '<pre>Метод: <strong>' . $method . '  </strong>Строка: <strong>' . $line . '</strong></pre>';
}

function whoAmI($file)
{
    echo '<br>Я файл <strong>' . basename($file) . '</strong> подключился из папки <strong>' . dirname($file) . '</strong><br>';
}

function newClassInstance($class)
{
    echo '<br>Cоздан объект класса <strong>' . $class . '</strong><br>';
}

function showRelPath($file)
{
    $absolute_path = dirname($file);
    $relative_path = str_replace(_ROOT_, '', $absolute_path);
    echo '<br>Относительный путь: ' . $relative_path . '<br>';
}

function server()
{
    $server_arr = [
        "DOCUMENT_ROOT",
        "REQUEST_SCHEME",
        "SERVER_NAME",
        "HTTP_HOST",
        "HTTP_USER_AGENT",
        "PHP_SELF",
        "SCRIPT_NAME",
        "SCRIPT_FILENAME",
        "REQUEST_METHOD",
        "REDIRECT_URL",
        "REQUEST_URI",
        "QUERY_STRING",
    ];

    echo '<br><table>';
    foreach ($server_arr as $value) {
        echo "<tr><td>\$_SERVER[$value]</td><td> ==> </td><td>$_SERVER[$value]</td></tr>";
    }
    echo '</table><br>';
}
