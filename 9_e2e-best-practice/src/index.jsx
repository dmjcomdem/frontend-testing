// @ts-check

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers/index.js';
import App from './components/App.jsx';
import { fetchTasks } from './actions/index.js';

import { setupWorker, rest } from 'msw';
import { v4 as uuid } from 'uuid';

if (process.env.NODE_ENV === 'development') {
    // после submit'а задания, папка __mocks__ удаляться
    const url = 'http://localhost:8080';
    let tasks = [];

    const worker = setupWorker(
        rest.get(`${url}/tasks`, (req, res, ctx) => res(
            ctx.status(200),
            ctx.json(tasks),
        )),
        rest.post(`${url}/tasks`, (req, res, ctx) => {
            const { task: { text } } = req.body;
            const newTask = { id: uuid(), state: 'active', text };
            tasks.push(newTask);
            return res(
                ctx.status(200),
                ctx.json(newTask),
            );
        }),
        rest.delete(`${url}/tasks/:uuid`, (req, res, ctx) => {
            const id = req.params.uuid;
            tasks = tasks.filter((task) => task.uuid !== id);
            return res(
                ctx.status(204),
            );
        }),
    );

  // eslint-disable-next-line no-underscore-dangle
  window.__worker__ = worker;
  worker.start();
}

const store = createStore(
  reducers,
  applyMiddleware(thunk),
);

store.dispatch(fetchTasks());

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('container'),
);
