import {types} from '../../types'

/* Add group action creators */

export const addGroup = ({title}) => ({
  type: types.ADD_GROUP,
  payload: {title},
})

export const addGroupFulfilled = ({group}) => ({
  type: types.ADD_GROUP_FULFILLED,
  payload: group,
})

export const addGroupFailed = (message) => ({
  type: types.ADD_GROUP_FAILED,
  payload: message,
})

export const getGroups = () => ({
  type: types.GET_GROUPS,
})

export const getGroupsFulfilled = ({groups}) => ({
  type: types.GET_GROUPS_FULFILLED,
  payload: groups,
})

export const getGroupsFailed = () => ({
  type: types.GET_GROUPS_FAILED,
})
