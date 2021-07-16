// @ts-check

import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import * as actions from '../actions/index.js';

const actionCreators = {
  addTask: actions.addTask,
};

const NewTaskForm = ({
  addTask,
  reset,
  handleSubmit,
  submitting,
  pristine,
  error,
}) => {
  const onSubmit = async (values) => {
    try {
      await addTask({ task: values });
    } catch (e) {
      throw new SubmissionError({ _error: e.message });
    }
    reset();
  };

  return (
    <form className="form-inline" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group mx-3">
        <Field name="text" required disabled={submitting} component="input" type="text"  data-testid="task-name-input"/>
      </div>
      <input
        type="submit"
        disabled={pristine || submitting}
        className="btn btn-primary btn-sm"
        data-testid="add-task-button"
        value="Add"
      />
      {error && <div className="ml-3">{error}</div>}
    </form>
  );
};

const ConnectedNewTaskForm = connect(null, actionCreators)(NewTaskForm);
export default reduxForm({
  form: 'newTask',
})(ConnectedNewTaskForm);
