import {initDataTypes} from './init-data'
import {tasksTypes} from './tasks'
import {groupsTypes} from './groups'

export const types = {
  ...initDataTypes,
  ...groupsTypes,
  ...tasksTypes,
}
