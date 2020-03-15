// @flow

import {errorsTypes} from '../actions/types'

type IdT = symbol

type ErrorT = {
  id: IdT,
}

type StateT = {
  [string]: $ReadOnlyArray<ErrorT>,
}

type ReducerOptionT = {
  type: string,
  payload: {
    errorsId: IdT | $ReadOnlyArray<IdT>,
    errors: $ReadOnlyArray<ErrorT>,
    errorsOwner: string,
  },
}

const defaultState: StateT = {}

export const errors = (
  state: StateT = defaultState,
  {type, payload}: ReducerOptionT
) => {
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
            Array.isArray(payload.errorsId)
              ? !payload.errorsId.includes(error.id)
              : error.id !== payload.errorsId
          ) || []),
        ],
      }
    default:
      return state
  }
}
