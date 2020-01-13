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
    switchMap(
      ({payload: {name, email, password, errorsOwner, inProgressEvent}}) =>
        concat(
          of(inProgressActions.add({inProgressEvent})),
          ajax({
            url: 'http://localhost:4000/user/register',
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, email, password}),
          }).pipe(
            map(({response: {_id, name, email}, xhr}) => {
              const AuthorizationHeader = xhr.getResponseHeader('Authorization')
              setAuthHeaderToLocalStorage({header: AuthorizationHeader})
              return [
                authActions.addUser({_id, name, email}),
                inProgressActions.remove({inProgressEvent}),
              ]
            }),
            catchError(({response: errors}) => {
              const errorsWithUniqId = errors.map((error) => ({
                ...error,
                id: Symbol(),
              }))

              return concat(
                of(inProgressActions.remove({inProgressEvent})),
                of(
                  errorsActions.add({
                    errors: errorsWithUniqId,
                    errorsOwner,
                  })
                )
              )
            })
          )
        )
    )
  )
}
