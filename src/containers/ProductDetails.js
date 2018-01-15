import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';

import { getProductDetails } from '../modules/actions/products';

import '../styles/products.css';

class ProductsView extends Component {
  componentDidMount () {
    this.props.getProductDetails(this.props.match.params.id);
  }

  render () {
    const {isFetching, activeProduct} = this.props.products;
    return (
      <div>
        { isFetching ? (
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
        ) : (
          <div>
            { activeProduct ? (
              <div>
                <div>
                  <img src={activeProduct.image[activeProduct.featuredImageIndex]} alt='N/A' />
                  <div>{activeProduct.name}</div>
                </div>
                <div>{activeProduct.description}</div>
              </div>
            ) : (
              <div>Produto não encontrado</div>
            ) }
          </div>
        ) }
      </div>
    );
  }
}

ProductsView.propTypes = {
  getProductDetails: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  products: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  products: state.products
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({getProductDetails}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductsView);
