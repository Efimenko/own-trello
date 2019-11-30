import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {tasksActions} from '../../store/actions/creators'

const TaskList = ({tasks, dispatch}) => {
  if (!tasks.length) return null

  const handleRemoveTask = (taskId) => () => {
    dispatch(tasksActions.asyncRemoveTask(taskId))
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task._id}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <button type="button" onClick={handleRemoveTask(task._id)}>
            Remove task
          </button>
        </li>
      ))}
    </ul>
  )
}

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect()(TaskList)
