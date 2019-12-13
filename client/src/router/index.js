import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import {AuthPage, GroupPage} from 'pages'
import {Authentication} from './authentication'

const routes = [
  {
    path: '/',
    Component: GroupPage,
    exact: true,
    authOnly: true,
  },
  {
    path: '/login',
    Component: AuthPage,
    authOnly: false,
  },
]

export const Router = () => (
  <BrowserRouter>
    <Switch>
      {routes.map(({path, Component, exact, authOnly}) => (
        <Route key={path} path={path} exact={exact}>
          <Authentication authOnly={authOnly}>
            <Component />
          </Authentication>
        </Route>
      ))}
    </Switch>
  </BrowserRouter>
)
