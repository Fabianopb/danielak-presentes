import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import productData from './products.json';
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
    this.setState({ products: productData.map(product => <div key={ product.id } className="product-cell" onTouchTap={ () => this._handleOpen(product) }>{ product.name }</div>) });
  }

  _handleOpen(product) {
    this.setState({ activeProduct: product });
    this.setState({ isDialogOpen: true });
  };

  _handleClose() {
    this.setState({ isDialogOpen: false });
  };

  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        primary={ true }
        onTouchTap={ this._handleClose }
      />,
      <FlatButton
        label="Submit"
        primary={ true }
        keyboardFocused={ true }
        onTouchTap={ this._handleClose }
      />,
    ];

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
        <Dialog
          title={ this.state.activeProduct && this.state.activeProduct.name }
          actions={ actions }
          modal={ false }
          open={ this.state.isDialogOpen }
          onRequestClose={ this._handleClose }
        >
          { this.state.activeProduct && this.state.activeProduct.description }
        </Dialog>
      </div>
    );
  }
}

export default ProductsView;
