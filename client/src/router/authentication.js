import React, {useState, useEffect, useMemo} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {PropTypes} from 'prop-types'

import {userActions, errorsActions} from '__store/actions/creators'
import {ERRORS} from '__constants'

const getAuthTokenError = (errors) => {
  return errors.find(({name}) => name === ERRORS.invalidToken)
}

export const Authentication = ({children}) => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const authToken = localStorage.getItem('authToken')
  const [fetchingUser, setFetchingUser] = useState(!user && authToken)
  const errorsOwner = 'Authentication'
  const errors = useSelector((state) => state.errors[errorsOwner]) || []
  const authTokenError = useMemo(() => getAuthTokenError(errors), [errors])

  useEffect(() => {
    if (!user && authToken) {
      dispatch(
        userActions.loginByToken({
          token: authToken,
          errorsOwner,
        })
      )
    }
    if (user) {
      setFetchingUser(false)
    }
  }, [user, authToken, dispatch])

  useEffect(() => {
    if (authTokenError) {
      localStorage.removeItem('authToken')
      dispatch(
        errorsActions.remove({
          errorId: authTokenError.id,
          errorsOwner,
        })
      )
      setFetchingUser(false)
    }
  }, [authTokenError, dispatch])

  return fetchingUser ? <div>Loading auth</div> : children
}

Authentication.propTypes = {
  children: PropTypes.element.isRequired,
}
