// @ts-check

import axios from 'axios';
import React from 'react';
import update from 'immutability-helper';
import Item from './Item.jsx';
import routes from './routes.js';

export default class TodoBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { newTaskText: '', tasks: [] };
  }

  componentDidMount() {
    this.fetchTasks();
  }

  handleChangeText = ({ target: { value } }) => {
    this.setState({ newTaskText: value });
  }

  handleFinishTask = (id) => async () => {
    await axios.patch(routes.finishTaskPath(id));
    const { tasks } = this.state;
    const index = tasks.findIndex((t) => t.id === id);
    const updatedTasks = update(tasks, { [index]: { $merge: { state: 'finished' } } });
    this.setState({ tasks: updatedTasks });
  }

  handleActivateTask = (id) => async () => {
    await axios.patch(routes.activateTaskPath(id));
    const { tasks } = this.state;
    const index = tasks.findIndex((t) => t.id === id);
    const updatedTasks = update(tasks, { [index]: { $merge: { state: 'active' } } });
    this.setState({ tasks: updatedTasks });
  }

  handleSubmitForm = async (e) => {
    e.preventDefault();
    const { newTaskText } = this.state;
    const response = await axios.post(routes.tasksPath(), { text: newTaskText });
    const { tasks } = this.state;
    this.setState({ newTaskText: '', tasks: [response.data, ...tasks] });
  }

  fetchTasks = async () => {
    const response = await axios.get(routes.tasksPath());
    this.setState({ tasks: response.data });
  }

  renderFinishedTasks(tasks) {
    return (
      <div className="todo-finished-tasks">
        {tasks.map((task) => (
          <Item key={task.id} task={task} onClick={this.handleActivateTask(task.id)} />
        ))}
      </div>
    );
  }

  renderActiveTasks(tasks) {
    return (
      <div className="todo-active-tasks">
        {tasks.map((task) => (
          <Item key={task.id} task={task} onClick={this.handleFinishTask(task.id)} />
        ))}
      </div>
    );
  }

  renderForm() {
    const { newTaskText } = this.state;
    return (
      <form onSubmit={this.handleSubmitForm} className="todo-form form-inline mx-3">
        <div className="form-group">
          <input
            type="text"
            onChange={this.handleChangeText}
            value={newTaskText}
            required
            className="form-control mr-3"
            placeholder="I am going..."
          />
        </div>
        <button type="submit" className="btn btn-primary">add</button>
      </form>
    );
  }

  render() {
    const { tasks } = this.state;
    const activeTasks = tasks.filter((t) => t.state === 'active');
    const finishedTasks = tasks.filter((t) => t.state === 'finished');

    return (
      <div>
        <div className="mb-3">
          {this.renderForm()}
        </div>
        {activeTasks.length > 0 && this.renderActiveTasks(activeTasks)}
        {finishedTasks.length > 0 && this.renderFinishedTasks(finishedTasks)}
      </div>
    );
  }
}
