import React from 'react'
import {PropTypes} from 'prop-types'

import Form from '../form'
import TaskList from '../task-list'

const getTasksByParentId = ({parentId, tasks}) =>
  tasks.filter((task) => task.parent === parentId)

const GroupList = ({groups, addNewTask, tasks}) => {
  if (!groups.length) return null

  return (
    <div>
      {groups.map(({id, title}) => (
        <section key={id}>
          <h2>{title}</h2>
          <Form addNewTask={addNewTask(id)} />
          <TaskList tasks={getTasksByParentId({parentId: id, tasks})} />
        </section>
      ))}
    </div>
  )
}

GroupList.propTypes = {
  groups: PropTypes.array.isRequired,
  addNewTask: PropTypes.func.isRequired,
  tasks: PropTypes.array.isRequired,
}

export default GroupList
