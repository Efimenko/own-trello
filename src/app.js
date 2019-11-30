import React, {useRef, Fragment} from 'react'
import PropTypes from 'prop-types'
import {or, explicitNull} from 'airbnb-prop-types'
import {connect} from 'react-redux'

import {generalActions} from './store/actions/creators'
import {GroupList, AddGroupForm} from './components'
import './style.css'

const App = ({tasks, groups, dataReady, dispatch}) => {
  const fetchDataInitiated = useRef(false)
  if (!dataReady && !fetchDataInitiated.current) {
    dispatch(generalActions.init())
    fetchDataInitiated.current = true
  }

  return !dataReady ? (
    'Loading...'
  ) : (
    <Fragment>
      <GroupList tasks={tasks} groups={groups} />
      <AddGroupForm />
    </Fragment>
  )
}

App.propTypes = {
  tasks: or([explicitNull, PropTypes.array]).isRequired,
  groups: or([explicitNull, PropTypes.array]).isRequired,
  dataReady: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}

App.defaultProps = {
  tasks: null,
  groups: null,
}

const mapStateToProps = ({tasks, groups, dataReady}) => ({
  tasks,
  groups,
  dataReady,
})

export default connect(mapStateToProps)(App)
