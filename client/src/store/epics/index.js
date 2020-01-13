import {combineEpics} from 'redux-observable'
import {tasksEpics} from './tasks'
import {groupsEpics} from './groups'
import {userEpics} from './user'

const epics = {
  tasksEpics,
  groupsEpics,
  userEpics,
}

const rootEpic = combineEpics(...Object.values(epics))

export default rootEpic
