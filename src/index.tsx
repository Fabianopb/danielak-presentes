/// <reference path="./index.d.ts" />
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Switch } from 'react-router-dom';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import {reducer as notificationsReducer} from 'react-notification-system-redux';
import history from './modules/history';
import { productsReducer } from './reducers/products';
import categoriesReducer from './reducers/categories';
import { usersReducer } from './reducers/users';
import RoutePublic from './components/RoutePublic/RoutePublic';
import RoutePrivate from './components/RoutePrivate/RoutePrivate';
import ProductGrid from './containers/ProductGrid/ProductGrid';
import ProductDetail from './containers/ProductDetail/ProductDetail';
import AdminMain from './containers/AdminMain/AdminMain';
import LoginPage from './containers/LoginPage/LoginPage';
import AdminProduct from './containers/AdminProduct/AdminProduct';
import AdminCategory from './containers/AdminCategory/AdminCategory';
import NotificationsManager from './containers/Notifications/Notifications';
import 'semantic-ui-css/semantic.min.css';
import './index.scss';

const middleware = [thunk];
const composeEnhancers =
  (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const rootReducer = combineReducers({
  categories: categoriesReducer,
  products: productsReducer,
  users: usersReducer,
  form: formReducer,
  notifications: notificationsReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Switch>
          <RoutePublic exact={true} path='/' component={ProductGrid} />
          <RoutePublic exact={true} path='/product/:id' component={ProductDetail} />
          <RoutePublic exact={true} path='/login' component={LoginPage} />
          <RoutePrivate exact={true} path='/admin' component={AdminMain} />
          <RoutePrivate path='/admin/product/:id' component={AdminProduct} />
          <RoutePrivate path='/admin/category/:id' component={AdminCategory} />
        </Switch>
        <NotificationsManager />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
