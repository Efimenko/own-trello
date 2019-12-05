import {combineEpics} from 'redux-observable'
import {initDataEpic} from './init-data'
import {tasksEpics} from './tasks'
import {groupsEpics} from './groups'

const epics = {
  tasksEpics,
  groupsEpics,
  initDataEpic,
}

const rootEpic = combineEpics(...Object.values(epics))

export default rootEpic
