import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dimmer, Loader, Divider, Grid, Image } from 'semantic-ui-react';
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
              <Grid className='product-cell' key={product._id} columns={1}>
                <Grid.Column className='image-container'>
                  <Image
                    src={product.image[product.featuredImageIndex]}
                    onClick={() => this.props.showProductDetails(product)}
                  />
                </Grid.Column>
                <Grid.Column className='title'>
                  {product.name}
                </Grid.Column>
                <Grid.Column className='current-price'>
                  R$ {product.currentPrice.toFixed(2)}
                </Grid.Column>
              </Grid>
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
