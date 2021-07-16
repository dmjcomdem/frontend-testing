// @ts-check
import faker from 'faker';

const appUrl = 'http://localhost:8080';
const timeout = 15000;

const addTask = async (text) => {
  await expect(page).toFill('[data-testid="task-name-input"]', text);
  await expect(page).toClick('[data-testid="add-task-button"]');
};

const getRandomTitle = (countWords = 5) => faker.lorem.words(countWords);

describe('e2e-best-practices test', () => {
  beforeAll(async () => {
    await page.goto(appUrl);
  }, timeout);

  afterAll(async () => {
    await page.evaluate(() => {
      // eslint-disable-next-line no-underscore-dangle
      window.__worker__.resetHandlers();
    });
  }, timeout);

  test('Приложение открывается', async () => {
    await expect(page).toMatchElement('[data-testid="task-name-input"]');
    await expect(page).toMatchElement('[data-testid="add-task-button"]');
  }, timeout);

  test('Возможность добавлять задачи', async () => {
    const [titleTaskOne, titleTaskSecond] = [getRandomTitle(), getRandomTitle()];
    await addTask(titleTaskOne);
    await expect(page).toMatch(titleTaskOne);
    await addTask(titleTaskSecond);
    await expect(page).toMatch(titleTaskSecond);
  }, timeout);

  test('Возможность удалять задачи', async () => {
    const titleTaskOne = getRandomTitle();
    await addTask(titleTaskOne);
    await expect(page).toMatch(titleTaskOne);
    await expect(page).toClick('[data-testid*="remove-task-"]:last-child');
    await expect(page).not.toMatch(titleTaskOne);
  }, timeout);
});
