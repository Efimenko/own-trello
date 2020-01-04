import {ofType} from 'redux-observable'
import {switchMap, catchError, map} from 'rxjs/operators'
import {ajax} from 'rxjs/ajax'

import {types} from '_store/actions/types'
import {authActions} from '_store/actions/creators'

export const loginUserByTokenEpic = (action$) => {
  return action$.pipe(
    ofType(types.LOGIN_USER_BY_TOKEN),
    switchMap(({payload: {token}}) => {
      return ajax({
        url: 'http://localhost:4000/user/loginbytoken',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({token}),
      }).pipe(
        map(({status, response}) => {
          if (status === 200) {
            return authActions.loginUserFulfilled(response)
          } else {
            return authActions.loginUserByTokenFailed({
              message: 'Something went wrong',
            })
          }
        }),
        catchError((err) =>
          authActions.loginUserByTokenFailed({message: err.message})
        )
      )
    })
  )
}
