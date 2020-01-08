import {types} from '../actions/types'
const defaultState = {}

export const errors = (state = defaultState, {type, payload}) => {
  switch (type) {
    case types.ADD_ERROR:
      return {
        ...state,
        [payload.errorsOwner]: [
          ...(state[payload.errorsOwner] || []),
          ...payload.errors,
        ],
      }
    case types.REMOVE_ERROR:
      return {
        ...state,
        [payload.errorsOwner]: [
          ...(state[payload.errorsOwner].filter(
            (error) => error.id !== payload.errorId
          ) || []),
        ],
      }
    default:
      return state
  }
}
