const prefix = 'TASKS'

export const tasksTypes = {
  ADDING: `${prefix}:ADDING`,
  ADDED: `${prefix}:ADDED`,
  // ADD_TASK_FAILED: 'ADD_TASK_FAILED',
  REMOVING: `${prefix}:REMOVING`,
  REMOVED: `${prefix}:REMOVED`,
  // REMOVE_TASK_FAILED: 'REMOVE_TASK_FAILED',
  UPDATING: `${prefix}:UPDATING`,
  UPDATED: `${prefix}:UPDATED`,
  // UPDATE_TASK_FAILED: 'UPDATE_TASK_FAILED',
  GET: `${prefix}:GET`,
  // GET_TASKS_FAILED: 'GET_TASKS_FAILED',
  CLEAR: `${prefix}:CLEAR`,
}
