import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = null;
  }

  componentWillMount() {
    axios.get('http://localhost:9000/api').then(response => this.setState(<p>{response.data}</p>));
  }

  render() {
    return (
      <div className="app">
        Test2
        { this.state }
      </div>
    );
  }
}

export default App;
