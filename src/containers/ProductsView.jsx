import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Dimmer, Loader, Divider, Grid, Image } from 'semantic-ui-react';
import { fetchProducts, showProductDetails } from '../modules/actions/products';
import { currencyFormat } from '../modules/helpers';

import styles from './ProductsView.module.scss';

class ProductsView extends Component {
  componentDidMount () {
    this.props.fetchProducts();
  }

  render () {
    const {isFetching, data} = this.props.products;
    return (
      <Grid className={styles.productsView}>
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
              <div className={styles.productCell} key={product._id}>
                <div className={styles.imageContainer}>
                  <Image
                    src={product.image[product.featuredImageIndex].large}
                    onClick={() => this.props.showProductDetails(product)}
                  />
                </div>
                <div className={styles.title}>
                  {product.name}
                </div>
                <div className={styles.currentPrice}>
                  <span className={product.discountPrice && styles.disabledPrice}>
                    { currencyFormat(product.currentPrice) }
                  </span>
                  { product.discountPrice && currencyFormat(product.discountPrice) }
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

export default connect(mapStateToProps, {fetchProducts, showProductDetails})(ProductsView);
