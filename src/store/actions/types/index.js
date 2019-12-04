import initDataTypes from './init-data'
import tasksTypes from './tasks'
import groupsTypes from './groups'

export default {
  ...initDataTypes,
  ...groupsTypes,
  ...tasksTypes,
}
