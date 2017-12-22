import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Table, Icon, Modal, Button, Header, Dimmer, Loader } from 'semantic-ui-react';
import { fetchProducts, deleteProduct, openDialog, closeDialog } from '../modules/actions/products';
import { validateSession } from '../modules/actions/users';

import '../styles/admin.css';

class AdminView extends Component {
  componentWillMount () {
    this.props.validateSession();
  }

  componentDidMount () {
    this.props.fetchProducts();
  }

  render () {
    const {data, isFetching, isDialogOpen, activeProduct} = this.props.products;
    const {openDialog, closeDialog} = this.props;
    return (
      <div className='admin-view'>
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
          {isFetching ? (
            <Dimmer active inverted>
              <Loader />
            </Dimmer>
          ) : (
            <Table singleLine>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Produto</Table.HeaderCell>
                  <Table.HeaderCell>Preço</Table.HeaderCell>
                  <Table.HeaderCell>Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {data.map((product) => (
                  <Table.Row key={product._id}>
                    <Table.Cell className='name-row'>
                      <img className='thumbnail' src={product.image} alt='N/A' />
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
                        <Icon name='trash' onClick={() => openDialog(product)} />
                      </Link>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </div>
        {activeProduct && (
          <Modal open={isDialogOpen} onClose={closeDialog} basic size='small'>
            <Header icon='trash' content='Apagar produto' />
            <Modal.Content>
              <p>Tem certeza que deseja apagar o produto <em>{activeProduct && activeProduct.name}</em>?</p>
            </Modal.Content>
            <Modal.Actions>
              <Button basic color='red' inverted onClick={closeDialog} >
                <Icon name='remove' /> No
              </Button>
              <Button color='green' inverted onClick={() => this.props.deleteProduct(activeProduct._id)} >
                <Icon name='checkmark' /> Yes
              </Button>
            </Modal.Actions>
          </Modal>
        )}
      </div>
    );
  }
}

AdminView.propTypes = {
  products: PropTypes.object.isRequired,
  fetchProducts: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  openDialog: PropTypes.func.isRequired,
  closeDialog: PropTypes.func.isRequired,
  validateSession: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  products: state.products
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({fetchProducts, deleteProduct, openDialog, closeDialog, validateSession}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AdminView);
