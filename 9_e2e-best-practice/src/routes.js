// @ts-check

const host = '';

// Create new task
// POST /tasks
// { task: { text: 'your text' } }
// axios.post(routes.tasksUrl(), { task })

// Get List Of Tasks
// GET /tasks

// Get Task
// GET /tasks/:id

// Remove Task
// DELETE /tasks/:id

export default {
  tasksUrl: () => [host, 'tasks'].join('/'), // get tasks list
  taskUrl: (id) => [host, 'tasks', id].join('/'),
};
