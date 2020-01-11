import {ajax} from 'rxjs/ajax'
import {map, catchError, mergeMap} from 'rxjs/operators'
import {ofType} from 'redux-observable'

import {tasksTypes} from '../../actions/types'
import {tasksActions} from '../../actions/creators'
import {getAuthHeaderFromLocalStorage} from '../utils'

export const removeTaskEpic = (action$) => {
  return action$.pipe(
    ofType(tasksTypes.REMOVING),
    mergeMap(({payload}) => {
      return ajax({
        url: `http://localhost:4000/task/remove/${payload}`,
        method: 'DELETE',
        headers: {
          Authorization: getAuthHeaderFromLocalStorage(),
        },
      }).pipe(
        map(({response}) => {
          if (response.ok && response.deletedCount) {
            return tasksActions.removed(payload)
          } else {
            // return tasksActions.removeTaskFailed(
            //   'Seems like it was deleted already'
            // )
          }
        })
        // catchError((error) => tasksActions.removeTaskFailed(error.message))
      )
    })
  )
}
