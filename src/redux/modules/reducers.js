import { combineReducers } from 'redux'
import {Map} from 'immutable'

import {routerReducer} from 'react-router-redux'
import counter from './counter'
import auth from './auth'

const rootReducer = combineReducers({
  counter,
  auth,
  routing: routerReducer
})

export default rootReducer