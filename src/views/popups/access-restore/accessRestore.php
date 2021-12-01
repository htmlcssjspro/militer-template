<section class="popup access-restore dn">
    <div class="popup__wrapper">
        <form action="/api/access-restore" method="POST">
            <input type="hidden" name="csrf" value="<?= $_SESSION['csrf_token'] ?>">
            <label>
                <span>Email</span>
                <span><input name="email" type="email" data-required="required"></span>
            </label>
            <br>
            <button class="btn" type="submit">Восстановить доступ</button>
        </form>
    </div>
</section>
