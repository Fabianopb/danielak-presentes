import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import ProductsView from './views/products/products';
import AdminView from './views/admin/admin';
import ManageProductView from './views/manageProduct/manageProduct';
import './App.css';

const testActionCreator = () => {
  return {
    type: 'TEST_ACTION'
  };
};

// Create ConnectedApp which maps state and actions to the App's props

const mapStateToProps = (state) => {
  return {
    test: state.test
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({testActionCreator}, dispatch);

const ConnectedProductsView = connect(mapStateToProps, mapDispatchToProps)(ProductsView);
const ConnectedAdminView = connect(mapStateToProps, mapDispatchToProps)(AdminView);
const ConnectedManageProductView = connect(mapStateToProps, mapDispatchToProps)(ManageProductView);

class App extends Component {
  render () {
    return (
      <Router>
        <div>
          <Route exact path='/' component={ConnectedProductsView} />
          <Route exact path='/admin' component={ConnectedAdminView} />
          <Route path='/admin/product/:id' component={ConnectedManageProductView} />
        </div>
      </Router>
    );
  }
}

export default App;
