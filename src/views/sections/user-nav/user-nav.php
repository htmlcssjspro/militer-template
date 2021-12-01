<section class="user__nav">
    <span>Привет <strong><?= $this->User->name ?></strong>!</span>
    <div class="user__preferences">
        <span>Баланс: <?= $this->User->balance ?> р.</span>
        <a href="/user">Личный кабинет</a>
        <a href="/user#orders">Мои заказы</a>
        <a href="/user#profile">Личная информация</a>
        <button class="btn_logout" type="button" data-href="/api/logout">Выйти</button>
    </div>
</section>
