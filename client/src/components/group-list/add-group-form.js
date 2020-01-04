import React, {useState} from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {groupsActions} from '_store/actions/creators'

const AddGroupFormView = ({dispatch}) => {
  const [newGroupInputValue, setNewGroupInputValue] = useState('')
  const handleChangeNewGroupInputValue = (value) => setNewGroupInputValue(value)

  const [
    isShownFormForCreationNewGroup,
    setIsShownFormForCreationNewGroup,
  ] = useState(false)
  const showFormForCreationNewGroup = () =>
    setIsShownFormForCreationNewGroup(true)

  const addNewGroup = ({title}) => {
    dispatch(groupsActions.addGroup({title}))
  }

  const handleSubmitNewGroupForm = (event) => {
    event.preventDefault()
    addNewGroup({title: newGroupInputValue})
    setNewGroupInputValue('')
    setIsShownFormForCreationNewGroup(false)
  }

  return isShownFormForCreationNewGroup ? (
    <form onSubmit={handleSubmitNewGroupForm}>
      <input
        type="text"
        value={newGroupInputValue}
        onChange={({target: {value}}) => handleChangeNewGroupInputValue(value)}
        autoFocus
        required
      />
      <button type="submit">Add group</button>
    </form>
  ) : (
    <button type="button" onClick={showFormForCreationNewGroup}>
      Add another group
    </button>
  )
}

AddGroupFormView.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export const AddGroupForm = connect()(AddGroupFormView)
