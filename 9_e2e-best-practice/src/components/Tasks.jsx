// @ts-check

import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';

const mapStateToProps = (state) => {
  const { tasksFetchingState, tasks: { byId, allIds } } = state;
  const tasks = allIds.map((id) => byId[id]);
  return { tasks, tasksFetchingState };
};

const actionCreators = {
  removeTask: actions.removeTask,
};

const Tasks = ({
  removeTask,
  tasks,
  tasksFetchingState,
}) => {
  const handleRemoveTask = (id) => () => {
    removeTask({ id });
  };

  if (tasksFetchingState === 'requested') {
    return (
      <div className="spinner-border m-3" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
  if (tasksFetchingState === 'failed') {
    return (
      <span>Please, reload page!</span>
    );
  }

  if (tasks.length === 0) {
    return null;
  }

  return (
    <div className="mt-3">
      <ul className="list-group">
        {tasks.map(({ id, text }) => (
          <li key={id} className="list-group-item d-flex" data-testid={`task-id-${id}`}>
            <span className="mr-auto">{text}</span>
            <button
              title="remove"
              type="button"
              data-testid={`remove-task-${id}`}
              className="close"
              onClick={handleRemoveTask(id)}
            >
              <span>&times;</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, actionCreators)(Tasks);
