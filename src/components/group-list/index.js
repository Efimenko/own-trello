import React from 'react'
import {PropTypes} from 'prop-types'

import {GroupItem} from './group-item'
import css from './style.css'
import {AddGroupForm} from './add-group-form'

const GroupList = ({groups, tasks}) => {
  return (
    <ul className={css['group-list']}>
      {groups.map(({_id, title}) => (
        <li className={css['group-column']} key={_id}>
          <GroupItem id={_id} title={title} tasks={tasks} />
        </li>
      ))}
      <li className={css['group-column']} key="add-group-form">
        <AddGroupForm />
      </li>
    </ul>
  )
}

GroupList.propTypes = {
  groups: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired,
}

export default GroupList
