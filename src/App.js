import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import ProductsView from './views/products/products';
import AdminView from './views/admin/admin';
import './app.css';

injectTapEventPlugin();

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <AdminView />
      </MuiThemeProvider>
    );
  }
}

export default App;
