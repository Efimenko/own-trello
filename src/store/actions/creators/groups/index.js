import types from '../../types'

export const addGroup = (payload) => ({
  type: types.ADD_GROUP,
  payload,
})

export const asyncAddGroup = (payload) => {
  return (dispatch) => {
    fetch('http://localhost:4000/group/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => dispatch(addGroup(data)))
      .catch((error) => console.error(error))
  }
}

/* Action creator for set groups to store */
export const setGroups = (payload) => ({
  type: types.SET_GROUPS,
  payload,
})
