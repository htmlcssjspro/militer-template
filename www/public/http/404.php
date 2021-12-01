<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404</title>
</head>

<body>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: sans-serif;
            font-weight: 400;
        }

        .errorPageBox {
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-direction: column;
            width: 100%;
            height: 100vh;
            background: url(/public/img/404/404_bg.jpg) 70%/cover no-repeat #050607;
            box-sizing: border-box;
        }

        .errorPageImage {
            width: 80%;
            max-width: 640px;
            height: 80%;
            background: url(/public/img/404/404_text.png) center/contain no-repeat;
        }

        .errorPageText {
            font-size: 18px;
            color: #3f3f3f;
            text-align: center;
            box-sizing: border-box;
            padding: 10px;
        }

        .errorPageText a {
            color: #a1a0a0;
        }
    </style>
    <div class="errorPageBox">
        <div class="errorPageImage"></div>
        <div class="errorPageText">Вы можете перейти на <a href="/">Главную</a>.</div>
    </div>
</body>

</html>
