import React from 'react'
import PropTypes from 'prop-types'

const TaskList = ({tasks}) => {
  if (!tasks.length) return null

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <h2>{task.title}</h2>
          <p>{task.description}</p>
        </li>
      ))}
    </ul>
  )
}

TaskList.propTypes = {
  tasks: PropTypes.array.isRequired,
}

export default TaskList
