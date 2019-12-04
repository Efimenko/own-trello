import React, {useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {tasksActions} from '../../store/actions/creators'

const EditTaskForm = ({
  task,
  task: {title, description},
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

  const addNewTask = (task) => {
    dispatch(tasksActions.asyncAddTask(task))
  }

  const handleSubmitForm = (event) => {
    event.preventDefault()
    // addNewTask({
    //   title: inputValue,
    //   description: textareaValue,
    //   parent: parentId,
    // })
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

EditTaskForm.propTypes = {
  task: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect()(EditTaskForm)