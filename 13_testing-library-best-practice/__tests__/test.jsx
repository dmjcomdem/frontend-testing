// @ts-check
import React from 'react';
import nock from 'nock';
import axios from 'axios';
import httpAdapter from 'axios/lib/adapters/http';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import faker from 'faker';

// Component
import TodoBox from '../src/TodoBox.jsx';

// Settings
axios.defaults.adapter = httpAdapter;
const host = 'http://localhost';
const pathname = '/tasks';

// Helpers
const mockHTTPRequestForTaskNames = (...taskNames) => {
  const scope = nock(host)
    .get(pathname)
    .reply(200, []);

  if (!taskNames.length) return;

  for (const [index, text] of Object.entries(taskNames)) {
    const id = Number(index) + 1;
    scope.post(pathname, { text: /\w+/ })
        .reply(200, { id, text, state: 'active' })
        .patch(`${pathname}/${id}/finish`)
        .reply(200, { id, text, state: 'finished' })
        .patch(`${pathname}/${id}/activate`)
        .reply(200, { id, text, state: 'active' });
  }
};

const addTask = (task) => {
  userEvent.type(screen.getByPlaceholderText('I am going...'), task);
  userEvent.click(screen.getByRole('button', { name: 'add' }));
}

// BEGIN
describe('TodoBox', () => {
  beforeAll(() => {
    nock.disableNetConnect();
  });

  afterAll(() => {
    nock.enableNetConnect();
  });

  afterEach(() => {
    nock.cleanAll()
  })

  it('Коректное отображние стартового состония страницы', async () => {
    mockHTTPRequestForTaskNames();
    render(<TodoBox />);

    expect(screen.getByPlaceholderText('I am going...')).toBeVisible();
    expect(screen.getByRole('button', { name: 'add' })).toBeVisible();
  });

  it('Добавление нескольких задач и отображажение их на странице', async () => {
    const [firstTaskName, secondTaskName] = [faker.lorem.word(), faker.lorem.word()];
    mockHTTPRequestForTaskNames(firstTaskName, secondTaskName);

    render(<TodoBox />);
    addTask(secondTaskName);
    addTask(firstTaskName);

    await waitFor(() => {
      expect(screen.getByText(firstTaskName)).toBeInTheDocument();
      expect(screen.getByText(secondTaskName)).toBeInTheDocument();
    })
  });

  it('Задачи можно завершать и отменять завершение', async () => {
    const taskName = faker.lorem.word();
    mockHTTPRequestForTaskNames(taskName);

    const { container } = render(<TodoBox />);
    addTask(taskName);

    userEvent.click(await screen.findByText(taskName));
    await waitFor(() => {
      expect(container.querySelector('s')).toBeVisible();
    });

    userEvent.click(await screen.findByText(taskName));
    await waitFor(() => {
      expect(container.querySelector('s')).toBeNull();
    });
  });
});
