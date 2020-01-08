import {combineEpics} from 'redux-observable'
import {addGroupEpic} from './add'
import {getGroupsEpic} from './get'

const groupsEpicsHash = {
  addGroupEpic,
  getGroupsEpic,
}

export const groupsEpics = combineEpics(...Object.values(groupsEpicsHash))
