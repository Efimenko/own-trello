import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {TaskItem} from './task-item'
import {tasksActions} from '_store/actions/creators/index'

const TaskListView = ({tasks, dispatch}) => {
  if (!tasks.length) return null

  const handleRemoveTask = (taskId) => () => {
    dispatch(tasksActions.removeTask(taskId))
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

TaskListView.propTypes = {
  tasks: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export const TaskList = connect()(TaskListView)
