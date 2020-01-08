import {ofType} from 'redux-observable'
import {of, concat} from 'rxjs'
import {switchMap, catchError, map} from 'rxjs/operators'
import {ajax} from 'rxjs/ajax'

import {types} from 'store/actions/types'
import {
  authActions,
  inProgressActions,
  errorsActions,
} from 'store/actions/creators'
import {setAuthHeaderToLocalStorage} from '../utils'

export const registerUserEpic = (action$) => {
  return action$.pipe(
    ofType(types.REGISTER_USER),
    switchMap(() =>
      of(inProgressActions.addToInProgress({entityName: 'userRegistration'}))
    ),
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
          return [
            authActions.registerUserFulfilled(response),
            inProgressActions.removeFromInProgress({
              entityName: 'userRegistration',
            }),
          ]
        }),
        catchError(({response: data}) => {
          const errorsWithUniqId = data.map((error) => ({
            ...error,
            id: Symbol(),
          }))

          return concat(
            of(
              inProgressActions.removeFromInProgress({
                entityName: 'userRegistration',
              })
            ),
            of(
              errorsActions.addError({
                errors: errorsWithUniqId,
                errorsOwner,
              })
            )
          )
        })
      )
    })
  )
}
