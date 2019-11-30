import React from 'react'
import {PropTypes} from 'prop-types'

import AddTaskForm from '../add-task-form'
import TaskList from '../task-list'

const getTasksByParentId = ({parentId, tasks}) =>
  tasks.filter((task) => task.parent === parentId)

const GroupList = ({groups, tasks}) => {
  if (!groups.length) return null

  return (
    <div>
      {groups.map(({_id, title}) => (
        <section key={_id}>
          <h2>{title}</h2>
          <AddTaskForm parentId={_id} />
          <TaskList tasks={getTasksByParentId({parentId: _id, tasks})} />
        </section>
      ))}
    </div>
  )
}

GroupList.propTypes = {
  groups: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired,
}

export default GroupList
