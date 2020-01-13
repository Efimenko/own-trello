import {ofType} from 'redux-observable'
import {switchMap, catchError, flatMap} from 'rxjs/operators'
import {ajax} from 'rxjs/ajax'

import {
  groupsActions,
  inProgressActions,
  errorsActions,
} from 'store/actions/creators'
import {groupsTypes} from '../../actions/types'
import {getAuthHeaderFromLocalStorage} from '../utils'
import {of, concat} from 'rxjs'

export const getGroupsEpic = ($action) => {
  return $action.pipe(
    ofType(groupsTypes.GET),
    switchMap(({payload: {errorsOwner, inProgressEvent}}) =>
      concat(
        of(inProgressActions.add({inProgressEvent})),
        ajax({
          url: 'http://localhost:4000/groups',
          headers: {
            Authorization: getAuthHeaderFromLocalStorage(),
          },
        }).pipe(
          flatMap(({response: groups}) =>
            concat(
              of(groupsActions.added({group: groups})),
              of(inProgressActions.remove({inProgressEvent}))
            )
          ),
          catchError(({response: errors}) => {
            const errorsWithUniqId = errors.map((error) => ({
              ...error,
              id: Symbol(),
            }))

            return concat(
              of(inProgressActions.remove({inProgressEvent})),
              of(
                errorsActions.add({
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
