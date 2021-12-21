<?php


function exceptionInit()
{
    set_error_handler('errorHandler', E_ALL);
    set_exception_handler('exceptionHandler');
}

function errorHandler($code, $message, $file, $line)
{
    $severity = E_ALL;
    throw new ErrorException($message, $code, $severity, $file, $line);
}

function exceptionHandler(Throwable $exception)
{
    $errors = [
        -1                  => 'CORE_EXCEPTION',
        0                   => 'FATAL_ERROR',
        1045                => 'SQLSTATE[HY000]',
        1049                => 'FATAL_PDO_ERROR',
        E_ALL               => 'E_ALL',
        E_ERROR             => 'FATAL_ERROR',
        E_WARNING           => 'WARNING',
        E_PARSE             => 'PARSE_ERROR',
        E_NOTICE            => 'NOTICE',
        E_CORE_ERROR        => 'FATAL_CORE_ERROR',
        E_CORE_WARNING      => 'CORE_WARNING',
        E_COMPILE_ERROR     => 'FATAL_COMPILE_ERROR',
        E_COMPILE_WARNING   => 'COMPILE_WARNING',
        E_USER_ERROR        => 'FATAL_USER_ERROR',
        E_USER_WARNING      => 'USER_WARNING',
        E_USER_NOTICE       => 'USER_NOTICE',
        E_STRICT            => 'STRICT_ERROR',
        E_RECOVERABLE_ERROR => 'FATAL_RECOVERABLE_ERROR',
        E_DEPRECATED        => 'DEPRECATED_WARNING',
        E_USER_DEPRECATED   => 'USER_DEPRECATED_WARNING',
    ];

    if (DEV) {
        $code = $exception->getCode();
        echo '<div>';
        echo '<h1>' . ($errors[$code] ?? $code) . " [$code]" . '</h1>';
        echo '<table><tr><td>Класс</td><td><strong>' . get_class($exception) . '</strong></td></tr>';
        echo "<tr><td>Сообщение</td><td>{$exception->getMessage()}</td></tr>";
        echo "<tr><td>Файл</td><td><strong>{$exception->getFile()}</strong></td></tr>";
        echo "<tr><td>Строка</td><td><strong>{$exception->getLine()}</strong></td></tr>";
        // echo '<tr><td>Предыдущий обработчик</td><td><strong>' . $exception->getPrevious() . '</strong></td></tr>';
        echo "<tr><td valign=\"top\">Трассировка</td><td><pre>{$exception->getTraceAsString()}</pre></td></tr></table>";
        echo '</div>';
    } else {
        echo '<h1>Ошибка</h1>';
        $message = str_repeat("=", 80) . "\n" . date('Y.m.d H:i:s') . ' => ' . $exception->__toString() . "\n\n";
        error_log($message, 3, ERROR_LOG_FILE);
    }
}
