import {groupsTypes} from '__store/actions/types'
const defaultState = null

export const groups = (state = defaultState, {type, payload}) => {
  switch (type) {
    case groupsTypes.ADDED:
      return [
        ...(state || []),
        ...(Array.isArray(payload) ? payload : [payload]),
      ]
    case groupsTypes.CLEAR:
      return defaultState
    default:
      return state
  }
}
