import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import GroupList from '_components/group-list/index'
import {authActions, tasksActions, groupsActions} from '_store/actions/creators'

export const GroupsPage = () => {
  const groups = useSelector((state) => state.groups)
  const tasks = useSelector((state) => state.tasks)
  const dispatch = useDispatch()
  const groupsPageInProgress =
    useSelector((state) => state.inProgress.groupsPage) || !groups || !tasks

  useEffect(() => {
    if (!groups) {
      dispatch(groupsActions.getGroups({errorsOwner: 'groupsPage'}))
    }
    if (!tasks) {
      dispatch(tasksActions.getTasks())
    }
  }, [tasks, groups, dispatch])

  const handleLogOut = () => {
    localStorage.removeItem('authToken')
    dispatch(authActions.logOutUser())
  }

  console.log({groupsPageInProgress})

  return groupsPageInProgress ? (
    'Loading groups...'
  ) : (
    <React.Fragment>
      <button type="button" onClick={handleLogOut}>
        Log out
      </button>
      <GroupList tasks={tasks} groups={groups} />
    </React.Fragment>
  )
}
