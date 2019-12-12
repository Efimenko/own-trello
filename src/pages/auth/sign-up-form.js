import React, {useState} from 'react'
import {connect} from 'react-redux'
import {PropTypes} from 'prop-types'
import {useHistory} from 'react-router-dom'

import {authActions} from 'store/actions/creators'

export const SignUpFormView = ({dispatch}) => {
  const [nameValue, setNameValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const handleSubmitForm = (event) => {
    event.preventDefault()
    setLoading(true)
    dispatch(
      authActions.registerUser({
        name: nameValue,
        email: emailValue,
        password: passwordValue,
        history,
      })
    )
  }
  return (
    <form onSubmit={handleSubmitForm}>
      <label htmlFor="sign-up-name">Name</label>
      <br />
      <input
        value={nameValue}
        type="text"
        placeholder="Type your name"
        name="name"
        onChange={(event) => setNameValue(event.target.value)}
        id="sign-up-name"
        required
      />
      <br />
      <label htmlFor="sign-up-email">Email</label>
      <br />
      <input
        value={emailValue}
        type="email"
        placeholder="Type your email"
        name="email"
        onChange={(event) => setEmailValue(event.target.value)}
        id="sign-up-email"
        required
      />
      <br />
      <label htmlFor="sign-up-password">Password</label>
      <br />
      <input
        value={passwordValue}
        type="password"
        placeholder="Type your password"
        name="password"
        onChange={(event) => setPasswordValue(event.target.value)}
        id="sign-up-password"
        required
      />
      <button type="submit" disabled={loading}>
        Register
      </button>
    </form>
  )
}

SignUpFormView.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export const SignUpForm = connect()(SignUpFormView)
