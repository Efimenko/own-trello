export {tasksTypes} from './tasks'
import {groupsTypes} from './groups'
import {authTypes} from './auth'
import {errorsTypes} from './errors'
import {inProgressTypes} from './in-progress'

export const types = {
  ...groupsTypes,
  // ...tasksTypes,
  ...authTypes,
  ...errorsTypes,
  ...inProgressTypes,
}
