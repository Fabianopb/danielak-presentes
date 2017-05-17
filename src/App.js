import React, { Component } from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';

import Request from './modules/requests';
import './App.css';

injectTapEventPlugin();

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }

  componentWillMount() {
    Request.getTest().then(response => this.setState({data: response.data}));
  }

  render() {
    return (
      <MuiThemeProvider>
        <Paper className="app">
          Test auto deploy - { this.state.data }
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default App;
