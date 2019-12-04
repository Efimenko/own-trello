import {combineEpics} from 'redux-observable'
import {removeTaskEpic} from './remove'
import {addTaskEpic} from './add'

const tasksEpicsHash = {
  removeTaskEpic,
  addTaskEpic,
}

const taskEpics = combineEpics(...Object.values(tasksEpicsHash))

export default taskEpics
