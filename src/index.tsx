import ReactDOM from 'react-dom/client';
import { Switch, Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { SWRConfig } from 'swr';
import { QueryParamProvider } from 'use-query-params';
import Layout from './components/Layout/Layout';
import AboutPage from './components/AboutPage/AboutPage';
import ChatWindow from './containers/ChatWindow/ChatWindow';
import NotFoundPage from './containers/NotFoundPage/NotFoundPage';
import CategoryMenu from './containers/CategoryMenu/CategoryMenu';
import ProductGrid from './containers/ProductGrid/ProductGrid';
import ProductDetail from './containers/ProductDetail/ProductDetail';
import LoginPage from './containers/LoginPage/LoginPage';
import 'semantic-ui-css/semantic.min.css';
import './index.scss';

const history = createBrowserHistory();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router history={history}>
    <SWRConfig value={{ revalidateOnFocus: false }}>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Layout>
          <CategoryMenu />
          <Switch>
            <Route exact path="/" component={ProductGrid} />
            <Route exact path="/product/:id" component={ProductDetail} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/about" component={AboutPage} />
            <Route component={NotFoundPage} />
          </Switch>
          {!window.location.pathname.includes('/admin') && <ChatWindow />}
        </Layout>
      </QueryParamProvider>
    </SWRConfig>
  </Router>
);
