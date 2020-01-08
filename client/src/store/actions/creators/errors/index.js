import {types} from '../../types'

/* Remove error action creator */
export const removeError = ({errorId, errorsOwner}) => ({
  type: types.REMOVE_ERROR,
  payload: {errorId, errorsOwner},
})

export const addError = ({errors, errorsOwner}) => ({
  type: types.ADD_ERROR,
  payload: {errors, errorsOwner},
})
