import {types} from '../actions/types'
const defaultState = null

export const user = (state = defaultState, {type, payload}) => {
  switch (type) {
    case types.ADD_USER:
      return payload
    case types.CLEAR_USER:
      return defaultState
    default:
      return state
  }
}
