import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {applyMiddleware, compose, createStore, combineReducers, bindActionCreators} from 'redux';
import {Provider, connect} from 'react-redux';

import ProductsView from './views/products/products';
import AdminView from './views/admin/admin';
import ManageProductView from './views/manageProduct/manageProduct';
import './App.css';

const initialState = {
  test: 0
};

const middleware = [ /* add SagaMiddleware here */ ];
const enhancers = [];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

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

const testActionCreator = () => {
  return {
    type: 'TEST_ACTION'
  };
};

// Create ConnectedApp which maps state and actions to the App's props

const mapStateToProps = (state) => {
  return {
    test: state.test
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({testActionCreator}, dispatch);

const ConnectedProductsView = connect(mapStateToProps, mapDispatchToProps)(ProductsView);
const ConnectedAdminView = connect(mapStateToProps, mapDispatchToProps)(AdminView);
const ConnectedManageProductView = connect(mapStateToProps, mapDispatchToProps)(ManageProductView);

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path='/' component={ConnectedProductsView} />
            <Route exact path='/admin' component={ConnectedAdminView} />
            <Route path='/admin/product/:id' component={ConnectedManageProductView} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
