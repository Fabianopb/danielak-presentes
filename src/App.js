import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import ProductsView from './views/products/products';
import AdminView from './views/admin/admin';
import './App.css';

injectTapEventPlugin();

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <Router>
          <div>
            <Route exact path="/" component={ ProductsView } />
            <Route path="/admin" component={ AdminView } />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
