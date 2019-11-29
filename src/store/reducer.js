import types from './actions/types'

const defaultState = {
  groups: null,
  tasks: null,
}

export default (state = defaultState, {type, payload}) => {
  switch (type) {
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
    default:
      return state
  }
}
