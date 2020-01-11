import {ofType} from 'redux-observable'
import {tasksTypes} from '../../actions/types/index'
import {switchMap, map, catchError} from 'rxjs/operators'
import {ajax} from 'rxjs/ajax'
import {tasksActions} from '../../actions/creators/index'
import {getAuthHeaderFromLocalStorage} from '../utils'

export const updateTaskEpic = (action$) => {
  return action$.pipe(
    ofType(tasksTypes.UPDATING),
    switchMap(({payload: {taskId, data}}) => {
      return ajax({
        url: `http://localhost:4000/task/update/${taskId}`,
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: getAuthHeaderFromLocalStorage(),
        },
        body: JSON.stringify(data),
      }).pipe(
        map(({response}) => {
          if (response.ok && response.nModified) {
            console.log({data, taskId})
            return tasksActions.updated({...data, _id: taskId})
          } else {
            // return tasksActions.updateTaskFailed({
            //   message: 'Something went wrong',
            // })
          }
        })
        // catchError((error) =>
        //   tasksActions.updateTaskFailed({message: error.message})
        // )
      )
    })
  )
}
