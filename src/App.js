import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { rootReducer } from './modules/reducers';

import ProductsView from './views/products/products';
import AdminView from './views/admin/admin';
import ManageProductView from './views/manageProduct/manageProduct';
import './App.css';

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path='/' component={ProductsView} />
            <Route exact path='/admin' component={AdminView} />
            <Route path='/admin/product/:id' component={ManageProductView} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
