import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import './style.css'
import {AuthPage, GroupPage} from './pages'

const App = () => (
  <Router>
    <Switch>
      <Route path="/" component={GroupPage} exact />
      <Route path="/login" component={AuthPage} />
    </Switch>
  </Router>
)

export default App
