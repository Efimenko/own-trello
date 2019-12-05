import {combineEpics} from 'redux-observable'
import {removeTaskEpic} from './remove'
import {addTaskEpic} from './add'

const tasksEpicsHash = {
  removeTaskEpic,
  addTaskEpic,
}

export const tasksEpics = combineEpics(...Object.values(tasksEpicsHash))
