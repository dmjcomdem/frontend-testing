const fc = require('fast-check');

const sort = (data) => data.slice().sort((a, b) => a - b);

// BEGIN
describe('sort', () => {
  test('метод не изменяет длинну массива', () => {
    fc.assert(
      fc.property(
        fc.array(fc.anything()), (list) => {
          const result = sort(list);
          expect(result.length).toBe(list.length);
        },
      ),
    );
  });

  test('метод сортрует целочисленные значения', () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer()), (list) => {
          const result = sort(list);
          expect(result).toBeSorted();
        },
      ),
    );
  });

  test('метод сортрует значения с плавающей точкой', () => {
    fc.assert(
      fc.property(
        fc.array(fc.float()), (list) => {
          const result = sort(list);
          expect(result).toBeSorted();
        },
      ),
    );
  });

  test('повторный вызов метода для отсортированного массива возарвщает тот же самый результат', () => {
    fc.assert(
      fc.property(
        fc.array(fc.anything()), (list) => {
          const sortedList = sort(list);
          const result = sort(sortedList);
          expect(result).toEqual(sortedList);
        },
      ),
    );
  });
});

// END
