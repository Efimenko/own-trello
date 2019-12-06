import {ofType} from 'redux-observable'
import {types} from '../../actions/types/index'
import {switchMap, map, catchError} from 'rxjs/operators'
import {ajax} from 'rxjs/ajax'
import {tasksActions} from '../../actions/creators/index'

export const updateTaskEpic = (action$) => {
  return action$.pipe(
    ofType(types.UPDATE_TASK),
    switchMap(({payload: {taskId, data}}) => {
      return ajax({
        url: `http://localhost:4000/task/update/${taskId}`,
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).pipe(
        map(({response}) => {
          if (response.ok && response.nModified) {
            return tasksActions.updateTaskFulfilled({...data, _id: taskId})
          } else {
            return tasksActions.updateTaskFailed({
              message: 'Something went wrong',
            })
          }
        }),
        catchError((error) =>
          tasksActions.updateTaskFailed({message: error.message})
        )
      )
    })
  )
}
