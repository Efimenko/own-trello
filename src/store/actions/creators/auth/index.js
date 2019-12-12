import {types} from 'store/actions/types/index'

export const registerUser = ({name, email, password, history}) => ({
  type: types.REGISTER_USER,
  payload: {name, email, password, history},
})

export const registerUserFulfilled = ({_id, name, email}) => ({
  type: types.REGISTER_USER_FULFILLED,
  payload: {_id, name, email},
})

export const registerUserFailed = ({message}) => ({
  type: types.REGISTER_USER_FULFILLED,
  payload: {message},
})
