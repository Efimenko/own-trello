import {types} from '../actions/types'
const defaultState = null

export const user = (state = defaultState, {type, payload}) => {
  switch (type) {
    case types.REGISTER_USER_FULFILLED:
      return payload
    case types.LOGIN_USER_FULFILLED:
      return payload
    case types.LOG_OUT_USER:
      return defaultState
    default:
      return state
  }
}
