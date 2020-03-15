// @flow

import {errorsTypes} from '../../types'
import type {
  ErrorsIdT,
  ErrorsT,
  ErrorsOwnerT,
  ErrorsAddActionT,
  ErrorsRemoveActionT,
} from '../../types'

type RemoveParamsT = {
  errorsId: ErrorsIdT,
  errorsOwner: ErrorsT,
}

type RemoveResultT = {
  type: ErrorsRemoveActionT,
  payload: {
    errorsId: ErrorsIdT,
    errorsOwner: ErrorsOwnerT,
  },
}

type AddParamsT = {
  errors: $ReadOnlyArray<ErrorsT>,
  errorsOwner: ErrorsT,
}

type AddResultT = {
  type: ErrorsAddActionT,
  payload: {
    errors: $ReadOnlyArray<ErrorsT>,
    errorsOwner: ErrorsT,
  },
}

/* Remove error action creator */
export const remove = ({
  errorsId,
  errorsOwner,
}: RemoveParamsT): RemoveResultT => ({
  type: errorsTypes.REMOVE,
  payload: {errorsId, errorsOwner},
})

export const add = ({errors, errorsOwner}: AddParamsT): AddResultT => ({
  type: errorsTypes.ADD,
  payload: {errors, errorsOwner},
})
