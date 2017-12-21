import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import history from './modules/history';
import { productsReducer } from './modules/reducers';
import { usersReducer } from './modules/reducers/users';
import ProductsView from './containers/ProductsView';
import AdminView from './containers/AdminView';
import LoginView from './containers/LoginView';
import ProductEditor from './containers/ProductEditor';
import './styles/App.css';

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  products: productsReducer,
  users: usersReducer,
  form: formReducer
});

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
            <Route exact path='/login' component={LoginView} />
            <Route path='/admin/product/:id' component={ProductEditor} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
