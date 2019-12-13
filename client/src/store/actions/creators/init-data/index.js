import {types} from '../../types'

/* Get init data action creators */

export const getInitData = () => ({
  type: types.INIT_DATA,
})

export const getInitDataFulfilled = ({tasks, groups}) => ({
  type: types.INIT_DATA_FULFILLED,
  payload: {tasks, groups},
})

export const getInitDataFailed = ({message}) => ({
  type: types.INIT_DATA_FAILED,
  payload: message,
})
