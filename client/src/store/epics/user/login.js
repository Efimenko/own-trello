import {ofType} from 'redux-observable'
import {switchMap, catchError, concatMap} from 'rxjs/operators'
import {ajax} from 'rxjs/ajax'
import {of, concat} from 'rxjs'

import {userTypes} from '__store/actions/types'
import {
  userActions,
  errorsActions,
  inProgressActions,
} from '__store/actions/creators'
import {setAuthHeaderToLocalStorage} from '../utils'

export const loginUserEpic = (action$) => {
  return action$.pipe(
    ofType(userTypes.LOGIN),
    switchMap(({payload: {email, password, errorsOwner, inProgressEvent}}) => {
      return concat(
        of(inProgressActions.add({inProgressEvent})),
        ajax({
          url: 'http://localhost:4000/user/login',
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email, password}),
        }).pipe(
          concatMap(({response: {_id, name, email}, xhr}) => {
            const AuthorizationHeader = xhr.getResponseHeader('Authorization')
            setAuthHeaderToLocalStorage({header: AuthorizationHeader})
            return of(
              userActions.add({_id, name, email}),
              inProgressActions.remove({inProgressEvent})
            )
          }),
          catchError(({response: errors}) => {
            const singleError = !Array.isArray(errors)
            const errorsWithUniqId = (singleError ? [errors] : errors).map(
              (error) => ({
                ...error,
                id: Symbol(),
              })
            )

            return of(
              errorsActions.add({
                errors: errorsWithUniqId,
                errorsOwner,
              }),
              inProgressActions.remove({inProgressEvent})
            )
          })
        )
      )
    })
  )
}
