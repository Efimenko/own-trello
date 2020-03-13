import React from 'react'
import {Provider} from 'react-redux'

import {store} from '__store'
import {Router} from './router'
import './style.css'

export const App = () => (
  <Provider store={store}>
    <Router />
  </Provider>
)
