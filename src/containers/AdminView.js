import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Table, Icon, Modal, Button, Header, Dimmer, Loader, Form } from 'semantic-ui-react';
import { fetchProducts, deleteProduct, openDialog, closeDialog } from '../modules/actions';

import '../styles/admin.css';

class AdminView extends Component {
  componentDidMount () {
    this.props.fetchProducts();
    this.state = {
      file: null
    };
  }

  submitFile = (event) => {
    event.preventDefault();
    const formData = new FormData();
    console.log(this.state.file[0]);
    formData.append('file', this.state.file[0]);
    for (const entry of formData.entries()) {
      console.log(entry);
    }
    axios.post(`/api/products/test-upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      console.log(response.data);
    }).catch(error => console.log(error));
  }

  handleFileUpload = (event) => {
    this.setState({file: event.target.files});
  }

  render () {
    const {data, isFetching, isDialogOpen, activeProduct} = this.props.products;
    const {openDialog, closeDialog} = this.props;
    return (
      <div>
        <div className='admin-bar'>
          DaniK - Admin View
        </div>
        <Form onSubmit={this.submitFile}>
          <Form.Input label='upload file' type='file' onChange={this.handleFileUpload} />
          <Button type='submit'>Send</Button>
        </Form>
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
  closeDialog: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  products: state.products
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({fetchProducts, deleteProduct, openDialog, closeDialog}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AdminView);
