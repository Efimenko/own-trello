import React, {useRef, Fragment} from 'react'
import PropTypes from 'prop-types'
import {or, explicitNull} from 'airbnb-prop-types'
import {connect} from 'react-redux'

import {initDataActions} from './store/actions/creators'
import {GroupList} from './components'
import './style.css'

const App = ({tasks, groups, dispatch}) => {
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
    'Loading...'
  ) : (
    <Fragment>
      <GroupList tasks={tasks} groups={groups} />
    </Fragment>
  )
}

App.propTypes = {
  tasks: or([explicitNull, PropTypes.array]).isRequired,
  groups: or([explicitNull, PropTypes.array]).isRequired,
  dispatch: PropTypes.func.isRequired,
}

App.defaultProps = {
  tasks: null,
  groups: null,
}

const mapStateToProps = ({tasks, groups}) => ({
  tasks,
  groups,
})

export default connect(mapStateToProps)(App)
