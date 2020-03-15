// @flow

import {errorsTypes} from '../actions/types'
import type {ErrorsIdT, ErrorT, ErrorsOwnerT} from '../types/errors'

type StateT = {
  [string]: $ReadOnlyArray<ErrorT>,
}

type ReducerOptionT = {
  type: string,
  payload: {
    errorsId: ErrorsIdT,
    errors: $ReadOnlyArray<ErrorT>,
    errorsOwner: ErrorsOwnerT,
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
