import {ofType} from 'redux-observable'
import {switchMap, catchError, map} from 'rxjs/operators'
import {ajax} from 'rxjs/ajax'

import {types} from 'store/actions/types'
import {authActions} from 'store/actions/creators'
import {setAuthHeaderToLocalStorage} from '../utils'

export const loginUserEpic = (action$) => {
  return action$.pipe(
    ofType(types.LOGIN_USER),
    switchMap(({payload: {email, password}}) => {
      return ajax({
        url: 'http://localhost:4000/user/login',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      }).pipe(
        map(({status, response, xhr}) => {
          if (status === 200) {
            const AuthorizationHeader = xhr.getResponseHeader('Authorization')
            setAuthHeaderToLocalStorage({header: AuthorizationHeader})
            return authActions.loginUserFulfilled(response)
          } else {
            return authActions.loginUserFailed({
              message: 'Something went wrong',
            })
          }
        }),
        catchError((err) => authActions.loginUserFailed({message: err.message}))
      )
    })
  )
}
