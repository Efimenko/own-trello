import React, {useState, Fragment} from 'react'
import {Form, TaskList} from './components'
import './style.css'

const App = () => {
  const [tasks, setTasks] = useState([])
  const addNewTask = (task) => setTasks([...tasks, task])

  return (
    <Fragment>
      <Form addNewTask={addNewTask} />
      <TaskList tasks={tasks} />
    </Fragment>
  )
}
export default App
