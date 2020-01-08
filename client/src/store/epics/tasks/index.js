import {combineEpics} from 'redux-observable'
import {removeTaskEpic} from './remove'
import {addTaskEpic} from './add'
import {updateTaskEpic} from './update'
import {getTasksEpic} from './get'

const tasksEpicsHash = {
  removeTaskEpic,
  addTaskEpic,
  updateTaskEpic,
  getTasksEpic,
}

export const tasksEpics = combineEpics(...Object.values(tasksEpicsHash))
