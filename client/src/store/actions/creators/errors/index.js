import {errorsTypes} from '../../types'

/* Remove error action creator */
export const remove = ({errorId, errorsOwner}) => ({
  type: errorsTypes.REMOVE,
  payload: {errorId, errorsOwner},
})

export const add = ({errors, errorsOwner}) => ({
  type: errorsTypes.ADD,
  payload: {errors, errorsOwner},
})
