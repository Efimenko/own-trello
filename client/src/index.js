import React from 'react'
import {Provider} from 'react-redux'

import {store} from 'store'
import {Router} from './router'
import './style.css'

export const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
)