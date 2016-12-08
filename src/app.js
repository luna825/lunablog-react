import React from 'react'
import ReactDOM from 'react-dom'

import routes from './routes'
import {Router, browserHistory} from 'react-router'

import {Provider} from 'react-redux'
import createWithMiddleware from './redux/create'

import ApiClient from 'utils/ApiClient'

const client = new ApiClient()
const store = createWithMiddleware(client)

window.store = store

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>
  ,document.getElementById('app'))


if (process.env.NODE_ENV === 'development'){
  const DevTools = require('containers/DevTools').default 
  const rootElm = document.getElementById('app')
  const devtoolsDiv = document.createElement('div')

  devtoolsDiv.id = "react-devtools-root"

  setTimeout(()=>{
    rootElm.appendChild(devtoolsDiv)
    ReactDOM.render(<DevTools store={store} />, document.getElementById('react-devtools-root'))
  },10)


}