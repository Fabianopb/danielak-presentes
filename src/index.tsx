import ReactDOM from 'react-dom/client';
import { Redirect, Route, Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { QueryParamProvider } from 'use-query-params';
import Layout from './components/Layout/Layout';
import CategoryMenu from './containers/CategoryMenu/CategoryMenu';
import 'semantic-ui-css/semantic.min.css';
import './index.scss';
import Routes from './Routes';

const history = createBrowserHistory();

window.location.replace('https://www.elo7.com.br/danikpresentes');

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router history={history}>
    <QueryParamProvider ReactRouterRoute={Route}>
      <Layout>
        <CategoryMenu />
        <Routes />
      </Layout>
    </QueryParamProvider>
  </Router>
);
