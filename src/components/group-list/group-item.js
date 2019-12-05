import React from 'react'
import {PropTypes} from 'prop-types'
import {AddTaskForm} from './add-task-form'
import {TaskList} from './task-list'
import {getTasksByParentId} from 'utils/index'

export const GroupItem = ({id, title, tasks}) => (
  <section>
    <h2>{title}</h2>
    <AddTaskForm parentId={id} />
    <TaskList tasks={getTasksByParentId({parentId: id, tasks})} />
  </section>
)

GroupItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tasks: PropTypes.array.isRequired,
}
