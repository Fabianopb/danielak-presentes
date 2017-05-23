import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import ProductsView from './views/products/products';
import AdminView from './views/admin/admin';
import ManageProductView from './views/manageProduct/manageProduct';
import './App.css';

injectTapEventPlugin();

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div>
            <Route exact path="/" component={ ProductsView } />
            <Route exact path="/admin" component={ AdminView } />
            <Route path="/admin/:product" component={ ManageProductView } />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
