import React, {useState} from 'react'
import {useDispatch} from 'react-redux'

import {authActions} from 'store/actions/creators'

export const SignInForm = () => {
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

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
