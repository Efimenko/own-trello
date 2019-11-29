import React, {useState} from 'react'
import PropTypes from 'prop-types'

const Form = ({addNewTask}) => {
  const [inputValue, setInputValue] = useState('')
  const [textareaValue, setTextareaValue] = useState('')

  const handleInputChange = (event) => setInputValue(event.target.value)
  const handleTextareaChange = (event) => setTextareaValue(event.target.value)
  const resetInput = () => setInputValue('')
  const resetTextarea = () => setTextareaValue('')
  const handleSubmitForm = (event) => {
    event.preventDefault()
    addNewTask({title: inputValue, description: textareaValue})
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
      <button type="submit">Add task</button>
    </form>
  )
}

Form.propTypes = {
  addNewTask: PropTypes.func.isRequired,
}

export default Form
