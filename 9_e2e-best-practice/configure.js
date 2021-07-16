const _ = require('lodash');
const morgan = require('morgan');
const bodyParser = require('body-parser');

module.exports = (app) => {
  app.use(morgan('tiny'));
  app.use(bodyParser.json());

  let tasks = [];

  app.get('/tasks', (req, res) => {
    res.json(tasks);
  });

  app.post('/tasks', (req, res) => {
    const id = _.uniqueId();
    const task = { ...req.body.task, id, state: 'active' };
    tasks = [...tasks, task];

    res.json(task);
  });

  app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter((t) => t.id !== id);
    res.status(204);
    res.end();
  });
};
