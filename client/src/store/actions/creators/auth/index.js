import {types} from 'store/actions/types/index'

export const registerUser = ({name, email, password}) => ({
  type: types.REGISTER_USER,
  payload: {name, email, password},
})

export const registerUserFulfilled = ({_id, name, email}) => ({
  type: types.REGISTER_USER_FULFILLED,
  payload: {_id, name, email},
})

export const registerUserFailed = ({message}) => ({
  type: types.REGISTER_USER_FAILED,
  payload: {message},
})

export const loginUser = ({email, password}) => ({
  type: types.LOGIN_USER,
  payload: {email, password},
})

export const loginUserFulfilled = ({_id, name, email}) => ({
  type: types.LOGIN_USER_FULFILLED,
  payload: {_id, name, email},
})

export const loginUserFailed = ({message}) => ({
  type: types.LOGIN_USER_FAILED,
  payload: {message},
})

export const loginUserByToken = ({token}) => ({
  type: types.LOGIN_USER_BY_TOKEN,
  payload: {token},
})

export const loginUserByTokenFailed = ({message}) => ({
  type: types.LOGIN_USER_FAILED,
  payload: {message},
})

export const logOutUser = () => ({
  type: types.LOG_OUT_USER,
})
