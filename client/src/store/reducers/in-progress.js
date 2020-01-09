import {types} from '../actions/types'
const defaultState = {}

export const inProgress = (state = defaultState, {type, payload}) => {
  switch (type) {
    case types.ADD_TO_IN_PROGRESS:
      return {
        ...state,
        [payload.inProgressEvent]: true,
      }
    case types.REMOVE_FROM_IN_PROGRESS:
      return Object.keys(state).reduce((acc, processItem) => {
        if (processItem === payload.inProgressEvent) return acc
        return {...acc, [processItem]: state[processItem]}
      }, {})
    default:
      return state
  }
}
