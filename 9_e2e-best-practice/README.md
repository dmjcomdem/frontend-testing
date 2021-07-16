# E2E Практики

Протестируйте одностраничное приложение Simple Todo List. Приложение находится в директории *src*. Для подмены ответов бекенда используйте Mock Service Worker.

## Ссылки

* [Mock Service Worker](https://github.com/mswjs/msw)
* [Пример мока REST API в документации MSW](https://mswjs.io/docs/getting-started/mocks/rest-api)
* [smooth-code/jest-puppeteer](https://github.com/smooth-code/jest-puppeteer)

## Тест кейсы

1. Приложение открывается и на странице показывается поле ввода и кнопка "Add"
2. Задачи добавляются и отображаются на странице
3. Задачи можно удалять

## Подсказки

* Изучите *Makefile* там вы найдёте команды для запуска приложения и тестов
* После запуска приложение доступно по адресу http://localhost:8080/
* Для тестирования используйте data-testid атрибуты
* Обратите внимание на 14 строку в файле *src/index.jsx*. В файле *__mocks__/server.js*, должен быть использован метод `setupWorker()` для создания мока Service Worker, подробнее в документации [Configure worker](https://mswjs.io/docs/getting-started/integrate/browser)
