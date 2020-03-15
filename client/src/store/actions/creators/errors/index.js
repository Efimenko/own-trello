import {errorsTypes} from '../../types'

/* Remove error action creator */
export const remove = ({errorsId, errorsOwner}) => ({
  type: errorsTypes.REMOVE,
  payload: {errorsId, errorsOwner},
})

export const add = ({errors, errorsOwner}) => ({
  type: errorsTypes.ADD,
  payload: {errors, errorsOwner},
})
