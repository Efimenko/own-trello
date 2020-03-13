import React, {useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {tasksActions} from '__store/actions/creators/index'

const EditTaskFormView = ({
  task,
  task: {_id, title, description},
  onClose,
  dispatch,
}) => {
  const [inputValue, setInputValue] = useState(title)
  const [textareaValue, setTextareaValue] = useState(description)
  const [canSave, setCanSave] = useState(false)

  const updateCanSave = ({key, value}) => {
    const data = {title: inputValue, description: textareaValue, [key]: value}
    const hasChanges = Object.keys(data).some((key) => task[key] !== data[key])
    if (hasChanges) {
      setCanSave(true)
    } else {
      setCanSave(false)
    }
  }

  const handleInputChange = (event) => {
    const {
      target: {value},
    } = event
    setInputValue(value)
    updateCanSave({key: 'title', value})
  }
  const handleTextareaChange = (event) => {
    const {
      target: {value},
    } = event
    setTextareaValue(value)
    updateCanSave({key: 'description', value})
  }

  const updateTask = ({taskId, title, description}) => {
    dispatch(tasksActions.updating({taskId, data: {title, description}}))
  }

  const handleSubmitForm = (event) => {
    event.preventDefault()
    updateTask({
      taskId: _id,
      title: inputValue,
      description: textareaValue,
    })
    onClose()
  }
  return (
    <form onSubmit={handleSubmitForm}>
      <label htmlFor="task-title-input">Title</label>
      <input
        type="text"
        placeholder="Type some title"
        value={inputValue}
        onChange={handleInputChange}
        id="task-title-input"
        required
      />
      <br />
      <label htmlFor="task-description-input">Description</label>
      <textarea
        placeholder="Type some description"
        value={textareaValue}
        onChange={handleTextareaChange}
        id="task-description-input"
        required
      ></textarea>
      <button type="button" onClick={onClose}>
        Close
      </button>
      <button type="submit" disabled={!canSave}>
        Save task
      </button>
    </form>
  )
}

EditTaskFormView.propTypes = {
  task: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export const EditTaskForm = connect()(EditTaskFormView)
