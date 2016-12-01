import {combineReducers} from 'redux-immutablejs'
import {Map} from 'immutable'

import counter from './counter'

const rootReducer = combineReducers(Map({
  counter,
}))

export default rootReducer