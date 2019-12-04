import {combineEpics} from 'redux-observable'
import {addGroupEpic} from './add'

const groupsEpicsHash = {
  addGroupEpic,
}

const groupsEpics = combineEpics(...Object.values(groupsEpicsHash))

export default groupsEpics
