# Побочные эффекты

Напишите и протестируйте функцию `upVersion()`, которая обновляет указанную часть версии пакета.

**Параметры:**

* Путь до файла *package.json*
* Имя части версии пакета, которую необходимо обновить:
    * major
    * minor
    * patch — значение по умолчанию

```javascript
// Начальная версия в package.json 1.3.2

// 1.3.3
// По умолчанию 'patch'
upVersion('./package.json');

// 1.4.0
upVersion('./package.json', 'minor');

// 2.0.0
upVersion('./package.json', 'major');
```

## Ссылки

* [Semantic Versioning](https://semver.org)
* [fs](https://nodejs.org/api/fs.html)
* [path](https://nodejs.org/api/path.html)