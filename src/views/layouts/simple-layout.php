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

    <main id="main" class="main">
        <?php $this->getMainContent(); ?>
    </main>


    <?= $this->getMainCSS(); ?>
    <?= $this->getLayoutJS(); ?>
    <?= $this->getMainJS(); ?>

</body>

</html>
