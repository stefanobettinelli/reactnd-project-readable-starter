import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
// import logger from 'redux-logger';
import thunk from 'redux-thunk';
import reducer from './reducers';
import registerServiceWorker from './registerServiceWorker';
import AppContainer from './app/Index';
import { BrowserRouter } from 'react-router-dom';

const composedEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composedEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
