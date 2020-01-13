import {combineEpics} from 'redux-observable'
import {tasksEpics} from './tasks'
import {groupsEpics} from './groups'
import {authEpics} from './auth'

const epics = {
  tasksEpics,
  groupsEpics,
  authEpics,
}

const rootEpic = combineEpics(...Object.values(epics))

export default rootEpic
