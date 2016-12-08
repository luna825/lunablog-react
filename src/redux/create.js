import {createStore, compose, applyMiddleware} from 'redux'

import thunk from './middleware/thunk'
import promiseMiddleware from './middleware/promiseMiddleware'

import rootReducer from './modules/reducers'
import DevTools from '../containers/DevTools'


export default function createStoreWithMiddleware(client,initialState){

  const enhancer = compose(
    applyMiddleware(thunk, promiseMiddleware(client)),
    // Required! Enable Redux DevTools with the monitors you chose
    DevTools.instrument()
  );

  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('./modules/reducers', () =>
      store.replaceReducer(require('./modules/reducers')/*.default if you use Babel 6+ */)
    );
  }

  return store;
}