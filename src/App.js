import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import history from './modules/history';
import { rootReducer } from './modules/reducers';

import ProductsView from './containers/ProductsView';
import AdminView from './containers/AdminView';
import ProductEditor from './containers/ProductEditor';
import './styles/App.css';

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
        <Router history={history}>
          <div>
            <Route exact path='/' component={ProductsView} />
            <Route exact path='/admin' component={AdminView} />
            <Route path='/admin/product/:id' component={ProductEditor} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
