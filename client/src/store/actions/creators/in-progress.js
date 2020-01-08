import {types} from '../types'

export const addToInProgress = ({entityName}) => ({
  type: types.ADD_TO_IN_PROGRESS,
  payload: entityName,
})

export const removeFromInProgress = ({entityName}) => ({
  type: types.REMOVE_FROM_IN_PROGRESS,
  payload: entityName,
})
