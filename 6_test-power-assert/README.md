# Power Assert

Протестируйте с использованием power-assert функцию `flattenDepth()` из библиотеки lodash, которая делает плоским вложенный массив.

У функции `flattenDepth()` есть опциональный второй аргумент, который может принимать различные значения. В том числе и некорректные. Не забудьте протестировать подобные кейсы.

```javascript
const { flattenDepth } = require('lodash')

const array = [1, [2, [3, [4]], 5]]; 
flattenDepth(array, 1);
// => [1, 2, [3, [4]], 5]
flattenDepth(array, 2);
// => [1, 2, 3, [4], 5]
```

## Ссылки

* [flattenDepth](https://lodash.com/docs/4.17.15#flattenDepth)
* [power-assert](https://github.com/power-assert-js/power-assert)
 