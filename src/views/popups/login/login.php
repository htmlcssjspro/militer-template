<section class="popup login dn">
    <div class="popup__wrapper">
        <form action="/api/login" method="POST">
            <input type="hidden" name="csrf" value="<?= $_SESSION['csrf_token'] ?>">
            <label>
                <span>Email</span>
                <span><input name="login" type="email" data-required="required"></span>
            </label>
            <label>
                <span>Пароль</span>
                <span><input name="password" type="password" data-required="required"></span>
            </label>
            <button class="btn_login" type="submit">Войти</button>
            <button class="btn_access-restore" type="button" data-popup="access-restore">Восстановить доступ</button>
            <button class="btn_register" type="button" data-popup="register">Зарегистрироваться</button>
        </form>
    </div>
</section>
