import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.css';

injectTapEventPlugin();

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div>Test</div>
      </MuiThemeProvider>
    );
  }
}

export default App;
