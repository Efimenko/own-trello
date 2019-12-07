import React, {useState} from 'react'

export const SignInForm = () => {
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  return (
    <form>
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
    </form>
  )
}
