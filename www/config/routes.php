<?php

$routes = [
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
];
