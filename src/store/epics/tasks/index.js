import {combineEpics} from 'redux-observable'
import {removeTaskEpic} from './remove'

const tasksEpicsHash = {
  removeTaskEpic,
}

const taskEpics = combineEpics(...Object.values(tasksEpicsHash))

export default taskEpics
