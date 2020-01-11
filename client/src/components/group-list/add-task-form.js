import React, {useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'

import {tasksActions} from 'store/actions/creators'

const AddTaskFormView = ({parentId, dispatch}) => {
  const [inputValue, setInputValue] = useState('')
  const [textareaValue, setTextareaValue] = useState('')

  const handleInputChange = (event) => setInputValue(event.target.value)
  const handleTextareaChange = (event) => setTextareaValue(event.target.value)
  const resetInput = () => setInputValue('')
  const resetTextarea = () => setTextareaValue('')

  const addNewTask = ({title, description, parent}) => {
    dispatch(
      tasksActions.adding({
        parent,
        description,
        title,
        errorsOwner: 'addTaskForm',
      })
    )
  }

  const handleSubmitForm = (event) => {
    event.preventDefault()
    addNewTask({
      title: inputValue,
      description: textareaValue,
      parent: parentId,
    })
    resetInput()
    resetTextarea()
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
      <br />
      <button type="submit">Add task</button>
    </form>
  )
}

AddTaskFormView.propTypes = {
  parentId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export const AddTaskForm = connect()(AddTaskFormView)
