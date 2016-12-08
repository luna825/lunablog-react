import {combineReducers} from 'redux-immutablejs'
import {Map} from 'immutable'

import counter from './counter'
import auth from './auth'

const rootReducer = combineReducers(Map({
  counter,
  auth
}))

export default rootReducer