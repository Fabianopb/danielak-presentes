/// <reference path="./index.d.ts" />
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Switch } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from "redux-saga";
import history from './modules/history';
import rootSaga from './sagas/root';
import rootReducer from './reducers/root';
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

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];
const composeEnhancers =
  (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);

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
