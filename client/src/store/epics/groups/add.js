import {ofType} from 'redux-observable'
import {mergeMap, map, catchError} from 'rxjs/operators'
import {ajax} from 'rxjs/ajax'

import {groupsTypes} from '../../actions/types'
import {groupsActions, errorsActions} from '../../actions/creators'
import {getAuthHeaderFromLocalStorage} from '../utils'

export const addGroupEpic = (action$) => {
  return action$.pipe(
    ofType(groupsTypes.ADDING),
    mergeMap(({payload: {title, errorsOwner}}) =>
      ajax({
        url: 'http://localhost:4000/group/add',
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: getAuthHeaderFromLocalStorage(),
        },
        body: JSON.stringify({title}),
      }).pipe(
        map(({response}) => groupsActions.added({group: response})),
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
