import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Table, Icon, Modal, Button, Header } from 'semantic-ui-react';

import Request from '../../modules/requests';
import './admin.css';

const ConfirmationDialog = (props) => (
  <Modal open={props.isDialogOpen} onClose={props.closeDialog} basic size='small'>
    <Header icon='trash' content='Apagar produto' />
    <Modal.Content>
      <p>Tem certeza que deseja apagar o produto <em>{props.activeProduct && props.activeProduct.name}</em>?</p>
    </Modal.Content>
    <Modal.Actions>
      <Button basic color='red' inverted onClick={props.closeDialog} >
        <Icon name='remove' /> No
      </Button>
      <Button color='green' inverted onClick={props.deleteProduct} >
        <Icon name='checkmark' /> Yes
      </Button>
    </Modal.Actions>
  </Modal>
);

class AdminView extends Component {
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
      this.setState({ products: this.renderProducts(products) });
    });
  }

  renderProducts = (products) => {
    return products.map((product) => {
      return (
        <Table.Row key={product._id}>
          <Table.Cell className='name-row'>
            <div className='thumbnail' />
            <div className='product-name'>{ product.name }</div>
          </Table.Cell>
          <Table.Cell>
            { product.currentPrice }
          </Table.Cell>
          <Table.Cell>
            <Link to={`/admin/product/${product._id}`}>
              <Icon name='pencil' />
            </Link>
            <Link to={`#`}>
              <Icon name='trash' onClick={() => this.openDialog(product)} />
            </Link>
          </Table.Cell>
        </Table.Row>
      );
    });
  }

  openDialog = (product) => {
    this.setState({
      activeProduct: product,
      isDialogOpen: true
    });
  }

  closeDialog = () => {
    this.setState({isDialogOpen: false});
  }

  deleteProduct = () => {
    Request.deleteProduct(this.state.product, this.state.activeProduct._id).then(response => {
      console.log(response);
      const products = this.state.products;
      const index = products.findIndex(product => product.key === this.state.activeProduct._id);
      products.splice(index, 1);
      this.setState({products});
      this.closeDialog();
    }).catch((error) => console.log(error.response));
  }

  render () {
    return (
      <div>
        <div className='admin-bar'>
          DaniK - Admin View
        </div>
        <h3>Lista de produtos</h3>
        <div className='add-product'>
          <Link to='/admin/product/new'>
            <div>Adicionar Produto</div>
            <Icon name='plus' />
          </Link>
        </div>
        <div className='product-list'>
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
        <ConfirmationDialog
          isDialogOpen={this.state.isDialogOpen}
          closeDialog={this.closeDialog}
          activeProduct={this.state.activeProduct}
          deleteProduct={this.deleteProduct}
        />
      </div>
    );
  }
}

ConfirmationDialog.propTypes = {
  isDialogOpen: PropTypes.bool,
  closeDialog: PropTypes.func,
  activeProduct: PropTypes.object,
  deleteProduct: PropTypes.func
};

export default AdminView;
