import React from 'react'
import {Route, IndexRoute} from 'react-router'

import {App, Home} from './containers/index'

export default (
  <Route name='app' path='/' component={App}>
    <IndexRoute component={Home} />
  </Route>
)