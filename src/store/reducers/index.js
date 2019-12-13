import {types} from '../actions/types'

const defaultState = {
  user: null,
  groups: null,
  tasks: null,
}

export default (state = defaultState, {type, payload}) => {
  switch (type) {
    case types.REGISTER_USER_FULFILLED:
      return {
        ...state,
        user: payload,
      }
    case types.LOGIN_USER_FULFILLED:
      return {
        ...state,
        user: payload,
      }
    case types.INIT_DATA_FULFILLED:
      return {
        ...state,
        ...payload,
      }
    case types.ADD_GROUP_FULFILLED:
      return {
        ...state,
        groups: [...state.groups, payload],
      }
    case types.ADD_TASK_FULFILLED:
      return {
        ...state,
        tasks: [...state.tasks, payload],
      }
    case types.REMOVE_TASK_FULFILLED:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== payload),
      }
    case types.UPDATE_TASK_FULFILLED:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task._id === payload._id) {
            return {...payload}
          }
          return task
        }),
      }
    default:
      return state
  }
}
