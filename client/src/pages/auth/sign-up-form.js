import React, {useState, useRef, useMemo, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {authActions, errorActions} from 'store/actions/creators'

const getErrorObjectByDataPath = ({dataPath, errors}) => {
  return errors.find((error) => error.dataPath === dataPath)
}

export const SignUpForm = () => {
  const [nameValue, setNameValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const userRegistrationInProgress = useSelector(
    (state) => state.inProgress.userRegistration
  )
  const [loading, setLoading] = useState(Boolean(userRegistrationInProgress))
  const dispatch = useDispatch()
  const errorsOwner = useRef(`SignUpForm-${Date.now()}`)
  const errors = useSelector((state) => state.errors[errorsOwner.current]) || []

  useEffect(() => {
    setLoading(Boolean(userRegistrationInProgress))
  }, [userRegistrationInProgress])

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

  const hasError = nameError || emailError || passwordError

  const handleSubmitForm = (event) => {
    event.preventDefault()
    setLoading(true)
    dispatch(
      authActions.registerUser({
        name: nameValue,
        email: emailValue,
        password: passwordValue,
        errorsOwner: errorsOwner.current,
      })
    )
  }

  const handleChangeInput = ({type}) => ({target: {value}}) => {
    const inputsData = {
      name: {
        error: nameError,
        setter: setNameValue,
      },
      email: {
        error: emailError,
        setter: setEmailValue,
      },
      password: {
        error: passwordError,
        setter: setPasswordValue,
      },
    }

    if (inputsData[type].error) {
      dispatch(
        errorActions.removeError({
          errorId: inputsData[type].error.id,
          errorsOwner: errorsOwner.current,
        })
      )
    }
    inputsData[type].setter(value)
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
        onChange={handleChangeInput({type: 'name'})}
        id="sign-up-name"
        required
      />
      {nameError && <div style={{color: '#f00'}}>{nameError.message}</div>}
      <br />
      <label htmlFor="sign-up-email">Email</label>
      <br />
      <input
        value={emailValue}
        type="email"
        placeholder="Type your email"
        name="email"
        onChange={handleChangeInput({type: 'email'})}
        id="sign-up-email"
        required
      />
      {emailError && <div style={{color: '#f00'}}>{emailError.message}</div>}
      <br />
      <label htmlFor="sign-up-password">Password</label>
      <br />
      <input
        value={passwordValue}
        type="password"
        placeholder="Type your password"
        name="password"
        onChange={handleChangeInput({type: 'password'})}
        id="sign-up-password"
        required
      />
      {passwordError && (
        <div style={{color: '#f00'}}>{passwordError.message}</div>
      )}
      <button type="submit" disabled={loading || hasError}>
        Register
      </button>
    </form>
  )
}
