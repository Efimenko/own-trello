import types from '../../types'

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

/* Set list of task action creator */

export const setTasks = (tasks) => ({
  type: types.SET_TASKS,
  payload: tasks,
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
