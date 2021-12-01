<section class="popup register dn">
    <div class="popup__wrapper">
        <p>Здравствуйте!<br>Заполните, пожалуйста, все поля со звездочкой!<br>На Ваш е-мейл, указанный при регистрации, придет пара логин-пароль для первого входа на сайт.<br>После этого Вы сможете изменить логин и пароль, сгенерированные системой, на более удобные для Вас в разделе МОЯ СТРАНИЦА.</p>
        <form action="/api/register" method="POST">
            <input type="hidden" name="csrf" value="<?= $_SESSION['csrf_token'] ?>">
            <label>
                <span>Логин *</span>
                <span><input name="login" type="text" placeholder="Логин" data-required="required"></span>
            </label>
            <span>Логин будет отображаться везде на сайте и в форуме. По нему Вас будут узнавать другие участники</span>
            <br>
            <label>
                <span>Имя *</span>
                <span><input name="name" type="text" placeholder="Имя" data-required="required"></span>
            </label>
            <span>Имя может быть вымышленным, только не удивляйтесь, что по этому имени к вам будут обращатсья в оффлайне )) например, при встрече-раздаче. Это имя видит только организатор</span>
            <br>
            <label>
                <span>Email *</span>
                <span><input name="email" type="email" placeholder="exemple@gmail.com" data-required="required"></span>
            </label>
            <span>Убедитесь, что Email существует - на него придут логин и пароль для первого входа в систему, и на него же вы сможете восстановить логин и пароль при их утрате</span>
            <br>
            <label>
                <span>Пароль *</span>
                <span><input name="new_password" type="password" placeholder="password" data-required="required"></span>
            </label>
            <label>
                <span>Пароль еще раз *</span>
                <span><input name="confirm_new_password" type="password" placeholder="password" data-required="required"></span>
            </label>
            <span>Придумайте пароль</span>
            <br>
            <label>
                <span>Телефон</span>
                <span><input name="phone" type="tel" placeholder="+7 999 999 99 99"></span>
            </label>
            <span>Можете не указывать, но если организатору потребуется оперативно связаться с Вами, телефон может быть весьма полезен.</span>
            <br>
            <!-- <span>Здесь можно написать пару слов о себе</span>
            <textarea name="about"></textarea> -->
            <!-- <span class="error_common">Заполните обязательные поля</span> -->
            <br>
            <button class="btn" type="submit">Зарегистрироваться</button>
        </form>
    </div>
</section>
