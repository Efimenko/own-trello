import {userTypes} from 'store/actions/types'

export const register = ({
  name,
  email,
  password,
  errorsOwner,
  inProgressEvent,
}) => ({
  type: userTypes.REGISTER,
  payload: {name, email, password, errorsOwner, inProgressEvent},
})

export const add = ({_id, name, email}) => ({
  type: userTypes.ADD,
  payload: {_id, name, email},
})

// export const registerUserFailed = ({errors, errorsOwner}) => ({
//   type: types.REGISTER_USER_FAILED,
//   payload: {errors, errorsOwner},
// })

export const login = ({email, password, errorsOwner}) => ({
  type: userTypes.LOGIN,
  payload: {email, password, errorsOwner},
})

// export const loginUserFailed = ({message}) => ({
//   type: types.LOGIN_USER_FAILED,
//   payload: {message},
// })

export const loginByToken = ({token, errorsOwner}) => ({
  type: userTypes.LOGIN_BY_TOKEN,
  payload: {token, errorsOwner},
})

// export const loginUserByTokenFailed = ({message}) => ({
//   type: types.LOGIN_USER_FAILED,
//   payload: {message},
// })

export const logOut = () => ({
  type: userTypes.LOG_OUT_USER,
})

export const clear = () => ({
  type: userTypes.CLEAR,
})
