import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'

import GroupList from '__components/group-list/index'
import {userActions, tasksActions, groupsActions} from '__store/actions/creators'

export const GroupsPage = () => {
  const groups = useSelector((state) => state.groups)
  const tasks = useSelector((state) => state.tasks)
  const dispatch = useDispatch()
  const fetchGroupsInProgress = useSelector(
    (state) => state.inProgress.fetchGroups
  )
  const fetchTasksInProgress = useSelector(
    (state) => state.inProgress.fetchTasks
  )
  const shouldBeShownLoading =
    fetchGroupsInProgress || !groups || fetchTasksInProgress || !tasks

  useEffect(() => {
    if (!groups && !fetchGroupsInProgress) {
      dispatch(
        groupsActions.get({
          errorsOwner: 'groupsPage',
          inProgressEvent: 'fetchGroups',
        })
      )
    }
    if (!tasks && !fetchTasksInProgress) {
      dispatch(
        tasksActions.get({
          errorsOwner: 'groupsPage',
          inProgressEvent: 'fetchTasks',
        })
      )
    }
  }, [tasks, groups, dispatch, fetchGroupsInProgress, fetchTasksInProgress])

  const handleLogOut = () => {
    localStorage.removeItem('authToken')
    dispatch(userActions.logOut())
  }

  return shouldBeShownLoading ? (
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
