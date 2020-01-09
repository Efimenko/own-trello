import {types} from '../types'

export const addToInProgress = ({inProgressEvent}) => ({
  type: types.ADD_TO_IN_PROGRESS,
  payload: {inProgressEvent},
})

export const removeFromInProgress = ({inProgressEvent}) => ({
  type: types.REMOVE_FROM_IN_PROGRESS,
  payload: {inProgressEvent},
})
