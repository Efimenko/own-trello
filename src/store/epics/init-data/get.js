import {ofType} from 'redux-observable'
import {switchMap, map, catchError} from 'rxjs/operators'
import {forkJoin} from 'rxjs'
import {ajax} from 'rxjs/ajax'

import {initDataActions} from '../../actions/creators'
import {types} from '../../actions/types'

export const getInitDataEpic = ($action) => {
  return $action.pipe(
    ofType(types.INIT_DATA),
    switchMap(() =>
      forkJoin({
        tasks: ajax({
          url: 'http://localhost:4000/tasks',
        }),
        groups: ajax({
          url: 'http://localhost:4000/groups',
        }),
      }).pipe(
        map(({tasks: {response: tasks}, groups: {response: groups}}) => {
          return initDataActions.getInitDataFulfilled({tasks, groups})
        }),
        catchError((error) => initDataActions.getInitDataFailed(error.message))
      )
    )
  )
}