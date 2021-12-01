<!DOCTYPE html>
<html lang="ru">

<head>
    <?php $this->getHead(); ?>
    <?= $this->getLayoutCSS() ?>
    <?= $this->getMainCSS(true) ?>
    <?= $this->getLayoutJS(true) ?>
    <?= $this->getMainJS(true) ?>
</head>

<body class="body">

    <header id="header" class="header">
        <?php $this->getHeader(); ?>
    </header>

    <main id="main" class="main">
        <?php $this->getMainContent(); ?>
    </main>

    <footer id="footer" class="footer">
        <?php $this->getComponent('footer'); ?>
    </footer>

    <?= $this->getMainCSS(); ?>
    <?= $this->getLayoutJS(); ?>
    <?= $this->getMainJS(); ?>

</body>

</html>
