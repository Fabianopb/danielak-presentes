import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Modal, Dimmer, Loader } from 'semantic-ui-react';
import { fetchProducts, openDialog, closeDialog } from '../modules/actions/products';

import '../styles/products.css';

class ProductsView extends Component {
  componentDidMount () {
    this.props.fetchProducts();
  }

  render () {
    const {isFetching, data, isDialogOpen, activeProduct} = this.props.products;
    const {openDialog, closeDialog} = this.props;
    return (
      <div className='products-view'>
        <div className='product-grid'>
          {isFetching ? (
            <Dimmer active inverted>
              <Loader />
            </Dimmer>
          ) : data.map(product => (
            <div className='product-cell' key={product._id}>
              <img className='image' src={product.image} alt='N/A' onClick={() => openDialog(product)} />
              <div className='title'>{product.name}</div>
              <div className='current-price'>{product.currentPrice}</div>
            </div>
          ))}
        </div>
        {activeProduct && (
          <Modal className='product-modal' open={isDialogOpen} onClose={closeDialog}>
            <Modal.Header>
              {activeProduct.name}
            </Modal.Header>
            <Modal.Content>
              <img className='image' src={activeProduct.image} alt='N/A' />
              <p>{activeProduct.description}</p>
              <p>{activeProduct.currentPrice}</p>
            </Modal.Content>
            <Modal.Actions>
              <Button negative onClick={closeDialog}>No</Button>
              <Button positive onClick={closeDialog}>Yes</Button>
            </Modal.Actions>
          </Modal>
        )}
      </div>
    );
  }
}

ProductsView.propTypes = {
  fetchProducts: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired,
  openDialog: PropTypes.func.isRequired,
  closeDialog: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  products: state.products
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({fetchProducts, openDialog, closeDialog}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductsView);
