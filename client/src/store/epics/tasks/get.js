import {ofType} from 'redux-observable'
import {switchMap, map, catchError} from 'rxjs/operators'
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
    switchMap(() =>
      of(inProgressActions.addToInProgress({entityName: 'groupsPage'}))
    ),
    switchMap(({payload: {errorsOwner}}) =>
      ajax({
        url: 'http://localhost:4000/tasks',
        headers: {
          Authorization: getAuthHeaderFromLocalStorage(),
        },
      }).pipe(
        map(({response: groups}) => [
          tasksActions.addGroupFulfilled({group: groups}),
          inProgressActions.removeFromInProgress({
            entityName: 'groupsPage',
          }),
        ]),
        catchError(({response: errors}) => {
          const errorsWithUniqId = errors.map((error) => ({
            ...error,
            id: Symbol(),
          }))

          return concat(
            of(
              inProgressActions.removeFromInProgress({
                entityName: 'groupsPage',
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
}
