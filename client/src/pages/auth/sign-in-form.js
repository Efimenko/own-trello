import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {userActions} from 'store/actions/creators'

export const SignInForm = () => {
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')

  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const errorsOwner = 'SignInForm'
  const errors = useSelector((state) => state.errors[errorsOwner]) || []

  const handleSubmitForm = (event) => {
    event.preventDefault()
    setLoading(true)
    dispatch(
      userActions.login({
        email: emailValue,
        password: passwordValue,
        errorsOwner,
      })
    )
  }

  return (
    <>
      {/* TODO: Create error component */}
      {Boolean(errors.length) &&
        errors.map(({message}) => (
          <div key={message} style={{color: 'red'}}>
            {message}
          </div>
        ))}
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
    </>
  )
}
