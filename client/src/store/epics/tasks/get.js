import {ofType} from 'redux-observable'
import {switchMap, catchError, flatMap} from 'rxjs/operators'
import {ajax} from 'rxjs/ajax'

import {
  tasksActions,
  inProgressActions,
  errorsActions,
} from 'store/actions/creators'
import {types} from '../../actions/types'
import {getAuthHeaderFromLocalStorage} from '../utils'
import {of, concat} from 'rxjs'

export const getTasksEpic = ($action) => {
  return $action.pipe(
    ofType(types.GET_TASKS),
    switchMap(({payload: {errorsOwner, inProgressEvent}}) =>
      concat(
        of(inProgressActions.addToInProgress({inProgressEvent})),
        ajax({
          url: 'http://localhost:4000/tasks',
          headers: {
            Authorization: getAuthHeaderFromLocalStorage(),
          },
        }).pipe(
          flatMap(({response: tasks}) =>
            concat(
              of(tasksActions.addTaskFulfilled({task: tasks})),
              of(
                inProgressActions.removeFromInProgress({
                  inProgressEvent,
                })
              )
            )
          ),
          catchError(({response: errors}) => {
            const errorsWithUniqId = errors.map((error) => ({
              ...error,
              id: Symbol(),
            }))

            return concat(
              of(
                inProgressActions.removeFromInProgress({
                  inProgressEvent,
                })
              ),
              of(
                errorsActions.addError({
                  errors: errorsWithUniqId,
                  errorsOwner,
                })
              )
            )
          })
        )
      )
    )
  )
}
