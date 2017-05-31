import React, { Component } from 'react';
import { Table, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import Request from '../../modules/requests';
import './admin.css';

class AdminView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      products: null
    };
  }

  componentWillMount() {
    Request.getAllProducts().then((response) => {
      const products = response.data;
      this.setState({ products: this._renderProducts(products) });
    });
  }

  _renderProducts(products) {
    return products.map((product) => {
      return (
        <Table.Row key={ product._id }>
          <Table.Cell className="name-row">
            <div className="thumbnail"></div>
            <div className="product-name">{ product.name }</div>
          </Table.Cell>
          <Table.Cell>
            { product.currentPrice }
          </Table.Cell>
          <Table.Cell>
            <Link to={ `/admin/product/${product._id}` } className="add-product">
              <Icon link name='pencil' />
            </Link>
            <Icon link name='trash' />
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  render() {
    return (
      <div>
        <div className="admin-bar">
          DaniK - Admin View
        </div>
        <h3>Lista de produtos</h3>
        <Link to="/admin/product/new" className="add-product">
          <h4>Adicionar Produto</h4>
          <Icon link name='plus' />
        </Link>
        <div className="product-list">
          <Table singleLine>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Produto</Table.HeaderCell>
                <Table.HeaderCell>Preço</Table.HeaderCell>
                <Table.HeaderCell>Ações</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              { this.state.products }
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  }
}

export default AdminView;
