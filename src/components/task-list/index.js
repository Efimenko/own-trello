import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import TaskItem from '../task-item'
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
          <TaskItem task={task} handleRemoveTask={handleRemoveTask} />
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
