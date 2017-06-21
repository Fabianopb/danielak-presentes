import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {Button, Modal} from 'semantic-ui-react';

import Request from '../../modules/requests';
import './products.css';

const ProductCell = (props) => {
  const product = props.product;
  return (
    <div className='product-cell'>
      <div className='image' onClick={props.onClick} />
      <div className='title'>{product.name}</div>
      <div className='current-price'>{product.currentPrice}</div>
    </div>
  );
};

const ProductDialog = (props) => {
  return (
    <Modal open={props.isDialogOpen} onClose={props.handleClose}>
      <Modal.Header>
        {props.product && props.product.name}
      </Modal.Header>
      <Modal.Content>
        <p>{props.product && props.product.description}</p>
        <p>{props.product && props.product.currentPrice}</p>
      </Modal.Content>
      <Modal.Actions>
        <Button negative onClick={props.handleClose}>No</Button>
        <Button positive onClick={props.handleClose}>Yes</Button>
      </Modal.Actions>
    </Modal>
  );
};

class ProductsView extends Component {
  constructor (props) {
    super(props);
    this.state = {
      products: null,
      activeProduct: null,
      isDialogOpen: false
    };
  }

  componentWillMount () {
    Request.getAllProducts().then((response) => {
      const products = response.data;
      this.setState({products: products.map((product) => {
        return (
          <ProductCell
            key={product._id}
            product={product}
            onClick={() => this._handleOpen(product)}
          />
        );
      })});
    });
  }

  _handleOpen = (product) => {
    this.setState({activeProduct: product});
    this.setState({isDialogOpen: true});
  }

  _handleClose = () => {
    this.setState({isDialogOpen: false});
  }

  render () {
    return (
      <div>
        <div className='hero-bar'>
          DaniK
        </div>
        <div className='product-grid'>
          {this.state.products}
        </div>
        <div className='contact-footer'>
          <p>danielalpresentes@yahoo.com.br</p>
          <p>Whatsapp +55 11 99777 5245</p>
        </div>
        <ProductDialog
          isDialogOpen={this.state.isDialogOpen}
          handleOpen={this._handleOpen}
          handleClose={this._handleClose}
          product={this.state.activeProduct}
        />
      </div>
    );
  }
}

ProductCell.propTypes = {
  product: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};

ProductDialog.propTypes = {
  product: PropTypes.object,
  isDialogOpen: PropTypes.bool,
  handleClose: PropTypes.func
};

export default ProductsView;
