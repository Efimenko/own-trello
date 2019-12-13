import React, {useState} from 'react'
import {connect} from 'react-redux'
import {PropTypes} from 'prop-types'
import {useHistory} from 'react-router-dom'

import {authActions} from 'store/actions/creators'
import {or, explicitNull} from 'airbnb-prop-types'

const SignInFormView = ({user, dispatch}) => {
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const handleSubmitForm = (event) => {
    event.preventDefault()
    setLoading(true)
    dispatch(
      authActions.loginUser({
        email: emailValue,
        password: passwordValue,
      })
    )
  }

  if (user) {
    history.push('/')
  }

  return (
    <form onSubmit={handleSubmitForm}>
      <label htmlFor="sing-in-email">Email</label>
      <br />
      <input
        value={emailValue}
        type="email"
        placeholder="Type your email"
        name="email"
        onChange={(event) => setEmailValue(event.target.value)}
        id="sign-in-email"
        required
      />
      <br />
      <label htmlFor="sign-in-password">Password</label>
      <br />
      <input
        value={passwordValue}
        type="password"
        placeholder="Type your password"
        name="password"
        onChange={(event) => setPasswordValue(event.target.value)}
        id="sign-in-password"
        required
      />
      <button type="submit" disabled={loading}>
        Login
      </button>
    </form>
  )
}

SignInFormView.propTypes = {
  user: or([explicitNull, PropTypes.object]).isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = ({user}) => ({
  user,
})

export const SignInForm = connect(mapStateToProps)(SignInFormView)
