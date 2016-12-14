import { combineReducers } from 'redux'
import {Map} from 'immutable'

import {routerReducer} from 'react-router-redux'
import {reducer as reduxAsyncConnect} from 'redux-async-connect'
import counter from './counter'
import auth from './auth'
import tags from './tags'
import articles from './articles'
import options from './options'
import article from './article'

const rootReducer = combineReducers({
  counter,
  auth,
  routing: routerReducer,
  tags,
  reduxAsyncConnect,
  articles,
  options,
  article
})

export default rootReducer