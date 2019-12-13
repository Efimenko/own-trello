import {ofType} from 'redux-observable'
import {mergeMap, map, catchError} from 'rxjs/operators'
import {ajax} from 'rxjs/ajax'

import {types} from '../../actions/types'
import {groupsActions} from '../../actions/creators'
import {getAuthHeaderFromLocalStorage} from '../utils'

export const addGroupEpic = (action$) => {
  return action$.pipe(
    ofType(types.ADD_GROUP),
    mergeMap(({payload: {title}}) =>
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
        map(({status, response}) => {
          if (status === 201) {
            return groupsActions.addGroupFulfilled(response)
          } else {
            return groupsActions.addGroupFailed('Something went wrong')
          }
        }),
        catchError((error) => groupsActions.addGroupFailed(error.message))
      )
    )
  )
}
