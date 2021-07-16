require('expect-puppeteer');
const faker = require('faker');

const appUrl = 'http://localhost:5000';
const appArticlesUrl = `${appUrl}/articles`;

describe('it works', () => {
  // BEGIN
  beforeAll(async () => {
    await page.goto(appUrl, { waitUntil: 'domcontentloaded' });
  });

  test('Главная страница приложения открывается', async () => {
    await page.goto(appUrl);
    await expect(page).toMatch('Welcome to a Simple blog!');
  });

  test('Перейти на страницу со всеми статьями и увидеть там их список', async () => {
    await page.goto(appArticlesUrl);
    const articlesTableRows = await page.$$('[data-testid="article-name"]');
    await expect(articlesTableRows.length).toBeGreaterThan(0);
  });

  test('Можем нажать на кнопку создать статью и увидеть форму', async () => {
    await page.goto(appArticlesUrl);
    await page.click('[data-testid="article-create-link"]');
    await expect(page).toMatchElement('[data-testid="article-form"]');
  });

  test('Может заполнить форму и создать новую статью. В списке есть новая статья.', async () => {
    await page.goto(`${appArticlesUrl}/new`);
    const articleName = faker.name.title();

    await expect(page).toFillForm('[data-testid="article-form"]', {
      'article[name]': articleName,
      'article[content]': faker.lorem.paragraph(),
    });
    await expect(page).toSelect('select[name="article[categoryId]"]', '1');
    await page.click('[data-testid="article-button-submit"]');
    await page.waitForSelector('[data-testid="articles-table"]');
    await expect(page).toMatch(articleName);
  });

  test('Мы можем отредактировать статью. После этого данные на странице со всеми статьями меняются', async () => {
    await page.goto(`${appArticlesUrl}/new`);
    await expect(page).toMatch('Create article');

    const articleName = faker.name.title();
    await expect(page).toFillForm('[data-testid="article-form"]', {
      'article[name]': articleName,
      'article[content]': faker.lorem.paragraph(),
    });
    await expect(page).toSelect('select[name="article[categoryId]"]', '1');
    await page.click('[data-testid="article-button-submit"]');
    await page.waitForSelector('[data-testid="articles-table"]');

    const addedArticleIdElement = await page.$('[data-testid="article"]:last-child [data-testid="article-id"]');
    const articleId = await page.evaluate((element) => element.innerText, (addedArticleIdElement));
    await page.goto(`${appArticlesUrl}/${articleId}/edit`);
    await expect(page).toMatch('Edit article');

    const updateArticleName = faker.name.title();
    await expect(page).toFillForm('[data-testid="article-form"]', {
      'article[name]': updateArticleName,
    });
    await page.click('[data-testid="article-button-submit"]');
    await page.waitForSelector('[data-testid="articles-table"]');

    await expect(page).toMatch(updateArticleName);
  });
});
