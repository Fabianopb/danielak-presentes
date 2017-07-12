import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { applyMiddleware, compose, createStore, bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';

import { fetchProducts, openDialog, closeDialog } from './modules/actions';
import { rootReducer } from './modules/reducers';

import ProductsView from './views/products/products';
import AdminView from './views/admin/admin';
import ManageProductView from './views/manageProduct/manageProduct';
import './App.css';

const middleware = [thunk];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

const mapStateToProps = (state) => {
  return {
    products: state.products
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({fetchProducts, openDialog, closeDialog}, dispatch);

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
