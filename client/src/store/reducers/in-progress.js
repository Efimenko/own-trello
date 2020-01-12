import {inProgressTypes} from '../actions/types'
const defaultState = {}

export const inProgress = (state = defaultState, {type, payload}) => {
  switch (type) {
    case inProgressTypes.ADD:
      return {
        ...state,
        [payload.inProgressEvent]: true,
      }
    case inProgressTypes.REMOVE:
      return Object.keys(state).reduce((acc, processItem) => {
        if (processItem === payload.inProgressEvent) return acc
        return {...acc, [processItem]: state[processItem]}
      }, {})
    default:
      return state
  }
}
