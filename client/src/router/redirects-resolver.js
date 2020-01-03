import React from 'react'
import {useLocation, Redirect} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {PropTypes} from 'prop-types'

export const RedirectsResolver = ({children}) => {
  const location = useLocation()
  const user = useSelector((state) => state.user)

  if (location.pathname === '/login' && user) {
    console.log('on login route and has user in store -> redirect to /')
    /* If pathname === /login and user has user in store - redirect to root route */
    return <Redirect to="/" />
  }

  if (!user && location.pathname !== '/login') {
    console.log(
      'has not user in store, pathname !== /login -> redirect to /login'
    )
    /* If user hasn't user in store and pathname !== /login - redirect to login page */
    return <Redirect to="/login" />
  }

  return children
}

RedirectsResolver.propTypes = {
  children: PropTypes.element.isRequired,
}
