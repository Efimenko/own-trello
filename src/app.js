import React, {useState, Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {addTask, addGroup} from './store/actions/creators'
import {GroupList, AddGroupForm} from './components'
import './style.css'

const App = ({tasks, groups}) => {
  const addNewTask = (parentId) => (task) =>
    setTasks([...tasks, {...task, parent: parentId}])

  const addNewGroup = (group) => setGroups([...groups, group])

  return (
    <Fragment>
      <GroupList tasks={tasks} groups={groups} addNewTask={addNewTask} />
      <AddGroupForm addNewGroup={addNewGroup} />
    </Fragment>
  )
}

App.propTypes = {
  tasks: PropTypes.object.isRequired,
  groups: PropTypes.object.isRequred,
}

const mapStateToProps = ({tasks, groups}) => ({
  tasks,
  groups,
})

export default connect(mapStateToProps)(App)
