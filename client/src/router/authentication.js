import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {PropTypes} from 'prop-types'

import {authActions} from 'store/actions/creators'

export const Authentication = ({children}) => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const authToken = localStorage.getItem('authToken')
  const [fetchingUser, setFetchingUser] = useState(!user && authToken)

  useEffect(() => {
    if (!user && authToken) {
      dispatch(authActions.loginUserByToken({token: authToken}))
    }
    if (user) {
      setFetchingUser(false)
    }
  }, [user, authToken, dispatch])

  return fetchingUser ? <div>Loading auth</div> : children
}

Authentication.propTypes = {
  children: PropTypes.element.isRequired,
}
