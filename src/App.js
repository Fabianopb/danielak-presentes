import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import ProductsView from './views/products/products';
import './app.css';

injectTapEventPlugin();

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <ProductsView />
      </MuiThemeProvider>
    );
  }
}

export default App;
