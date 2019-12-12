import {combineEpics} from 'redux-observable'
import {registerUserEpic} from './register'

const authEpicsHash = {
  registerUserEpic,
}

export const authEpics = combineEpics(...Object.values(authEpicsHash))
