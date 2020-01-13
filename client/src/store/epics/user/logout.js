import {ofType} from 'redux-observable'
import {switchMap} from 'rxjs/operators'

import {userTypes} from 'store/actions/types'
import {userActions, groupsActions, tasksActions} from 'store/actions/creators'
import {concat, of} from 'rxjs'

export const logOutUserEpic = (action$) => {
  return action$.pipe(
    ofType(userTypes.LOG_OUT),
    switchMap(() =>
      concat(
        of(userActions.clear()),
        of(groupsActions.clear()),
        of(tasksActions.clear())
      )
    )
  )
}
