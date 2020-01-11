import {types} from 'store/actions/types/index'

export const registerUser = ({
  name,
  email,
  password,
  errorsOwner,
  inProgressEvent,
}) => ({
  type: types.REGISTER_USER,
  payload: {name, email, password, errorsOwner, inProgressEvent},
})

export const addUser = ({_id, name, email}) => ({
  type: types.ADD_USER,
  payload: {_id, name, email},
})

export const registerUserFailed = ({errors, errorsOwner}) => ({
  type: types.REGISTER_USER_FAILED,
  payload: {errors, errorsOwner},
})

export const loginUser = ({email, password}) => ({
  type: types.LOGIN_USER,
  payload: {email, password},
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

export const clearUser = () => ({
  type: types.CLEAR_USER,
})
