// @ts-check

const host = '';

export default {
  tasksPath: () => [host, 'tasks'].join('/'),
  finishTaskPath: (id) => [host, 'tasks', id, 'finish'].join('/'),
  activateTaskPath: (id) => [host, 'tasks', id, 'activate'].join('/'),
};
