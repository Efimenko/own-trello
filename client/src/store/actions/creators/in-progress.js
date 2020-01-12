import {inProgressTypes} from '../types'

export const add = ({inProgressEvent}) => ({
  type: inProgressTypes.ADD,
  payload: {inProgressEvent},
})

export const remove = ({inProgressEvent}) => ({
  type: inProgressTypes.REMOVE,
  payload: {inProgressEvent},
})
