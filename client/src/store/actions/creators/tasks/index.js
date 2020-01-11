import {tasksTypes} from '../../types'

/* Add task action creators */

export const adding = ({parent, description, title, errorsOwner}) => ({
  type: tasksTypes.ADDING,
  payload: {parent, description, title, errorsOwner},
})

export const added = ({task}) => ({
  type: tasksTypes.ADDED,
  payload: {task},
})

/* Remove task action creators */

export const removing = (taskId) => ({
  type: tasksTypes.REMOVING,
  payload: taskId,
})

export const removed = (taskId) => ({
  type: tasksTypes.REMOVED,
  payload: taskId,
})

// export const removeTaskFailed = (message) => ({
//   type: types.REMOVE_TASK_FAILED,
//   payload: message,
// })

/* Edit task action creators */

export const updating = ({taskId, data: {title, description}}) => ({
  type: tasksTypes.UPDATING,
  payload: {taskId, data: {title, description}},
})

export const updated = ({_id, title, description}) => ({
  type: tasksTypes.UPDATED,
  payload: {_id, title, description},
})

// export const updateTaskFailed = ({message}) => ({
//   type: types.UPDATE_TASK_FAILED,
//   payload: message,
// })

/* Get tasks action creators */

export const get = ({errorsOwner, inProgressEvent}) => ({
  type: tasksTypes.GET,
  payload: {errorsOwner, inProgressEvent},
})

//TODO: think about removing getTasksFailed

// export const getTasksFailed = () => ({
//   type: types.GET_TASKS_FAILED,
// })

export const clear = () => ({
  type: tasksTypes.CLEAR,
})
