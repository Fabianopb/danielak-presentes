import React, { Component } from 'react';

import productData from './products.json';
import ProductCell from './components/productCell';
import ProductDialog from './components/productDialog';
import './products.css';

class ProductsView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: null,
      activeProduct: null,
      isDialogOpen: false
    };
    this._handleOpen = this._handleOpen.bind(this);
    this._handleClose = this._handleClose.bind(this);
  }

  componentWillMount() {
    this.setState({ products: productData.map((product) => {
      return (
        <ProductCell
          key={ product.id }
          product={ product }
          onTouchTap={ () => this._handleOpen(product) }
        />
      );
    })});
  }

  _handleOpen(product) {
    this.setState({ activeProduct: product });
    this.setState({ isDialogOpen: true });
  };

  _handleClose() {
    this.setState({ isDialogOpen: false });
  };

  render() {

    return (
      <div>
        <div className="hero-bar">
          DaniK
        </div>
        <div className="product-grid">
          { this.state.products }
        </div>
        <div className="contact-footer">
          <p>danielalpresentes@yahoo.com.br</p>
          <p>Whatsapp +55 11 99777 5245</p>
        </div>
        <ProductDialog
          isDialogOpen={ this.state.isDialogOpen }
          handleOpen={ this._handleOpen }
          handleClose={ this._handleClose }
          product={ this.state.activeProduct }
        />
      </div>
    );
  }
}

export default ProductsView;
