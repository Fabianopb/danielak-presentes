import React, { Component } from 'react';
import { PropTypes } from 'prop-types';

class ProductCell extends Component {
  render () {
    const product = this.props.product;
    return (
      <div className='product-cell'>
        <div className='image' onClick={this.props.onClick} />
        <div className='title'>{product.name}</div>
        <div className='current-price'>{product.currentPrice}</div>
      </div>
    );
  }
}

export default ProductCell;

ProductCell.propTypes = {
  product: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
};
