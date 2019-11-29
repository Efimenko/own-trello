import types from '../../types'

/* Action creator for add task to store */
export const addTask = (payload) => ({
  type: types.ADD_TASK,
  payload,
})

/* Async action creator for add task on api
and then returned value set to store */
export const asyncAddTask = (payload) => {
  return (dispatch) => {
    fetch('http://localhost:4000/task/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => dispatch(addTask(data)))
      .catch((error) => console.error(error))
  }
}

/* Action creator for set tasks to store */
export const setTasks = (payload) => ({
  type: types.SET_TASKS,
  payload,
})
