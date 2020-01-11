import {types} from 'store/actions/types'
const defaultState = null

export const groups = (state = defaultState, {type, payload}) => {
  switch (type) {
    case types.ADD_GROUP_FULFILLED:
      return [
        ...(state || []),
        ...(Array.isArray(payload) ? payload : [payload]),
      ]
    case types.CLEAR_GROUPS:
      return defaultState
    default:
      return state
  }
}
