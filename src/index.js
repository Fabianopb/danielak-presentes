import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, compose, createStore, combineReducers, bindActionCreators} from 'redux';
import {Provider, connect} from 'react-redux';
import 'semantic-ui-css/semantic.min.css';

import App from './App';
import './index.css';

const initialState = {
  test: 0
};

const middleware = [ /* add SagaMiddleware here */ ];
const enhancers = [];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const testActionCreator = () => {
  return {
    type: 'TEST_ACTION'
  };
};

// Create Reducers and pass them to the App's store

const testReducer = (test = initialState.test, action = {}) => {
  if (action.type === 'TEST_ACTION') {
    console.log('woot', test);
    return test + 1;
  }
  return test;
};

const reducers = combineReducers({
  test: testReducer
});

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middleware), ...enhancers)
);

// Create ConnectedApp which maps state and actions to the App's props

const mapStateToProps = (state) => {
  return {
    test: state.test
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({testActionCreator}, dispatch);

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root')
);
