import {combineEpics} from 'redux-observable'
import {addGroupEpic} from './add'

const groupsEpicsHash = {
  addGroupEpic,
}

export const groupsEpics = combineEpics(...Object.values(groupsEpicsHash))
