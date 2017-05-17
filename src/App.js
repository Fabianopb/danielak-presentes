import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import './App.css';

injectTapEventPlugin();

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <Paper className="app">
          Test auto deploy
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default App;
