import {initDataTypes} from './init-data'
import {tasksTypes} from './tasks'
import {groupsTypes} from './groups'
import {authTypes} from './auth'

export const types = {
  ...initDataTypes,
  ...groupsTypes,
  ...tasksTypes,
  ...authTypes,
}
