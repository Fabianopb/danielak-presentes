import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';

import * as actionCreators from './modules/actions';
import { combinedReducers } from './modules/reducers';

import ProductsView from './views/products/products';
import AdminView from './views/admin/admin';
import ManageProductView from './views/manageProduct/manageProduct';
import './App.css';

const store = createStore(
  combinedReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const mapStateToProps = (state) => {
  return {
    test: state.test
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(actionCreators, dispatch);

const ConnectedProductsView = connect(mapStateToProps, mapDispatchToProps)(ProductsView);
const ConnectedAdminView = connect(mapStateToProps, mapDispatchToProps)(AdminView);
const ConnectedManageProductView = connect(mapStateToProps, mapDispatchToProps)(ManageProductView);

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Route exact path='/' component={ConnectedProductsView} />
            <Route exact path='/admin' component={ConnectedAdminView} />
            <Route path='/admin/product/:id' component={ConnectedManageProductView} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
