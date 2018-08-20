/// <reference path='./index.d.ts' />
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Switch, Route } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router';
import rootSaga from './sagas/root';
import rootReducer from './reducers/root';
import Layout from './components/Layout/Layout';
import CategoryMenu from './containers/CategoryMenu/CategoryMenu';
import ProductGrid from './containers/ProductGrid/ProductGrid';
import ProductDetail from './containers/ProductDetail/ProductDetail';
import AdminMain from './containers/AdminMain/AdminMain';
import LoginPage from './containers/LoginPage/LoginPage';
import AdminProduct from './containers/AdminProduct/AdminProduct';
import AdminCategory from './containers/AdminCategory/AdminCategory';
import NotificationsManager from './containers/Notifications/Notifications';
import { isSessionValid } from './modules/session';
import 'semantic-ui-css/semantic.min.css';
import './index.scss';

const history = createBrowserHistory()
const sagaMiddleware = createSagaMiddleware();

const middleware = [routerMiddleware(history), sagaMiddleware];
const composeEnhancers =
  (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(
  connectRouter(history)(rootReducer),
  composeEnhancers(applyMiddleware(...middleware))
);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layout>
        <CategoryMenu />
        <Switch>
          <Route exact={true} path='/' component={ProductGrid} />
          <Route exact={true} path='/product/:id' component={ProductDetail} />
          <Route exact={true} path='/login' component={LoginPage} />
          <Route exact={true} path='/admin' component={isSessionValid() ? AdminMain : LoginPage} />
          <Route path='/admin/product/:id' component={isSessionValid() ? AdminProduct : LoginPage} />
          <Route path='/admin/category/:id' component={isSessionValid() ? AdminCategory : LoginPage} />
        </Switch>
        <NotificationsManager />
      </Layout>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
