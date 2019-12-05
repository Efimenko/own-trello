import {types} from '../../types'

/* Add group action creators */

export const addGroup = (newGroup) => ({
  type: types.ADD_GROUP,
  payload: newGroup,
})

export const addGroupFulfilled = (group) => ({
  type: types.ADD_GROUP_FULFILLED,
  payload: group,
})

export const addGroupFailed = (message) => ({
  type: types.ADD_GROUP_FAILED,
  payload: message,
})
