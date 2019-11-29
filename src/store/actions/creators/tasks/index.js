import types from '../../types'

export const addTask = (payload) => ({
  type: types.ADD_TASK,
  payload,
})

/* Action creator for set tasks to store */
export const setTasks = (payload) => ({
  type: types.SET_TASKS,
  payload,
})
