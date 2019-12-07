import React, {useState} from 'react'

export const SignUpForm = () => {
  const [nameValue, setNameValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  return (
    <form>
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
    </form>
  )
}
