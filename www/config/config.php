<?php

use Admin\Controllers\AdminApiController;
use Admin\Controllers\AdminController;
use Main\Controllers\MainApiController;
use Main\Controllers\MainController;

return [

    'routes' => [
        'main' => [
            'route' => '/(?!api/)(?!admin(?:$|/$|/(?=.+)))',
            'controller' => MainController::class,
        ],
        'api' => [
            'route' => '/api/(?=.+)',
            'controller' => MainApiController::class,
        ],
        'admin' => [
            'route' => '/admin(?:$|/$|/(?=.+))(?!api/)',
            'controller' => AdminController::class,
        ],
        'adminApi' => [
            'route' => '/admin/api/(?=.+)',
            'controller' => AdminApiController::class,
        ],
    ],

    'email' => [
        'noreply' => 'noreply@htmlcssjs.pro',
    ],

    'emailBody' => [
        'restoreEmail' => MAIN_VIEWS . '/email/restoreEmail.php',
        'newAdmin'     => ADMIN_VIEWS . '/email/newAdmin.php',
    ],

    'dictionary' => [
        'username'      => 'Никнейм',
        'name'          => 'Имя',
        'email'         => 'Эл.почта',
        'phone'         => 'Телефон',
        'last_visit'    => 'Последний визит',
        'register_date' => 'Дата регистрации',
        'status'        => 'Статус',
        'user'          => 'Пользователь',
        'guest'         => 'Гость',
        'admin'         => 'Администратор',
        'superadmin'    => 'СуперАдмин',
        'blocked'       => 'Заблокирован',
    ],
];
