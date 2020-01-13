import {ofType} from 'redux-observable'
import {switchMap} from 'rxjs/operators'

import {types} from 'store/actions/types'
import {authActions, groupsActions, tasksActions} from 'store/actions/creators'
import {concat, of} from 'rxjs'

export const logOutUserEpic = (action$) => {
  return action$.pipe(
    ofType(types.LOG_OUT_USER),
    switchMap(() =>
      concat(
        of(authActions.clearUser()),
        of(groupsActions.clear()),
        of(tasksActions.clear())
      )
    )
  )
}
