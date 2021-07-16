# Тестирование HTTP запросов

Протестируйте функции CRUD для управления пользователями

Напишите и протестируйте функцию `get()`, которая выполняет GET запрос по указанному URL и возвращает тело ответа.
Напишите и протестируйте функцию `post()`, которая выполняет POST запрос по указанному URL и принимает тело запроса вторым аргументом.
Для подмены ответа используйте библиотеку (nock)[https://github.com/nock/nock].

```javascript
// fetch list of users
get('https://example.com/users');

// create user
post('https://example.com/users', {
  firstname: 'Fedor',
  lastname: 'Sumkin',
  age: 33
});
```

## Ссылки

* (Axios)[https://github.com/axios/axios]
* (Nock)[https://github.com/nock/nock]
* (Mocks Aren't Stubs)[https://martinfowler.com/articles/mocksArentStubs.html]
* (Httpbin)[https://httpbin.org/]
