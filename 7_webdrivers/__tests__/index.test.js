const puppeteer = require('puppeteer');
const faker = require('faker');
const getApp = require('../server/index.js');

const port = 5000;
const appUrl = `http://localhost:${port}`;

let browser;
let page;

const app = getApp();

describe('it works', () => {
  beforeAll(async () => {
    await app.listen(port, '0.0.0.0');
    browser = await puppeteer.launch({
      args: ['--no-sandbox'],
      headless: true,
      // slowMo: 250,
    });
    page = await browser.newPage();
    await page.setViewport({
      width: 1280,
      height: 720,
    });
  });
  // BEGIN
  test('Главная страница приложения открывается', async () => {
    await page.goto(appUrl);
    const title = await page.$('#title');
    const text = await page.evaluate((element) => element.textContent, title);
    expect(text).toContain('Welcome to a Simple blog!');
  });

  test('Перейти на страницу со всеми статьями и увидеть там их список', async () => {
    await page.goto(`${appUrl}/articles`);
    const articlesTableRows = await page.$$('#articles tr');
    expect(articlesTableRows.length).toBeGreaterThan(0);
  });

  test('Можем нажать на кнопку создать статью и увидеть форму', async () => {
    await page.goto(`${appUrl}/articles`);
    await page.click('[href="/articles/new"]');
    const newArticleForm = page.waitForSelector('[data-testid="new-article-form"]');
    await expect(newArticleForm).resolves.toBeTruthy();
  });

  test('Может заполнить форму и создать новую статью. В списке есть новая статья.', async () => {
    await page.goto(`${appUrl}/articles/new`);

    const articleName = faker.name.title();
    const articleContent = faker.lorem.paragraph();

    await (await page.$('#name')).type(articleName);
    await (await page.$('#category')).select('1');
    await (await page.$('#content')).type(articleContent);

    await page.click('[data-testid="article-new-form-submit"]');

    await page.waitForSelector('#articles');

    const addedArticleNameElement = await page.$('#articles tbody [data-testid="article"]:last-child [data-testid="article-name"]');
    const createdArticleName = await page.evaluate((element) => element.innerText,
      (addedArticleNameElement));

    expect(createdArticleName).toContain(articleName);
  });

  test('Мы можем отредактировать статью. После этого данные на странице со всеми статьями меняются', async () => {
    await page.goto(`${appUrl}/articles/new`);

    const articleName = faker.name.title();
    const articleContent = faker.lorem.paragraph();

    await (await page.$('#name')).type(articleName);
    await (await page.$('#category')).select('1');
    await (await page.$('#content')).type(articleContent);

    await page.click('[data-testid="article-new-form-submit"]');

    await page.waitForSelector('#articles');

    const addedArticleIdElement = await page.$('#articles tbody [data-testid="article"]:last-child [data-testid="article-id"]');
    const articleId = await page.evaluate((element) => element.innerText, (addedArticleIdElement));

    await page.goto(`${appUrl}/articles/${articleId}/edit`);
    const updateArticleName = faker.name.title();
    await (await page.$('#name')).type(updateArticleName);

    await page.click('[data-testid="article-edit-form-submit"]');
    await page.waitForSelector('#articles');

    const updatedArticleIdElement = await page.$('#articles tbody [data-testid="article"]:last-child [data-testid="article-name"]');
    const updateArticle = await page.evaluate((element) => element.innerText,
      (updatedArticleIdElement));

    expect(updateArticle).toContain(updateArticleName);
  });
  // END
  afterAll(async () => {
    await browser.close();
    await app.close();
  });
});
