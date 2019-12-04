import {combineEpics} from 'redux-observable'
import taskEpics from './tasks'

const epics = {
  taskEpics,
}

const rootEpic = combineEpics(...Object.values(epics))

export default rootEpic
