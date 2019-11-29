import types from './actions/types'

const defaultState = {
  groups: null,
  tasks: null,
  dataReady: false,
}

export default (state = defaultState, {type, payload}) => {
  switch (type) {
    case types.SET_INIT_DATA:
      return {
        ...state,
        ...payload,
        dataReady: true,
      }
    case types.SET_TASKS:
      return {
        ...state,
        tasks: payload,
      }
    case types.SET_GROUPS:
      return {
        ...state,
        groups: payload,
      }
    case types.SET_DATA_READY:
      return {
        ...state,
        dataReady: true,
      }
    case types.ADD_GROUP:
      return {
        ...state,
        groups: [...state.groups, payload],
      }
    case types.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, payload],
      }
    default:
      return state
  }
}
