import {combineEpics} from 'redux-observable'
import {registerUserEpic} from './register'
import {loginUserEpic} from './login'
import {loginUserByTokenEpic} from './loginbytoken'
import {logOutUserEpic} from './logout'

const authEpicsHash = {
  registerUserEpic,
  loginUserEpic,
  loginUserByTokenEpic,
  logOutUserEpic,
}

export const authEpics = combineEpics(...Object.values(authEpicsHash))
