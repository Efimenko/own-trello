import React, {useRef, useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {PropTypes} from 'prop-types'
import {useHistory, useLocation} from 'react-router-dom'

import {authActions} from 'store/actions/creators'

export const Authentication = ({children, authOnly}) => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()
  const mounted = useRef(false)
  const [loading, setLoading] = useState(false)
  const authToken = localStorage.getItem('authToken')

  if (!mounted.current) {
    mounted.current = true

    if (location.pathname === '/login' && user) {
      /* If user try go to login page and has user in store - redirect to root route */
      history.push('/')
      return
    }

    if (!user && authToken) {
      /* If user hasn't user in store but has token in localStorage - try login by token */
      setLoading(true)
      dispatch(authActions.loginUserByToken({token: authToken}))
    } else if (!user && !authToken) {
      /* If user hasn't user in store and hasn't token in localStorage - redirect to login page */
      history.push('/login')
    }
  }

  return user || (!authOnly && !loading) ? children : <div>Loading auth</div>
}

Authentication.propTypes = {
  children: PropTypes.element.isRequired,
  authOnly: PropTypes.bool.isRequired,
}
