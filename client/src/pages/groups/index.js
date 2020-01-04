import React, {useRef} from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import {or, explicitNull} from 'airbnb-prop-types'

import GroupList from '_components/group-list/index'
import {initDataActions, authActions} from '_store/actions/creators'

const GroupsPageView = ({tasks, groups, dispatch}) => {
  const fetchDataInitiated = useRef(false)
  const dataFetched = useRef(tasks && groups)

  if (!fetchDataInitiated.current) {
    dispatch(initDataActions.getInitData())
    fetchDataInitiated.current = true
  }

  if (!dataFetched.current && tasks && groups) {
    dataFetched.current = true
  }

  const handleLogOut = () => {
    localStorage.removeItem('authToken')
    dispatch(authActions.logOutUser())
  }

  return fetchDataInitiated.current && !dataFetched.current ? (
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

GroupsPageView.propTypes = {
  tasks: or([explicitNull, PropTypes.array]).isRequired,
  groups: or([explicitNull, PropTypes.array]).isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = ({tasks, groups}) => ({
  tasks,
  groups,
})

export const GroupPage = connect(mapStateToProps)(GroupsPageView)
