import {types} from 'store/actions/types/index'
const defaultState = null

export const tasks = (state = defaultState, {type, payload}) => {
  switch (type) {
    case types.ADD_TASK_FULFILLED:
      return [...state, ...(Array.isArray(payload) ? payload : [payload])]
    case types.REMOVE_TASK_FULFILLED:
      return state.filter((task) => task._id !== payload)
    case types.UPDATE_TASK_FULFILLED:
      return state.map((task) => {
        if (task._id === payload._id) {
          return {...payload}
        }
        return task
      })
    default:
      return state
  }
}
