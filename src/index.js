import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Switch } from 'react-router-dom';
import { applyMiddleware, compose, createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import history from './modules/history';
import { productsReducer } from './modules/reducers/products';
import { usersReducer } from './modules/reducers/users';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import ProductsView from './containers/ProductsView';
import ProductDetails from './containers/ProductDetails';
import AdminView from './containers/AdminView';
import LoginView from './containers/LoginView';
import ProductEditor from './containers/ProductEditor';
import 'semantic-ui-css/semantic.min.css';
import './index.scss';

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

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <PublicRoute exact path='/' component={ProductsView} />
        <PublicRoute exact path='/product/:id' component={ProductDetails} />
        <PublicRoute exact path='/login' component={LoginView} />
        <PrivateRoute exact path='/admin' component={AdminView} />
        <PrivateRoute path='/admin/product/:id' component={ProductEditor} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
