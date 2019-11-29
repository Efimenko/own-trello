import React, {useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {generalActions} from './store/actions/creators'
import {GroupList, AddGroupForm} from './components'
import './style.css'

const App = ({tasks, groups, dispatch}) => {
  const [dataFetched, setDataFetched] = useState(groups && tasks)
  if (!dataFetched) {
    dispatch(generalActions.init())
  }

  if (tasks && groups && !dataFetched) {
    setDataFetched(true)
  }

  return !dataFetched ? (
    'Loading...'
  ) : (
    <Fragment>
      <GroupList tasks={tasks} groups={groups} />
      <AddGroupForm />
    </Fragment>
  )
}

App.propTypes = {
  // tasks: function(props, propName, componentName) {
  //   const propValue = props[propName]
  //   if (propValue === null) return
  //   if (Array.isArray(propValue)) return
  //   return new Error(
  //     `${componentName} only accepts null or array, but its value is \`${propValue}\``
  //   )
  // },
  tasks: PropTypes.array,
  groups: PropTypes.array,
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
