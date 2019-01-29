/// <reference path='./index.d.ts' />
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Switch, Route, RouteProps, Redirect } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware, ConnectedRouter } from 'connected-react-router';
import rootSaga from './sagas/root';
import rootReducer from './reducers/root';
import Layout from './components/Layout/Layout';
import AboutPage from './components/AboutPage/AboutPage';
import withTracker from './components/withTracker';
import ChatWindow from './containers/ChatWindow/ChatWindow';
import NotFoundPage from './containers/NotFoundPage/NotFoundPage';
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
import registerServiceWorker from './registerServiceWorker';
import * as ReactGA from 'react-ga';

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

type ProtectedRouteProps = RouteProps & { component: React.ComponentClass };
const ProtectedRoute: React.SFC<ProtectedRouteProps> = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => isSessionValid()
    ? <Component {...props} />
    : <Redirect to='/login' />}
  />
);

ReactGA.initialize('UA-69092915-1');

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layout>
        <CategoryMenu />
        <Switch>
          <Route exact={true} path='/' component={withTracker(ProductGrid)} />
          <Route exact={true} path='/product/:id' component={withTracker(ProductDetail)} />
          <Route exact={true} path='/login' component={LoginPage} />
          <Route exact={true} path='/about' component={withTracker(AboutPage)} />
          <ProtectedRoute exact={true} path='/admin' component={AdminMain} />
          <ProtectedRoute path='/admin/product/:id' component={AdminProduct} />
          <ProtectedRoute path='/admin/category/:id' component={AdminCategory} />
          <Route component={NotFoundPage} />
        </Switch>
        { !window.location.pathname.includes('/admin') && <ChatWindow /> }
        <NotificationsManager />
      </Layout>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
