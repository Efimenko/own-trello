import {combineEpics} from 'redux-observable'

import {getInitDataEpic} from './get'

const initDataEpicsHash = {
  getInitDataEpic,
}

export const initDataEpic = combineEpics(...Object.values(initDataEpicsHash))
