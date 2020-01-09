import {errors} from './errors'
import {groups} from './groups'
import {inProgress} from './in-progress'
import {tasks} from './tasks'
import {user} from './user'
import {combineReducers} from 'redux'

export const reducer = combineReducers({
  errors,
  groups,
  inProgress,
  tasks,
  user,
})
