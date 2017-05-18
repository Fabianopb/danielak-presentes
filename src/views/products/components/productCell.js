import React, { Component } from 'react';

class ProductCell extends Component {

  render() {
    const product = this.props.product;
    return (
      <div className="product-cell" onTouchTap={ this.props.onTouchTap }>
        { product.name }
      </div>
    );
  }
}

export default ProductCell;
