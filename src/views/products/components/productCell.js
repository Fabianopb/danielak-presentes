import React, { Component } from 'react';

class ProductCell extends Component {

  render() {
    const product = this.props.product;
    return (
      <div className="product-cell" onTouchTap={ this.props.onTouchTap }>
        <div className="image"></div>
        <div className="title">{ product.name }</div>
        <div className="current-price">{ product.currentPrice }</div>
      </div>
    );
  }
}

export default ProductCell;
