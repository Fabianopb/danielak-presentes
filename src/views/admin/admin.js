import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FontIcon from 'material-ui/FontIcon';
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
    Request.getProducts().then((response) => {
      const products = response.data;
      this.setState({ products: this._renderProducts(products) });
    });
  }

  _renderProducts(products) {
    return products.map((product) => {
      return (
        <TableRow key={ product._id }>
          <TableRowColumn className="name-row">
            <div className="thumbnail"></div>
            <div className="product-name">{ product.name }</div>
          </TableRowColumn>
          <TableRowColumn>{ product.currentPrice }</TableRowColumn>
          <TableRowColumn>
            <Link to={ `/admin/${product._id}` } className="add-product">
              <FontIcon className="icon icon-pencil" />
            </Link>
            <FontIcon className="icon icon-bin" />
          </TableRowColumn>
        </TableRow>
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
        <Link to="/admin/add-product" className="add-product">
          <h4>Adicionar Produto</h4>
          <FontIcon className="icon icon-plus" />
        </Link>
        <div className="product-list">
          <Table selectable={ false }>
            <TableHeader displaySelectAll={ false } adjustForCheckbox={ false }>
              <TableRow>
                <TableHeaderColumn>Produto</TableHeaderColumn>
                <TableHeaderColumn>Preço</TableHeaderColumn>
                <TableHeaderColumn>Ações</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={ false }>
              { this.state.products }
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
}

export default AdminView;
