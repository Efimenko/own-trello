import {tasksTypes} from 'store/actions/types'
const defaultState = null

export const tasks = (state = defaultState, {type, payload}) => {
  switch (type) {
    case tasksTypes.ADDED:
      return [
        ...(state || []),
        ...(Array.isArray(payload.task) ? payload.task : [payload.task]),
      ]
    case tasksTypes.REMOVED:
      return state.filter((task) => task._id !== payload)
    case tasksTypes.UPDATED:
      return state.map((task) => {
        if (task._id === payload._id) {
          return {...task, ...payload}
        }
        return task
      })
    case tasksTypes.CLEAR:
      return defaultState
    default:
      return state
  }
}
