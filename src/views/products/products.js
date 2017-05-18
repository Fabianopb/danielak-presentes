import React, { Component } from 'react';

import productData from './products.json';
import './products.css';

class ProductsView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentWillMount() {
    this.setState({ data: productData.map(product => <div key={ product.id } className="product-cell">{ product.name }</div>) });
  }

  render() {
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
      </div>
    );
  }
}

export default ProductsView;
