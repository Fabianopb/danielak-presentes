import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';

import EditProductForm from './EditProductForm';
import { fetchProducts } from '../../modules/actions';
import './manageProduct.css';

class ManageProductView extends Component {
  componentWillMount () {
    this.props.fetchProducts(this.props.match.params.id);
  }

  submitProduct = (values) => {
    console.log('submitting product', values);
  };

  render () {
    const { isFetching } = this.props.products;

    return (
      <div>
        <div className='admin-bar'>
          DaniK - Admin View
        </div>
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
  products: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  products: state.products
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({fetchProducts}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ManageProductView);
