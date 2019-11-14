import React, {useState, Fragment} from 'react'
import {GroupList, AddGroupForm} from './components'
import './style.css'

const App = () => {
  const [tasks, setTasks] = useState([])
  const addNewTask = (parentId) => (task) =>
    setTasks([...tasks, {...task, parent: parentId}])

  const [groups, setGroups] = useState([])
  const addNewGroup = (group) => setGroups([...groups, group])

  return (
    <Fragment>
      <GroupList tasks={tasks} groups={groups} addNewTask={addNewTask} />
      <AddGroupForm addNewGroup={addNewGroup} />
    </Fragment>
  )
}

export default App
