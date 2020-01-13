export {tasksTypes} from './tasks'
import {groupsTypes} from './groups'
import {authTypes} from './auth'
export {errorsTypes} from './errors'
export {inProgressTypes} from './in-progress'

export const types = {
  ...groupsTypes,
  // ...tasksTypes,
  ...authTypes,
  // ...errorsTypes,
  // ...inProgressTypes,
}
