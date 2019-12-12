import {ofType} from 'redux-observable'
import {types} from 'store/actions/types'
import {switchMap, catchError, map} from 'rxjs/operators'
import {ajax} from 'rxjs/ajax'
import {authActions} from 'store/actions/creators'

const setAuthHeaderToLocalStorage = ({header}) => {
  const token = header.split(' ')[1]
  localStorage.setItem('authToken', token)
}

export const registerUserEpic = (action$) => {
  return action$.pipe(
    ofType(types.REGISTER_USER),
    switchMap(({payload: {name, email, password, history}}) => {
      return ajax({
        url: 'http://localhost:4000/user/register',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, password}),
      }).pipe(
        map(({status, response, xhr}) => {
          if (status === 200) {
            const AuthorizationHeader = xhr.getResponseHeader('Authorization')
            setAuthHeaderToLocalStorage({header: AuthorizationHeader})
            history.push('/')
            return authActions.registerUserFulfilled(response)
          } else {
            return authActions.registerUserFailed({
              message: 'Something went wrong',
            })
          }
        }),
        catchError((err) =>
          authActions.registerUserFailed({message: err.message})
        )
      )
    })
  )
}
