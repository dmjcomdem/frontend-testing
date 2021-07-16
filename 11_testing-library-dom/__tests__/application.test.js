// @ts-check
require('@testing-library/jest-dom');
const fs = require('fs');
const path = require('path');
const testingLibraryDom = require('@testing-library/dom');
const testingLibraryUserEvent = require('@testing-library/user-event');
const faker = require('faker');
const run = require('../src/application');

const { screen: { getByText, getByRole, getByTestId } } = testingLibraryDom;
const userEvent = testingLibraryUserEvent.default;

// helpers
const createList = (list) => {
  userEvent.type(getByRole('textbox', { name: /new list/i }), list);
  userEvent.click(getByRole('button', { name: /add list/i }));
};

const createTask = (task) => {
  userEvent.type(getByRole('textbox', { name: /new task/i }), task);
  userEvent.click(getByRole('button', { name: /add task/i }));
};

const toggleToList = (listName) => {
  userEvent.click(getByText(new RegExp(listName, 'i')));
};

// variables
const FIRST_LIST_NAME = 'general';
const SECOND_LIST_NAME = 'second';

// BEGIN
describe('app', () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync(path.join('__fixtures__', 'index.html')).toString();
    run();
  });

  test('Задачи отсутствуют, есть один список, который был добавлен по умолчанию', () => {
    const result = getByText(new RegExp(FIRST_LIST_NAME, 'i'));
    expect(getByTestId('tasks')).toBeEmptyDOMElement();
    expect(result).toBeVisible();
  });

  test('После добавления задачи поле ввода сбрасывается, а задачи отображатеся в списке General', () => {
    const tasks = [faker.lorem.word(), faker.lorem.word()];

    tasks.forEach((task) => {
      createTask(task);
      expect(getByRole('textbox', { name: /new task/i })).toHaveValue('');
      expect(getByText(task)).toBeInTheDocument();
    });
  });

  test('Создать еще один список задач, добавить туда задачи и проверить, что они отображается на странице', () => {
    const tasks = [faker.lorem.word(), faker.lorem.word()];

    createList(SECOND_LIST_NAME);
    toggleToList(SECOND_LIST_NAME);

    tasks.forEach((task) => {
      createTask(task);
      expect(getByText(task)).toBeInTheDocument();
    });
  });

  test('При переключении между списками отображаются задачи соответствующие спискам', () => {
    const firstListTasks = [faker.lorem.word(), faker.lorem.word()];
    const secondListTasks = [faker.lorem.word(), faker.lorem.word()];

    firstListTasks.forEach((task) => {
      createTask(task);
      expect(getByText(task)).toBeInTheDocument();
    });

    createList(SECOND_LIST_NAME);
    toggleToList(SECOND_LIST_NAME);
    expect(getByTestId('tasks')).toBeEmptyDOMElement();

    secondListTasks.forEach((task) => {
      createTask(task);
      expect(getByText(task)).toBeInTheDocument();
    });

    toggleToList(FIRST_LIST_NAME);
    expect(getByTestId('tasks')).not.toBeEmptyDOMElement();

    firstListTasks.forEach((task) => {
      expect(getByText(task)).toBeInTheDocument();
    });
  });
});
// END
