import React, { Component } from 'react';

import './products.css';

class ProductsView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentWillMount() {
    const products = [
      {
        id: "asdfqwer",
        name: "caixinha de fotos",
        image: ["http://alksdjflkasjdflksad.com", "http://alksdjflkasjdflksad.com", "http://alksdjflkasjdflksad.com"],
        description: "caixa para fotógrafos encantarem seus clientes bla bla bla",
        currentPrice: "R$ 18,00",
        discountPrice: "R$ 16,00",
        tags: "fotogragia, fotógrafos, casamento",
        productionTime: 15,
        minAmount: 10,
        dimensions: {
          width: 14,
          height: 3,
          lenght: 17,
          weigth: 190
        },
        isVisible: true,
        isFeatured: true
      },
      {
        id: "asdfzxcv",
        name: "caixinha de fotos",
        image: ["http://alksdjflkasjdflksad.com", "http://alksdjflkasjdflksad.com", "http://alksdjflkasjdflksad.com"],
        description: "caixa para fotógrafos encantarem seus clientes bla bla bla",
        currentPrice: "R$ 18,00",
        discountPrice: "R$ 16,00",
        tags: "fotogragia, fotógrafos, casamento",
        productionTime: 15,
        minAmount: 10,
        dimensions: {
          width: 14,
          height: 3,
          lenght: 17,
          weigth: 190
        },
        isVisible: true,
        isFeatured: true
      },
      {
        id: "asdfpiuy",
        name: "caixinha de fotos",
        image: ["http://alksdjflkasjdflksad.com", "http://alksdjflkasjdflksad.com", "http://alksdjflkasjdflksad.com"],
        description: "caixa para fotógrafos encantarem seus clientes bla bla bla",
        currentPrice: "R$ 18,00",
        discountPrice: "R$ 16,00",
        tags: "fotogragia, fotógrafos, casamento",
        productionTime: 15,
        minAmount: 10,
        dimensions: {
          width: 14,
          height: 3,
          lenght: 17,
          weigth: 190
        },
        isVisible: true,
        isFeatured: true
      }
    ];
    this.setState({ data: products.map(product => <div key={ product.id } className="product-cell">{ product.name }</div>) });
  }

  render() {
    return (
      <div>
        <div className="hero-bar">
          DaniK
        </div>
        {/*<div className="featured-products">
          Carrossel
        </div>*/}
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
