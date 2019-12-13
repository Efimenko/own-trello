import {combineEpics} from 'redux-observable'
import {removeTaskEpic} from './remove'
import {addTaskEpic} from './add'
import {updateTaskEpic} from './update'

const tasksEpicsHash = {
  removeTaskEpic,
  addTaskEpic,
  updateTaskEpic,
}

export const tasksEpics = combineEpics(...Object.values(tasksEpicsHash))
