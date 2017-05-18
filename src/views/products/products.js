import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import productData from './products.json';
import './products.css';

class ProductsView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      open: false
    };
    this._handleOpen = this._handleOpen.bind(this);
    this._handleClose = this._handleClose.bind(this);
  }

  componentWillMount() {
    this.setState({ data: productData.map(product => <div key={ product.id } className="product-cell" onTouchTap={ this._handleOpen }>{ product.name }</div>) });
  }

  _handleOpen() {
    this.setState({ open: true });
  };

  _handleClose() {
    this.setState({ open: false });
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
          { this.state.data }
        </div>
        <div className="contact-footer">
          <p>danielalpresentes@yahoo.com.br</p>
          <p>Whatsapp +55 11 99777 5245</p>
        </div>
        <Dialog
          title="Dialog With Actions"
          actions={ actions }
          modal={ false }
          open={ this.state.open }
          onRequestClose={ this._handleClose }
        >
          The actions in this window were passed in as an array of React objects.
        </Dialog>
      </div>
    );
  }
}

export default ProductsView;
