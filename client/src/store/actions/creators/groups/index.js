import {groupsTypes} from '../../types'

/* Add group action creators */

export const adding = ({title, errorsOwner}) => ({
  type: groupsTypes.ADDING,
  payload: {title, errorsOwner},
})

export const added = ({group}) => ({
  type: groupsTypes.ADDED,
  payload: group,
})

// export const addGroupFailed = (message) => ({
//   type: types.ADD_GROUP_FAILED,
//   payload: message,
// })

export const get = ({errorsOwner, inProgressEvent}) => ({
  type: groupsTypes.GET,
  payload: {errorsOwner, inProgressEvent},
})

//TODO: think about removing getTasksFailed and getGroupsFulfilled

// export const getGroupsFulfilled = ({groups}) => ({
//   type: types.GET_GROUPS_FULFILLED,
//   payload: groups,
// })

// export const getGroupsFailed = () => ({
//   type: types.GET_GROUPS_FAILED,
// })

export const clear = () => ({
  type: groupsTypes.CLEAR,
})
