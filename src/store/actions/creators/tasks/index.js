import {types} from '../../types'

/* Add task action creators */

export const addTask = (newTask) => ({
  type: types.ADD_TASK,
  payload: newTask,
})

export const addTaskFulfilled = (task) => ({
  type: types.ADD_TASK_FULFILLED,
  payload: task,
})

export const addTaskFailed = (message) => ({
  type: types.ADD_TASK_FAILED,
  payload: message,
})

/* Remove task action creators */

export const removeTask = (taskId) => ({
  type: types.REMOVE_TASK,
  payload: taskId,
})

export const removeTaskFulfilled = (taskId) => ({
  type: types.REMOVE_TASK_FULFILLED,
  payload: taskId,
})

export const removeTaskFailed = (message) => ({
  type: types.REMOVE_TASK_FAILED,
  payload: message,
})

/* Edit task action creators */

export const updateTask = ({taskId, data: {title, description}}) => ({
  type: types.UPDATE_TASK,
  payload: {taskId, data: {title, description}},
})

export const updateTaskFulfilled = ({_id, title, description}) => ({
  type: types.UPDATE_TASK_FULFILLED,
  payload: {_id, title, description},
})

export const updateTaskFailed = ({message}) => ({
  type: types.UPDATE_TASK_FAILED,
  payload: message,
})
