<!DOCTYPE html>
<html lang="ru">

<head>
    <?php getHead(); ?>
    <?php getLayoutCSS() ?>
    <?php getMainCSS() ?>
    <?php getLayoutJS() ?>
    <?php getMainJS() ?>
</head>

<body class="body">
    <?php getHeader('landing-header'); ?>
    <?php getMainContent('home-page'); ?>
    <?php getFooter('landing-footer'); ?>
    <?php getDesignGrid(); ?>
</body>

</html>
