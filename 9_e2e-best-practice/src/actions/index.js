// @ts-check

import axios from 'axios';
import { createAction } from 'redux-actions';

import routes from '../routes';

export const fetchTasksRequest = createAction('TASKS_FETCH_REQUEST');
export const fetchTasksSuccess = createAction('TASKS_FETCH_SUCCESS');
export const fetchTasksFailure = createAction('TASKS_FETCH_FAILURE');

export const removeTaskRequest = createAction('TASK_REMOVE_REQUEST');
export const removeTaskSuccess = createAction('TASK_REMOVE_SUCCESS');
export const removeTaskFailure = createAction('TASK_REMOVE_FAILURE');

export const addTaskSuccess = createAction('TASK_ADD_SUCCESS');

export const addTask = ({ task }) => async (dispatch) => {
  const response = await axios.post(routes.tasksUrl(), { task });
  dispatch(addTaskSuccess({ task: response.data }));
};

export const removeTask = (task) => async (dispatch) => {
  dispatch(removeTaskRequest());
  try {
    const url = routes.taskUrl(task.id);
    await axios.delete(url);
    dispatch(removeTaskSuccess({ id: task.id }));
  } catch (e) {
    dispatch(removeTaskFailure());
    throw e;
  }
};

export const fetchTasks = () => async (dispatch) => {
  dispatch(fetchTasksRequest());
  try {
    const url = routes.tasksUrl();
    const response = await axios.get(url);
    dispatch(fetchTasksSuccess({ tasks: response.data }));
  } catch (e) {
    dispatch(fetchTasksFailure());
    throw e;
  }
};
