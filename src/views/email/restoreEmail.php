<?php

$subject   = 'Восстановление доступа';
$preheader = 'Получен запрос на восстановление доступа к системе';
$from = $getEmail('noreply');
$href = $getHref('/access-restore');

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title><?= $subject ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>

<body>
    <!-- PRE-HEADER TEXT -->
    <span style="display: none !important; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
        <?= $preheader ?>
    </span>
    <table style="width: 100%;">
        <thead></thead>
        <tfoot></tfoot>
        <tbody>
            <tr>
                <td>Здравствуйте!</td>
            </tr>
            <tr>
                <td>Получен запрос на восстановление доступа к системе</td>
            </tr>
            <tr>
                <td>Ваши новые данные для доступа:</td>
            </tr>
        </tbody>
        <tr>
            <td>
                <table style="width: 600px; margin: auto;">
                    <tr>
                        <td>Логин:</td>
                        <td><?= $email ?></td>
                    </tr>
                    <tr>
                        <td>Пароль:</td>
                        <td><?= $password ?></td>
                    </tr>
                    <tr align="center" style="height: 2rem;">
                        <td colspan="2">
                            <a href="<?= $href ?>">Восстановить доступ</a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tbody>
            <tr>
                <td>Сохраните эти данные</td>
            </tr>
            <tr>
                <td>В случае их утери, или при подозрении в их утечке, воспользуйтесь системой восстановления доступа для создания нового пароля</td>
            </tr>
            <tr>
                <td>Если Вы не отправляли запрос, то проигнорируйте это сообщение</td>
            </tr>
            <tr>
                <td>Успешной работы!</td>
            </tr>
        </tbody>
    </table>
</body>

</html>
