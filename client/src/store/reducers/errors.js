import {errorsTypes} from '../actions/types'
const defaultState = {}

export const errors = (state = defaultState, {type, payload}) => {
  switch (type) {
    case errorsTypes.ADD:
      return {
        ...state,
        [payload.errorsOwner]: [
          ...(state[payload.errorsOwner] || []),
          ...payload.errors,
        ],
      }
    case errorsTypes.REMOVE:
      return {
        ...state,
        [payload.errorsOwner]: [
          ...(state[payload.errorsOwner].filter((error) =>
            Array.isArray(payload.errorId)
              ? !payload.errorId.includes(error.id)
              : error.id !== payload.errorId
          ) || []),
        ],
      }
    default:
      return state
  }
}
