import {types} from '../actions/types'

const defaultState = {
  user: null,
  groups: null,
  tasks: null,
  errors: {},
  inProgress: {},
}

export default (state = defaultState, {type, payload}) => {
  switch (type) {
    case types.REGISTER_USER:
      return {
        ...state,
        inProgress: {...state.inProgress, userRegistration: true},
      }
    case types.REGISTER_USER_FULFILLED:
      return {
        ...state,
        user: payload,
        inProgress: {
          ...Object.keys(state.inProgress).reduce((acc, processItem) => {
            if (processItem === 'userRegistration') return acc
            return {...acc, [processItem]: state.inProgress[processItem]}
          }, {}),
        },
      }
    case types.REGISTER_USER_FAILED:
      return {
        ...state,
        errors: {
          ...state.errors,
          [payload.errorsOwner]: [
            ...(state.errors[payload.errorsOwner] || []),
            ...payload.errors,
          ],
        },
        inProgress: {
          ...Object.keys(state.inProgress).reduce((acc, entityInProgress) => {
            if (entityInProgress === 'userRegistration') return acc
            return {
              ...acc,
              [entityInProgress]: state.inProgress[entityInProgress],
            }
          }, {}),
        },
      }
    case types.LOGIN_USER_FULFILLED:
      return {
        ...state,
        user: payload,
      }
    case types.LOG_OUT_USER:
      return {
        ...state,
        user: null,
      }
    case types.INIT_DATA_FULFILLED:
      return {
        ...state,
        ...payload,
      }
    case types.ADD_GROUP_FULFILLED:
      return {
        ...state,
        groups: [...state.groups, payload],
      }
    case types.ADD_TASK_FULFILLED:
      return {
        ...state,
        tasks: [...state.tasks, payload],
      }
    case types.REMOVE_TASK_FULFILLED:
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== payload),
      }
    case types.UPDATE_TASK_FULFILLED:
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task._id === payload._id) {
            return {...payload}
          }
          return task
        }),
      }
    case types.REMOVE_ERROR:
      return {
        ...state,
        errors: {
          ...state.errors,
          [payload.errorsOwner]: [
            ...(state.errors[payload.errorsOwner].filter(
              (error) => error.id !== payload.errorId
            ) || []),
          ],
        },
      }
    default:
      return state
  }
}
