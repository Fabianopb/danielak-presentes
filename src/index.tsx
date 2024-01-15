import ReactDOM from 'react-dom/client';
import { Switch, Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { QueryParamProvider } from 'use-query-params';
import Layout from './components/Layout/Layout';
import AboutPage from './components/AboutPage/AboutPage';
import NotFoundPage from './containers/NotFoundPage/NotFoundPage';
import CategoryMenu from './containers/CategoryMenu/CategoryMenu';
import ProductGrid from './containers/ProductGrid/ProductGrid';
import ProductDetail from './containers/ProductDetail/ProductDetail';
import 'semantic-ui-css/semantic.min.css';
import './index.scss';

const history = createBrowserHistory();

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router history={history}>
    <QueryParamProvider ReactRouterRoute={Route}>
      <Layout>
        <CategoryMenu />
        <Switch>
          <Route exact path="/" component={ProductGrid} />
          <Route exact path="/product/:id" component={ProductDetail} />
          <Route exact path="/about" component={AboutPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Layout>
    </QueryParamProvider>
  </Router>
);
