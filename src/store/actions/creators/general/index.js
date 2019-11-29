import {setGroups} from '../groups'
import {setTasks} from '../tasks'

/* Async action creator for fetch groups and tasks */
export const init = () => {
  return (dispatch) => {
    const fetchGroups = fetch('http://localhost:4000/groups').then((response) =>
      response.json()
    )
    const fetchTasks = fetch('http://localhost:4000/tasks').then((response) =>
      response.json()
    )
    Promise.all([fetchGroups, fetchTasks]).then(([groups, tasks]) => {
      dispatch(setGroups(groups))
      dispatch(setTasks(tasks))
    })
  }
}
