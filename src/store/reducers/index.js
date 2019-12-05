import {types} from '../actions/types'

const defaultState = {
  groups: null,
  tasks: null,
}

export default (state = defaultState, {type, payload}) => {
  switch (type) {
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
    default:
      return state
  }
}
