import {combineEpics} from 'redux-observable'
import tasksEpics from './tasks'
import groupsEpics from './groups'

const epics = {
  tasksEpics,
  groupsEpics,
}

const rootEpic = combineEpics(...Object.values(epics))

export default rootEpic
