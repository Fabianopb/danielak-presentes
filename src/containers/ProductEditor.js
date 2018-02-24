import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dimmer, Loader, Icon, Modal, Button, Header } from 'semantic-ui-react';

import EditProductForm from './EditProductForm';
import { fetchProducts, postProduct, putProduct, openDialog, closeDialog, deleteProduct } from '../modules/actions/products';
import '../styles/manageProduct.css';

class ManageProductView extends Component {
  componentWillMount () {
    this.props.fetchProducts(this.props.match.params.id);
  }

  submitProduct = (product) => {
    if (this.props.match.params.id === 'new') {
      this.props.postProduct(product);
    } else {
      this.props.putProduct(product);
    }
  };

  render () {
    const { isFetching, activeProduct, isDialogOpen,
      openDialog, closeDialog, deleteProduct } = this.props;
    return (
      <div className='admin-view'>
        <div className='add-product-header'>
          <h3>Adicionar produto</h3>
          <Link to='#'>
            <Button icon labelPosition='right' color='red' onClick={() => openDialog(activeProduct)}>
              Deletar
              <Icon name='trash' />
            </Button>
          </Link>
        </div>
        {isFetching ? (
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
        ) : (
          <EditProductForm onSubmit={this.submitProduct} />
        )}
        <Modal open={isDialogOpen} onClose={closeDialog} basic size='small'>
          <Header icon='trash' content='Apagar produto' />
          <Modal.Content>
            <p>Tem certeza que deseja apagar o produto <em>{activeProduct && activeProduct.name}</em>?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color='red' inverted onClick={closeDialog} >
              <Icon name='remove' /> No
            </Button>
            <Button color='green' inverted onClick={() => deleteProduct(activeProduct._id)} >
              <Icon name='checkmark' /> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
    );
  }
}

ManageProductView.propTypes = {
  match: PropTypes.object.isRequired,
  fetchProducts: PropTypes.func.isRequired,
  postProduct: PropTypes.func.isRequired,
  putProduct: PropTypes.func.isRequired,
  openDialog: PropTypes.func.isRequired,
  closeDialog: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isDialogOpen: PropTypes.bool.isRequired,
  activeProduct: PropTypes.object
};

const mapStateToProps = (state) => ({
  isFetching: state.products.isFetching,
  activeProduct: state.products.activeProduct,
  isDialogOpen: state.products.isDialogOpen
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({fetchProducts, postProduct, putProduct, openDialog, closeDialog, deleteProduct}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ManageProductView);
