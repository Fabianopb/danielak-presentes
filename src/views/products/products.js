import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Button, Modal, Dimmer, Loader} from 'semantic-ui-react';
import { fetchProducts, openDialog, closeDialog } from '../../modules/actions';

import './products.css';

class ProductsView extends Component {
  componentDidMount () {
    this.props.fetchProducts();
  }

  render () {
    const {isLoading, data, isDialogOpen, activeProduct} = this.props.products;
    const {openDialog, closeDialog} = this.props;
    return (
      <div>
        <div className='hero-bar'>
          DaniK
        </div>
        <div className='product-grid'>
          {isLoading ? (
            <Dimmer active inverted>
              <Loader />
            </Dimmer>
          ) : data.map(product => (
            <div className='product-cell' key={product._id}>
              <div className='image' onClick={() => openDialog(product)} />
              <div className='title'>{product.name}</div>
              <div className='current-price'>{product.currentPrice}</div>
            </div>
          ))}
        </div>
        <div className='contact-footer'>
          <p>danielalpresentes@yahoo.com.br</p>
          <p>Whatsapp +55 11 99777 5245</p>
        </div>
        {activeProduct && (
          <Modal open={isDialogOpen} onClose={closeDialog}>
            <Modal.Header>
              {activeProduct.name}
            </Modal.Header>
            <Modal.Content>
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
