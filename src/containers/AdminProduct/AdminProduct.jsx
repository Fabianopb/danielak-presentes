import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { formValueSelector } from 'redux-form';
import { Dimmer, Loader, Icon, Modal, Button, Header } from 'semantic-ui-react';
import history from '../../modules/history';

import ProductForm from '../../forms/Product/Product';
import {
  fetchProducts,
  upsertProduct,
  openDialog,
  closeDialog,
  deleteProduct,
  handleFileDrop,
  deleteImage
} from '../../actions/products';

import styles from './AdminProduct.module.scss';

class ManageProductView extends Component {
  componentWillMount () {
    this.props.fetchProducts(this.props.match.params.id);
  }

  submitProduct = (product) => {
    if (this.props.match.params.id === 'new') {
      delete product._id;
    }
    this.props.upsertProduct(product);
  };

  render () {
    const { isFetching, activeProduct, isDialogOpen, openDialog, closeDialog,
      deleteProduct, images, handleFileDrop, deleteImage } = this.props;
    return (
      <div>
        <div className={styles.addProductHeader}>
          <h3>Adicionar produto</h3>
          <div className={styles.actionButtons}>
            <Button basic icon labelPosition='right' color='blue' onClick={() => history.goBack()}>
              Voltar<Icon name='chevron left' />
            </Button>
            <Button icon labelPosition='right' color='red' onClick={() => openDialog(activeProduct)}>
              Remover
              <Icon name='trash' />
            </Button>
          </div>
        </div>
        {isFetching ? (
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
        ) : (
          <ProductForm
            images={images}
            handleFileDrop={handleFileDrop}
            deleteImage={deleteImage}
            onSubmit={this.submitProduct}
          />
        )}
        <Modal open={isDialogOpen} onClose={closeDialog} size='small'>
          <Header icon='trash' content='Apagar produto' />
          <Modal.Content>
            <p>Tem certeza que deseja apagar o produto <em>{activeProduct && activeProduct.name}</em>?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic icon labelPosition='right' color='blue' onClick={closeDialog} >
              Cancelar<Icon name='ban' />
            </Button>
            <Button icon labelPosition='right' color='red' onClick={() => deleteProduct(activeProduct._id)} >
              Remover<Icon name='remove' />
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
  upsertProduct: PropTypes.func.isRequired,
  openDialog: PropTypes.func.isRequired,
  closeDialog: PropTypes.func.isRequired,
  deleteProduct: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isDialogOpen: PropTypes.bool.isRequired,
  activeProduct: PropTypes.object,
  handleFileDrop: PropTypes.func.isRequired,
  deleteImage: PropTypes.func.isRequired,
  images: PropTypes.array
};

const mapStateToProps = (state) => ({
  isFetching: state.products.isFetching,
  activeProduct: state.products.activeProduct,
  isDialogOpen: state.products.isDialogOpen,
  images: formValueSelector('editProductForm')(state, 'image')
});

export default connect(mapStateToProps, {
  fetchProducts, upsertProduct, openDialog, closeDialog, deleteProduct, handleFileDrop, deleteImage
})(ManageProductView);
