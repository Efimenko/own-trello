import types from '../../types'

const dataReady = () => ({
  type: types.SET_DATA_READY,
})

const setInitData = (payload) => ({
  type: types.SET_INIT_DATA,
  payload,
})

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
      dispatch(setInitData({groups, tasks}))
    })
  }
}
