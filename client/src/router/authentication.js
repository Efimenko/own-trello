import React, {useRef, useState, useEffect} from 'react'
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

  useEffect(() => {
    if (
      !user &&
      !authToken &&
      location.pathname !== '/login' &&
      mounted.current
    ) {
      console.log(
        'useEffect: no user, no authToken, pathname !== /login -> redirect to /login'
      )
      /* If user hasn't user in store and hasn't token in localStorage - redirect to login page */
      history.push('/login')
    }
    if (user && location.pathname !== '/' && mounted.current) {
      history.push('/')
    }
  }, [user, authToken, history, location.pathname])

  if (!mounted.current) {
    mounted.current = true

    if (location.pathname === '/login' && user) {
      console.log(
        'on login route and has user in store -> setLoading(false) redirect to /'
      )
      /* If user try go to login page and has user in store - redirect to root route */
      mounted.current = false
      history.push('/')
      return null
    }

    if (!user && authToken) {
      console.log(
        'has not user in store but has authToken -> setLoading(true) dispath loginUserByToken'
      )
      /* If user hasn't user in store but has token in localStorage - try login by token */
      setLoading(true)
      dispatch(authActions.loginUserByToken({token: authToken}))
    } else if (!user && !authToken && location.pathname !== '/login') {
      console.log(
        'has not user in store, has not authToken, pathname !== /login -> redirect to /login'
      )
      /* If user hasn't user in store and hasn't token in localStorage - redirect to login page */
      mounted.current = false
      history.push('/login')
      return null
    }
  }

  return user || (!authOnly && !loading) ? children : <div>Loading auth</div>
}

Authentication.propTypes = {
  children: PropTypes.element.isRequired,
  authOnly: PropTypes.bool.isRequired,
}
