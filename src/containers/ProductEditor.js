import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';

import EditProductForm from './EditProductForm';
import { fetchProducts, postProduct, putProduct } from '../modules/actions/products';
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
    const { isFetching } = this.props.products;

    return (
      <div className='admin-view'>
        <h3>Adicionar produto</h3>
        {isFetching ? (
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
        ) : (
          <EditProductForm onSubmit={this.submitProduct} />
        )}
      </div>
    );
  }
}

ManageProductView.propTypes = {
  match: PropTypes.object.isRequired,
  fetchProducts: PropTypes.func.isRequired,
  postProduct: PropTypes.func.isRequired,
  putProduct: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  products: state.products
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({fetchProducts, postProduct, putProduct}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ManageProductView);
