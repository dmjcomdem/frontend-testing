# Примеры тестирования frontend-приложений

Данные материалы является моим решением заданий интенсива по [тестированию фронтенда](https://ru.hexlet.io/programs/frontend-testing-react). Все задачи разбиты на отдельные модули, с описанием того, что нужно сделать. Готовый код тестов описан в папке `__tests__` каждого модуля. Всё это можно взять за основу, и использовать как комплексные примеры по тестированию.

## Основные модули

1. **unit-tests** — тестирование функции `Object.assign()`
2. **property-based** — тестирование функции сортировки используя [fast-check](https://github.com/dubzzz/fast-check)
3. **complex-data** — тестирование метода `helpers.createTransaction()` через [Faker.js](https://github.com/Marak/faker.js)
4. **side-effects** — тестирование функции `upVersion()`, которая обновляет версии пакета
5. **http-requests** — тестирование функции CRUD для управления пользователями
6. **power-assert-and-timers** — тестирование с использованием power-assert функцию `flattenDepth()`
7. **webdrivers** — тестирование с помощью инструмента Puppeteer
8. **e2e-testing** — тестирование с помощью инструмента smooth-code/jest-puppeteer
9. **e2e-best-practice** — пример тестирования одностраничное приложение Simple Todo List
10. **jsdom** — тестирование **Todo List** c помощью матчеров jest-dom
11. **testing-library-dom** — тестирование приложение **Todo List** c помощью инструментов dom-testing-library и user-event
12. **react-testing-library** — тестирование React-компонента (поля с автодополнением списка стран)
13. **testing-library-best-practice** — тестирование записной книжки с помощью React Testing Library


## Примеры проектов

[react-todo-application](https://github.com/dmjcomdem/testing-react-todo-application) — пример тестирования todo-list приложения на React

[page-loader](https://github.com/dmjcomdem/page-loader-cli) — пример тестирования простого cli-инструмента на node.js для сохранения веб-страниц

