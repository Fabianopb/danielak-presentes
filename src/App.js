import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  componentWillMount() {
    axios.get('http://localhost:9000/api').then(response => console.log('response', response));
  }

  render() {
    return (
      <div className="app">
        Test2
      </div>
    );
  }
}

export default App;
