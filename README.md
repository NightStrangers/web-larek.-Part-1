# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```
## Архитектура
![alt text](uml-larek.jpg)

1. Класс User
Реализует пользователя. Содержит id, email, номер, адрес пользователя. 
Класс имеет такие методы: 
* validateEmail, validatePhone - для проверки валидности email и номера телефона
* login(password:string), logout() - для входа и выхода 
* addAddress(addres:Addres), removeAddres(addresId:string) - для добавления и удаления адреса пользователя

2. Класс Order
Реализует оформление заказа пользователя. Содержит id заказа, id пользователя, список товаров, адрес доставки, способ оплаты.
Имеет метод 0