import React from 'react'
import {Route, IndexRoute} from 'react-router'

import {App, Home, Article, Login} from './containers/index'

export default (
  <Route name='app' path='/' component={App}>
    <IndexRoute component={Home} />
    <Route component={Article} path='/Article/:id' />
    <Route component={Login} path='/Login' />
  </Route>
)