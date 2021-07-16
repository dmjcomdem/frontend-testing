const faker = require('faker');

/**
 * helpers.createTransaction
 * {
 *   amount: '78.61',
 *   date: 2012-02-01T18:00:00.000Z,
 *   business: 'Crooks Inc',
 *   name: 'Personal Loan Account 5613',
 *   type: 'invoice',
 *   account: '91987600'
 * }
 */

// BEGIN
describe('helpers.createTransaction', () => {
  test('соотвествует ключам объекта', () => {
    const transaction = faker.helpers.createTransaction();
    const resultKeys = Object.keys(transaction);
    const keys = ['amount', 'date', 'business', 'name', 'type', 'account'];
    expect(resultKeys).toMatchObject(keys);
  });

  test('соотвествует сгенерированным типам данных', () => {
    const result = faker.helpers.createTransaction();
    expect(result).toMatchObject({
      amount: expect.stringMatching(/\d+\.\d+/g),
      date: expect.any(Date),
      business: expect.any(String),
      name: expect.any(String),
      type: expect.any(String),
      account: expect.stringMatching(/\d/g),
    });
  });

  test('новый вызов функции, генерирует новый объект с новыми данными', () => {
    const resultDataOne = faker.helpers.createTransaction();
    const resultDataTwo = faker.helpers.createTransaction();
    expect(resultDataOne).not.toMatchObject(resultDataTwo);
    expect(resultDataOne).not.toBe(resultDataTwo);
  });
});
// END
