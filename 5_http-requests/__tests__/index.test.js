const nock = require('nock');
const axios = require('axios');
const { get, post } = require('../src/index.js');

nock.disableNetConnect();
axios.defaults.adapter = require('axios/lib/adapters/http');

const user = {
  firstname: 'Fedor',
  lastname: 'Sumkin',
  age: 33,
};

// BEGIN
afterEach(() => {
  nock.cleanAll();
});

afterAll(() => {
  nock.restore();
});

describe('http-метод get', () => {
  test('возвращает данные со статусом 200', async () => {
    const usersStub = Array.from({ length: 5 }, () => user);

    const scope = nock('https://example.com')
      .get('/users')
      .reply(200, usersStub);

    const { data, status } = await get('https://example.com/users');

    expect(data).toEqual(usersStub);
    expect(status).toBe(200);
    expect(scope.isDone()).toBe(true);
  });

  describe.each([400, 500])('обработка ошибок', (status) => {
    test(`для статуса ${status}`, async () => {
      const errorStatusMessage = new Error(`Request failed with status code ${status}`);

      const scope = nock('https://example.com')
        .get('/users')
        .reply(status, errorStatusMessage);

      await expect(get('https://example.com/users')).rejects.toThrowError(errorStatusMessage);
      expect(scope.isDone()).toBe(true);
    });
  });
});

describe('проверка http-метода post', () => {
  test('создаёт данные со статусом 201', async () => {
    const scope = nock('https://example.com')
      .post('/user', user)
      .reply(201, user);

    const { data, status } = await post('https://example.com/user', user);

    expect(data).toEqual(user);
    expect(status).toBe(201);
    expect(scope.isDone()).toBe(true);
  });

  describe.each([400, 500])('обработка ошибок', (status) => {
    test(`для статуса ${status}`, async () => {
      const errorStatusMessage = new Error(`Request failed with status code ${status}`);

      const scope = nock('https://example.com')
        .post('/user', {})
        .reply(status, errorStatusMessage);

      await expect(post('https://example.com/user', {})).rejects.toThrowError(errorStatusMessage);
      expect(scope.isDone()).toBe(true);
    });
  });
});
// END
