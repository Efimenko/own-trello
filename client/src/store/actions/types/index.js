import {initDataTypes} from './init-data'
import {tasksTypes} from './tasks'
import {groupsTypes} from './groups'
import {authTypes} from './auth'
import {errorsTypes} from './errors'

export const types = {
  ...initDataTypes,
  ...groupsTypes,
  ...tasksTypes,
  ...authTypes,
  ...errorsTypes,
}
