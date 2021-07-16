// @ts-check
require('@testing-library/jest-dom');
const fs = require('fs');
const path = require('path');
const faker = require('faker');
const run = require('../src/application');

// BEGIN
const getListsContainer = () => document.querySelector('[data-container="lists"]');
const getTasksContainer = () => document.querySelector('[data-container="tasks"]');

const getListForm = () => document.querySelector('[data-container="new-list-form"]');
const getListInput = () => document.querySelector('[data-testid="add-list-input"]');
const getTaskInput = () => document.querySelector('[data-testid="add-task-input"]');

const FIRST_LIST_NAME = 'general';
const SECOND_LIST_NAME = 'second';

const toggleToList = (name) => {
  const link = document.querySelector(`[data-testid="${name}-list-item"]`);
  link.click();
};

describe('jsdom', () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync(path.join('__fixtures__', 'index.html')).toString();
    run();
  });

  test('Задачи отсутствуют, есть один список, который был добавлен по умолчанию', () => {
    expect(getTasksContainer()).toBeEmptyDOMElement();
    expect(getListsContainer()).toHaveTextContent(new RegExp(FIRST_LIST_NAME, 'i'));
  });

  test('После добавления задачи поле ввода сбрасывается и задачи отображатеся в списке General', () => {
    const tasks = [faker.lorem.word(), faker.lorem.word()];

    tasks.forEach((task) => {
      getListInput().value = task;
      getListForm().submit();
      expect(getTaskInput().value).toBe('');
      expect(getListsContainer()).toHaveTextContent(task);
    });
  });

  test('Создать еще один список задач, добавить туда задачи и проверить, что они отображается на странице', () => {
    const tasks = [faker.lorem.word(), faker.lorem.word()];

    getListInput().value = SECOND_LIST_NAME;
    getListForm().submit();
    expect(getListInput().value).toBe('');

    toggleToList(SECOND_LIST_NAME);

    expect(getListsContainer()).toHaveTextContent(SECOND_LIST_NAME);
    tasks.forEach((task) => {
      getListInput().value = task;
      getListForm().submit();
      expect(getTaskInput().value).toBe('');
      expect(getListsContainer()).toHaveTextContent(task);
    });
  });

  test('При переключении между списками отображаются задачи соответствующие спискам', () => {
    const firstListTasks = [faker.lorem.word(), faker.lorem.word()];
    const secondListTasks = [faker.lorem.word(), faker.lorem.word()];

    firstListTasks.forEach((task) => {
      getListInput().value = task;
      getListForm().submit();
      expect(getTaskInput().value).toBe('');
      expect(getListsContainer()).toHaveTextContent(task);
    });

    getListInput().value = SECOND_LIST_NAME;
    getListForm().submit();
    expect(getListInput().value).toBe('');

    toggleToList(SECOND_LIST_NAME);

    secondListTasks.forEach((task) => {
      getListInput().value = task;
      getListForm().submit();
      expect(getTaskInput().value).toBe('');
      expect(getListsContainer()).toHaveTextContent(task);
    });

    toggleToList(FIRST_LIST_NAME);
    secondListTasks.forEach((task) => {
      expect(getListsContainer()).toHaveTextContent(task);
    });
  });
});
// END
