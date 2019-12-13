import {types} from '../../types'

/* Add group action creators */

export const addGroup = ({title}) => ({
  type: types.ADD_GROUP,
  payload: {title},
})

export const addGroupFulfilled = (group) => ({
  type: types.ADD_GROUP_FULFILLED,
  payload: group,
})

export const addGroupFailed = (message) => ({
  type: types.ADD_GROUP_FAILED,
  payload: message,
})
