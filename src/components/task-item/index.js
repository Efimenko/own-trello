import React, {useState} from 'react'
import PropTypes from 'prop-types'

import EditTaskForm from '../edit-task-form'

const TaskItem = ({task, handleRemoveTask}) => {
  const [editFormVisible, setEditFormVisible] = useState(false)
  const handleOpenEditTaskForm = () => setEditFormVisible(true)
  const handleCloseEditTaskForm = () => setEditFormVisible(false)

  return (
    <>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      {editFormVisible && (
        <EditTaskForm task={task} onClose={handleCloseEditTaskForm} />
      )}
      {!editFormVisible && (
        <button type="button" onClick={handleOpenEditTaskForm}>
          Edit task
        </button>
      )}
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
