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

    <header id="header" class="header">
        <?php getHeader('landing-header'); ?>
    </header>

    <main id="main" class="main">
        <?php getMainContent('home-page'); ?>
    </main>

    <footer id="footer" class="footer">
        <?php getFooter('landing-footer'); ?>
    </footer>

</body>

</html>
