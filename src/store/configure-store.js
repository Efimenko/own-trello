import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {createEpicMiddleware} from 'redux-observable'

import reducer from './reducers'
import rootEpic from './epics'

const epicMiddleware = createEpicMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk, epicMiddleware))
)

epicMiddleware.run(rootEpic)

export default store
