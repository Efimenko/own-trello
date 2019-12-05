import React from 'react'
import {PropTypes} from 'prop-types'

import {GroupItem} from './group-item'

const GroupList = ({groups, tasks}) => {
  if (!groups.length) return null

  return (
    <div>
      {groups.map(({_id, title}) => (
        <GroupItem key={_id} id={_id} title={title} tasks={tasks} />
      ))}
    </div>
  )
}

GroupList.propTypes = {
  groups: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired,
}

export default GroupList
