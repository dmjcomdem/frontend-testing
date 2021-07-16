const _ = require('lodash');
const bodyParser = require('body-parser');

module.exports = (app) => {
  app.use(bodyParser.json());

  const state = { tasks: [] };

  app.get('/tasks', (req, res) => {
    res.json(state.tasks.slice().reverse());
  });

  app.patch('/tasks/:id/finish', (req, res) => {
    const task = _.find(state.tasks, { id: req.params.id });
    task.state = 'finished';
    res.json(task);
  });

  app.patch('/tasks/:id/activate', (req, res) => {
    const task = _.find(state.tasks, { id: req.params.id });
    task.state = 'active';
    res.json(task);
  });

  app.post('/tasks', (req, res) => {
    const task = {
      id: _.uniqueId(),
      text: req.body.text,
      state: 'active',
    };
    state.tasks.push(task);
    res.json(task);
  });
};
