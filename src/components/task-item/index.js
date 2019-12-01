import React from 'react'
import PropTypes from 'prop-types'

const TaskItem = ({task, handleRemoveTask}) => {
  return (
    <>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <button type="button" onClick={handleRemoveTask(task._id)}>
        Remove task
      </button>
    </>
  )
}

TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  handleRemoveTask: PropTypes.func.isRequired,
}

export default TaskItem
