import {combineEpics} from 'redux-observable'
import {initDataEpic} from './init-data'
import {tasksEpics} from './tasks'
import {groupsEpics} from './groups'
import {authEpics} from './auth'

const epics = {
  tasksEpics,
  groupsEpics,
  initDataEpic,
  authEpics,
}

const rootEpic = combineEpics(...Object.values(epics))

export default rootEpic
