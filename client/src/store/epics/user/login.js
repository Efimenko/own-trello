import {ofType} from 'redux-observable'
import {switchMap, catchError, map} from 'rxjs/operators'
import {ajax} from 'rxjs/ajax'

import {userTypes} from 'store/actions/types'
import {userActions, errorsActions} from 'store/actions/creators'
import {setAuthHeaderToLocalStorage} from '../utils'

export const loginUserEpic = (action$) => {
  return action$.pipe(
    ofType(userTypes.LOGIN),
    switchMap(({payload: {email, password, errorsOwner}}) => {
      return ajax({
        url: 'http://localhost:4000/user/login',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, password}),
      }).pipe(
        map(({response: {_id, name, email}, xhr}) => {
          const AuthorizationHeader = xhr.getResponseHeader('Authorization')
          setAuthHeaderToLocalStorage({header: AuthorizationHeader})
          return userActions.add({_id, name, email})
        }),
        catchError(({response: errors}) => {
          const errorsWithUniqId = errors.map((error) => ({
            ...error,
            id: Symbol(),
          }))

          return errorsActions.add({
            errors: errorsWithUniqId,
            errorsOwner,
          })
        })
      )
    })
  )
}
