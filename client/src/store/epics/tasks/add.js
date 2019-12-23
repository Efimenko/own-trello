import {ajax} from 'rxjs/ajax'
import {map, mergeMap, catchError} from 'rxjs/operators'
import {ofType} from 'redux-observable'

import {types} from '../../actions/types'
import {tasksActions} from '../../actions/creators'
import {getAuthHeaderFromLocalStorage} from '../utils'

export const addTaskEpic = (action$) => {
  return action$.pipe(
    ofType(types.ADD_TASK),
    mergeMap(({payload}) =>
      ajax({
        url: 'http://localhost:4000/task/add',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: getAuthHeaderFromLocalStorage(),
        },
        body: JSON.stringify(payload),
      }).pipe(
        map(({status, response}) => {
          if (status === 201) {
            return tasksActions.addTaskFulfilled(response)
          } else {
            return tasksActions.addTaskFailed('Something went wrong')
          }
        }),
        catchError((error) => tasksActions.addTaskFailed(error.message))
      )
    )
  )
}