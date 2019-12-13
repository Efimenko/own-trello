import {combineEpics} from 'redux-observable'
import {registerUserEpic} from './register'
import {loginUserEpic} from './login'
import {loginUserByTokenEpic} from './loginbytoken'

const authEpicsHash = {
  registerUserEpic,
  loginUserEpic,
  loginUserByTokenEpic,
}

export const authEpics = combineEpics(...Object.values(authEpicsHash))
