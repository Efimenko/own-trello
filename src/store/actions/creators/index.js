import types from '../types'

export const addTask = (payload) => ({
  type: types.ADD_TASK,
  payload,
})

export const addGroup = (payload) => ({
  type: types.ADD_GROUP,
  payload,
})

export const init = () => ({
  type: types.INIT,
})
