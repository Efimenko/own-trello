import React, {useState, Fragment} from 'react'
import {SignInForm} from './sign-in-form'
import {SignUpForm} from './sign-up-form'

const SIGN_IN_TYPE = 'signin'
const SIGN_UP_TYPE = 'signup'

export const AuthPage = () => {
  const [type, setType] = useState(SIGN_IN_TYPE)
  const handleChangeFormType = () =>
    setType(type === SIGN_IN_TYPE ? SIGN_UP_TYPE : SIGN_IN_TYPE)
  return (
    <Fragment>
      {type === SIGN_IN_TYPE ? <SignInForm /> : <SignUpForm />}
      <button type="button" onClick={handleChangeFormType}>
        {type === SIGN_IN_TYPE ? 'Sign up' : 'Sign in'}
      </button>
    </Fragment>
  )
}
