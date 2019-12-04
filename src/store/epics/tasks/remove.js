import {ajax} from 'rxjs/ajax'
import {map, catchError, mergeMap} from 'rxjs/operators'
import {ofType} from 'redux-observable'

import types from '../../actions/types'
import {tasksActions} from '../../actions/creators'

export const removeTaskEpic = (action$) => {
  return action$.pipe(
    ofType(types.REMOVE_TASK),
    mergeMap(({payload}) => {
      return ajax({
        url: `http://localhost:4000/task/remove/${payload}`,
        method: 'DELETE',
      }).pipe(
        map(({response}) => {
          if (response.ok && response.deletedCount) {
            return tasksActions.removeTaskFulfilled(payload)
          } else {
            throw new Error('Seems like it was deleted already')
          }
        }),
        catchError((error) => console.error(error))
      )
    })
  )
}
