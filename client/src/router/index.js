import React from 'react'
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import {AuthPage, GroupsPage} from '__pages'
import {Authentication} from './authentication'
import {RedirectsResolver} from './redirects-resolver'

const routes = [
  {
    path: '/',
    Component: GroupsPage,
    exact: true,
  },
  {
    path: '/login',
    Component: AuthPage,
  },
]

export const Router = () => (
  <BrowserRouter>
    <Authentication>
      <RedirectsResolver>
        <Switch>
          {routes.map(({path, Component, exact}) => (
            <Route key={path} path={path} exact={exact} component={Component} />
          ))}
        </Switch>
      </RedirectsResolver>
    </Authentication>
  </BrowserRouter>
)
