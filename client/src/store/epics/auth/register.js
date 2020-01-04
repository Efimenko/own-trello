import {ofType} from 'redux-observable'
import {of} from 'rxjs'
import {switchMap, catchError, map} from 'rxjs/operators'
import {ajax} from 'rxjs/ajax'

import {types} from '_store/actions/types'
import {authActions} from '_store/actions/creators'
import {setAuthHeaderToLocalStorage} from '../utils'

export const registerUserEpic = (action$) => {
  return action$.pipe(
    ofType(types.REGISTER_USER),
    switchMap(({payload: {name, email, password, errorsOwner}}) => {
      return ajax({
        url: 'http://localhost:4000/user/register',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({name, email, password}),
      }).pipe(
        map(({response, xhr}) => {
          const AuthorizationHeader = xhr.getResponseHeader('Authorization')
          setAuthHeaderToLocalStorage({header: AuthorizationHeader})
          return authActions.registerUserFulfilled(response)
        }),
        catchError(({response: data}) => {
          const errorsWithUniqId = data.map((error) => ({
            ...error,
            id: Symbol(),
          }))

          return of(
            authActions.registerUserFailed({
              errors: errorsWithUniqId,
              errorsOwner,
            })
          )
        })
      )
    })
  )
}
