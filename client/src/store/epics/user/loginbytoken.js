import {ofType} from 'redux-observable'
import {switchMap, catchError, map} from 'rxjs/operators'
import {ajax} from 'rxjs/ajax'
import {of} from 'rxjs'

import {userTypes} from '__store/actions/types'
import {userActions, errorsActions} from '__store/actions/creators'

export const loginUserByTokenEpic = (action$) => {
  return action$.pipe(
    ofType(userTypes.LOGIN_BY_TOKEN),
    switchMap(({payload: {token, errorsOwner}}) => {
      return ajax({
        url: 'http://localhost:4000/user/loginbytoken',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({token}),
      }).pipe(
        map(({response: {_id, name, email}}) =>
          userActions.add({_id, name, email})
        ),
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
            })
          )
        })
      )
    })
  )
}
