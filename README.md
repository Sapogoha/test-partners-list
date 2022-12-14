[![Build status](https://ci.appveyor.com/api/projects/status/95o5jk0vm0d2lkok?svg=true)](https://ci.appveyor.com/project/Sapogoha/test-partners-list)

# Тестовое задание на позицию «Frontend-разработчик стажер на React»

## Demo

[GitHub Pages](https://sapogoha.github.io/test-partners-list)

## Описание задания:

Создайте сайт на React + Redux, в котором на главной странице отображается список карточек пользователей и по клику на каждую карточку открывается страница с детальной информацией о пользователе. Список пользователей доступен только для зарегистрированных пользователей. Сайт должен быть адаптивным.
[Макет](https://www.figma.com/file/Nw9TJYCeh8Tmi9cX3KxyqO/%D0%A2%D0%B5%D1%81%D1%82%D0%BE%D0%B2%D0%BE%D0%B5.-%D0%A4%D1%80%D0%BE%D0%BD%D1%82%D0%B5%D0%BD%D0%B4?node-id=0%3A1)

1. Регистрация и авторизация должны осуществляться через email/password. Проверять на валидность все входные данные и выводить ошибку при невалидных данных
   Токен необходимо сохранять в памяти браузера и удалять после нажатия на кнопку “выход”
1. Страница всех пользователей. На этой странице отображаются все пользователи.
1. Страница пользователя отображает данные конкретного пользователя

   Для запросов можно использовать https://reqres.in/ или любой другой сервис предоставляющий такие данные.

## Использованные технологии:

TypeScript, React, Redux, SCSS

## Развернуть проект локально:

`git clone https://github.com/Sapogoha/test-mindbox-todo.git`

`npm i && npm run start`

## Войти в лк:

lkz входа используйте email `eve.holt@reqres.in` и любой пароль

### Примечания

В связи с ограничениями https://reqres.in/ и отсутствием полноценного бэка пошел на некоторые упрощения:

1. Захардкодил описание профиля и телефон партнера (в идеале получаю эти данные в ответе на эапрос и поступаю как с email, который собственно приходит)
1. При регистрации подменяю введенные данные на email с которым регистрация проходит
1. Сохраняю лайки через localStorage
