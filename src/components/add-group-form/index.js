import React, {useState} from 'react'
import PropTypes from 'prop-types'

const AddGroupForm = ({addNewGroup}) => {
  const [newGroupInputValue, setNewGroupInputValue] = useState('')
  const handleChangeNewGroupInputValue = (value) => setNewGroupInputValue(value)

  const [
    isShownFormForCreationNewGroup,
    setIsShownFormForCreationNewGroup,
  ] = useState(false)
  const showFormForCreationNewGroup = () =>
    setIsShownFormForCreationNewGroup(true)

  const handleSubmitNewGroupForm = (event) => {
    event.preventDefault()
    addNewGroup({id: Date.now(), title: newGroupInputValue})
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

AddGroupForm.propTypes = {
  addNewGroup: PropTypes.func.isRequired,
}

export default AddGroupForm
