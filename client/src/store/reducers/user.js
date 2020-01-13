import {userTypes} from '../actions/types'
const defaultState = null

export const user = (state = defaultState, {type, payload}) => {
  switch (type) {
    case userTypes.ADD:
      return payload
    case userTypes.CLEAR:
      return defaultState
    default:
      return state
  }
}
