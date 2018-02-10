import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dimmer, Loader, Divider } from 'semantic-ui-react';
import MediaQuery from 'react-responsive';
import { lgOrGreater } from '../modules/breakpoints';
import { fetchProducts, showProductDetails } from '../modules/actions/products';

import '../styles/products.css';

class ProductsView extends Component {
  componentDidMount () {
    this.props.fetchProducts();
  }

  render () {
    const {isFetching, data} = this.props.products;
    return (
      <div className='products-view flex-row'>
        <MediaQuery query={lgOrGreater}>
          <div className='flex-1' />
        </MediaQuery>
        <div className='flex-6'>
          <h2>Os mais vendidos</h2>
          <Divider />
          <div className='products-grid flex-wrap main-axis-center'>
            {isFetching ? (
              <Dimmer active inverted>
                <Loader />
              </Dimmer>
            ) : data.map(product => (
              <div className='product-cell flex-column' key={product._id}>
                <div className='image-container'>
                  <img
                    src={product.image[product.featuredImageIndex]}
                    alt='N/A'
                    onClick={() => this.props.showProductDetails(product)}
                  />
                </div>
                <div className='title'>{product.name}</div>
                <div className='current-price'>
                  <div>R$ {product.currentPrice.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <MediaQuery query={lgOrGreater}>
          <div className='flex-1' />
        </MediaQuery>
      </div>
    );
  }
}

ProductsView.propTypes = {
  fetchProducts: PropTypes.func.isRequired,
  showProductDetails: PropTypes.func.isRequired,
  products: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  products: state.products
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({fetchProducts, showProductDetails}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductsView);
