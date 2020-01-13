import {combineEpics} from 'redux-observable'
import {registerUserEpic} from './register'
import {loginUserEpic} from './login'
import {loginUserByTokenEpic} from './loginbytoken'
import {logOutUserEpic} from './logout'

const userEpicsHash = {
  registerUserEpic,
  loginUserEpic,
  loginUserByTokenEpic,
  logOutUserEpic,
}

export const userEpics = combineEpics(...Object.values(userEpicsHash))
