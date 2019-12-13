import React, {useRef} from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import {or, explicitNull} from 'airbnb-prop-types'

import GroupList from 'components/group-list/index'
import {initDataActions} from 'store/actions/creators'

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

  return fetchDataInitiated.current && !dataFetched.current ? (
    'Loading groups...'
  ) : (
    <GroupList tasks={tasks} groups={groups} />
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
