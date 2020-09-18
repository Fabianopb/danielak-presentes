import React from 'react';
import ReactDOM from 'react-dom';
import { Switch, Route, RouteProps, Redirect, Router } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { SWRConfig } from 'swr';
import { QueryParamProvider } from 'use-query-params';
import ReactGA from 'react-ga';
import { reducer as form } from 'redux-form';
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
import { isSessionValid } from './modules/session';
import 'semantic-ui-css/semantic.min.css';
import './index.scss';
import * as serviceWorker from './serviceWorker';

const history = createBrowserHistory();

const store = createStore(combineReducers({ form }));

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
    <Router history={history}>
      <SWRConfig value={{ revalidateOnFocus: false }}>
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
          </Layout>
        </QueryParamProvider>
      </SWRConfig>
    </Router>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
