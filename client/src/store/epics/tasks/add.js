import {ajax} from 'rxjs/ajax'
import {map, mergeMap, catchError} from 'rxjs/operators'
import {ofType} from 'redux-observable'

import {tasksTypes} from '../../actions/types'
import {tasksActions, errorsActions} from '../../actions/creators'
import {getAuthHeaderFromLocalStorage} from '../utils'

export const addTaskEpic = (action$) => {
  return action$.pipe(
    ofType(tasksTypes.ADDING),
    mergeMap(({payload: {parent, description, title, errorsOwner}}) =>
      ajax({
        url: 'http://localhost:4000/task/add',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: getAuthHeaderFromLocalStorage(),
        },
        body: JSON.stringify({parent, description, title}),
      }).pipe(
        map(({response: task}) => tasksActions.added({task})),
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
    )
  )
}
