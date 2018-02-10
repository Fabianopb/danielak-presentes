import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dimmer, Loader, Divider, Grid } from 'semantic-ui-react';
import { fetchProducts, showProductDetails } from '../modules/actions/products';

import '../styles/products.css';

class ProductsView extends Component {
  componentDidMount () {
    this.props.fetchProducts();
  }

  render () {
    const {isFetching, data} = this.props.products;
    return (
      <Grid className='products-view'>
        <Grid.Column width={2} only='computer' />
        <Grid.Column width={1} only='widescreen' />
        <Grid.Column computer={12} widescreen={10} width={16}>
          <h2>Os mais vendidos</h2>
          <Divider />
          <div className='flex-wrap main-axis-center'>
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
        </Grid.Column>
        <Grid.Column width={2} only='computer' />
        <Grid.Column width={1} only='widescreen' />
      </Grid>
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
