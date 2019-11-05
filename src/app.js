import React, {useState, Fragment} from 'react'
import css from './style.css'

const App = () => {
  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [textareaValue, setTextareaValue] = useState('')

  const handleInputChange = (event) => setInputValue(event.target.value)
  const handleTextareaChange = (event) => setTextareaValue(event.target.value)
  const resetInput = () => setInputValue('')
  const resetTextarea = () => setTextareaValue('')
  const handleSubmitForm = (event) => {
    event.preventDefault()
    setTasks([
      ...tasks,
      {id: Date.now(), title: inputValue, description: textareaValue},
    ])
    resetInput()
    resetTextarea()
  }
  return (
    <Fragment>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="task-title-input" className={css['some-class']}>
          Title
        </label>
        <input
          type="text"
          placeholder="Type some title"
          value={inputValue}
          onChange={handleInputChange}
          id="task-title-input"
          required
        />
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
      {Boolean(tasks.length) && (
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <h2>{task.title}</h2>
              <p>{task.description}</p>
            </li>
          ))}
        </ul>
      )}
    </Fragment>
  )
}
export default App
