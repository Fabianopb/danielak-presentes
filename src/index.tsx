import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, RouteProps, Redirect } from 'react-router-dom';
import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { QueryParamProvider } from 'use-query-params';
import { routerMiddleware, ConnectedRouter } from 'connected-react-router';
import ReactGA from 'react-ga';
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
import * as serviceWorker from './serviceWorker';

const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const middleware = [routerMiddleware(history), sagaMiddleware];
const composeEnhancers =
  (process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store = createStore(rootReducer(history), composeEnhancers(applyMiddleware(...middleware)));

const ProtectedRoute = ({ component: Component, ...rest }: RouteProps) => (
  <Route
    {...rest}
    render={props =>
      isSessionValid() && Component ? <Component {...props} /> : <Redirect to="/login" />
    }
  />
);

ReactGA.initialize('UA-69092915-1');

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Layout>
          <CategoryMenu />
          <Switch>
            <Route exact path="/" component={withTracker(ProductGrid)} />
            <Route exact path="/product/:id" component={withTracker(ProductDetail)} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/about" component={withTracker(AboutPage)} />
            <ProtectedRoute exact path="/admin" component={AdminMain} />
            <ProtectedRoute path="/admin/product/:id" component={AdminProduct} />
            <ProtectedRoute path="/admin/category/:id" component={AdminCategory} />
            <Route component={NotFoundPage} />
          </Switch>
          {!window.location.pathname.includes('/admin') && <ChatWindow />}
          <NotificationsManager />
        </Layout>
      </QueryParamProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
