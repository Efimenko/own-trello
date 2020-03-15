import React, {useState, useMemo} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {userActions, errorsActions} from '__store/actions/creators'

const getErrorObjectByDataPath = ({dataPath, errors}) => {
  return errors.find((error) => error.dataPath === dataPath)
}

export const SignUpForm = () => {
  const inProgressEvent = 'userRegistration'
  const errorsOwner = 'SignUpForm'
  const resubmitAbleForInitialValue = {
    name: false,
    email: false,
    password: false,
  }
  /* TODO: replace useState to useReducer */
  const [nameValue, setNameValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [nameValueAfterSubmit, setNameValueAfterSubmit] = useState(null)
  const [emailValueAfterSubmit, setEmailValueAfterSubmit] = useState(null)
  const [passwordValueAfterSubmit, setPasswordValueAfterSubmit] = useState(null)
  const [resubmitAbleFor, setResubmitAbleFor] = useState(
    resubmitAbleForInitialValue
  )

  const userRegistrationInProgress = useSelector(
    (state) => state.inProgress[inProgressEvent]
  )

  const dispatch = useDispatch()

  const errors = useSelector((state) => state.errors[errorsOwner]) || []

  const nameError = useMemo(
    () => getErrorObjectByDataPath({dataPath: '.name', errors}),
    [errors]
  )
  const emailError = useMemo(
    () => getErrorObjectByDataPath({dataPath: '.email', errors}),
    [errors]
  )
  const passwordError = useMemo(
    () =>
      getErrorObjectByDataPath({
        dataPath: '.password',
        errors,
      }),
    [errors]
  )

  const hasErrors = Boolean(errors.length)
  const buttonShouldBeDisabled =
    userRegistrationInProgress ||
    (hasErrors && !Object.values(resubmitAbleFor).every(Boolean))

  const formData = {
    values: {
      name: nameValue,
      email: emailValue,
      password: passwordValue,
    },
    prevValues: {
      name: nameValueAfterSubmit,
      email: emailValueAfterSubmit,
      password: passwordValueAfterSubmit,
    },
    errors: {
      name: {has: nameError, visible: !resubmitAbleFor.name},
      email: {has: emailError, visible: !resubmitAbleFor.email},
      password: {has: passwordError, visible: !resubmitAbleFor.password},
    },
  }

  const handleSubmitForm = (event) => {
    event.preventDefault()
    setNameValueAfterSubmit(nameValue)
    setEmailValueAfterSubmit(emailValue)
    setPasswordValueAfterSubmit(passwordValue)
    setResubmitAbleFor(resubmitAbleForInitialValue)
    dispatch(
      userActions.register({
        name: nameValue,
        email: emailValue,
        password: passwordValue,
        errorsOwner,
        inProgressEvent,
      })
    )
    if (hasErrors) {
      dispatch(
        errorsActions.remove({
          errorId: [nameError.id, emailError.id, passwordError.id],
          errorsOwner,
        })
      )
    }
  }

  const updateResubmitAble = ({key, value}) => {
    const prevFormInputValues = {
      name: nameValueAfterSubmit,
      email: emailValueAfterSubmit,
      password: passwordValueAfterSubmit,
    }
    const hasChanges = prevFormInputValues[key] !== value
    if (hasChanges) {
      setResubmitAbleFor((state) => ({...state, [key]: true}))
    } else {
      setResubmitAbleFor((state) => ({...state, [key]: false}))
    }
  }

  const handleChangeInput = ({key}) => ({target: {value}}) => {
    const formData = {
      name: {
        setter: setNameValue,
        prevValue: nameValueAfterSubmit,
      },
      email: {
        setter: setEmailValue,
        prevValue: emailValueAfterSubmit,
      },
      password: {
        setter: setPasswordValue,
        prevValue: passwordValueAfterSubmit,
      },
    }

    formData[key].setter(value)
    if (formData[key].prevValue !== null) {
      updateResubmitAble({key, value})
    }
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
        onChange={handleChangeInput({key: 'name'})}
        id="sign-up-name"
        required
      />
      {formData.errors.name.has && formData.errors.name.visible && (
        <div style={{color: '#f00'}}>{nameError.message}</div>
      )}
      <br />
      <label htmlFor="sign-up-email">Email</label>
      <br />
      <input
        value={emailValue}
        type="email"
        placeholder="Type your email"
        name="email"
        onChange={handleChangeInput({key: 'email'})}
        id="sign-up-email"
        required
      />
      {formData.errors.email.has && formData.errors.email.visible && (
        <div style={{color: '#f00'}}>{emailError.message}</div>
      )}
      <br />
      <label htmlFor="sign-up-password">Password</label>
      <br />
      <input
        value={passwordValue}
        type="password"
        placeholder="Type your password"
        name="password"
        onChange={handleChangeInput({key: 'password'})}
        id="sign-up-password"
        required
      />
      {/* TODO: Create error component */}
      {formData.errors.password.has && formData.errors.password.visible && (
        <div style={{color: '#f00'}}>{passwordError.message}</div>
      )}
      <button
        type="submit"
        disabled={buttonShouldBeDisabled}
        title={
          hasErrors ? 'You should fix your mistakes for enabling button' : ''
        }
      >
        Register
      </button>
    </form>
  )
}
