import React, {useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {userActions, errorsActions} from '__store/actions/creators'
import {ERRORS} from '__constants'

const getAuthorizationError = (errors) => {
  return errors.find(({name}) => name === ERRORS.authError)
}

export const SignInForm = () => {
  const inProgressEvent = 'userLogin'
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [emailValueAfterSubmit, setEmailValueAfterSubmit] = useState(null)
  const [passwordValueAfterSubmit, setPasswordValueAfterSubmit] = useState(null)
  const [resubmitAble, setResubmitAble] = useState(false)

  const userLoginInProgress = useSelector(
    (state) => state.inProgress[inProgressEvent]
  )

  const dispatch = useDispatch()

  const errorsOwner = 'SignInForm'
  const errors = useSelector((state) => state.errors[errorsOwner]) || []
  const hasErrors = Boolean(errors.length)
  const errorsShouldBeShown = hasErrors && !resubmitAble

  const buttonShouldBeDisabled = userLoginInProgress || errorsShouldBeShown

  const updateResubmitAble = ({key, value}) => {
    const formInputValues = {emailValue, passwordValue, [key]: value}
    const prevFormInputValues = {
      emailValue: emailValueAfterSubmit,
      passwordValue: passwordValueAfterSubmit,
    }
    const hasChanges = Object.keys(formInputValues).some(
      (key) => prevFormInputValues[key] !== formInputValues[key]
    )
    if (hasChanges) {
      setResubmitAble(true)
    } else {
      setResubmitAble(false)
    }
  }

  const handleSubmitForm = (event) => {
    event.preventDefault()
    const authError = getAuthorizationError(errors)
    setEmailValueAfterSubmit(emailValue)
    setPasswordValueAfterSubmit(passwordValue)
    setResubmitAble(false)
    dispatch(
      userActions.login({
        email: emailValue,
        password: passwordValue,
        errorsOwner,
        inProgressEvent,
      })
    )
    if (authError) {
      dispatch(
        errorsActions.remove({
          errorsId: authError.id,
          errorsOwner,
        })
      )
    }
  }

  return (
    <>
      {/* TODO: Create error component */}
      {errorsShouldBeShown &&
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
          onChange={(event) => {
            setEmailValue(event.target.value)
            if (emailValueAfterSubmit !== null) {
              updateResubmitAble({key: 'emailValue', value: event.target.value})
            }
          }}
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
          onChange={(event) => {
            setPasswordValue(event.target.value)
            if (passwordValueAfterSubmit !== null) {
              updateResubmitAble({
                key: 'passwordValue',
                value: event.target.value,
              })
            }
          }}
          id="sign-in-password"
          required
        />
        <button
          type="submit"
          disabled={buttonShouldBeDisabled}
          title={
            hasErrors
              ? 'You should try another email or password for enabling button'
              : ''
          }
        >
          Login
        </button>
      </form>
    </>
  )
}
