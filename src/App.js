import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ProductsView from './views/products/products';
import AdminView from './views/admin/admin';
import ManageProductView from './views/manageProduct/manageProduct';
import './App.css';

class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={ ProductsView } />
          <Route exact path="/admin" component={ AdminView } />
          <Route path="/admin/product/:id" component={ ManageProductView } />
        </div>
      </Router>
    );
  }
}

export default App;
