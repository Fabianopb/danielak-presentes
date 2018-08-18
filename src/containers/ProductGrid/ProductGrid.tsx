import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Dimmer, Loader, Image } from 'semantic-ui-react';
import { Grid, Col } from 'react-flexbox-grid';
import { productActions } from '../../actions/products';
import { currencyFormat } from '../../modules/helpers';
import styles from './ProductGrid.module.scss';

type StateProps = {
  products: ProductsState;
};

type DispatchProps = {
  productActions: typeof productActions;
};

type OwnProps = {};

type ProductGridProps = StateProps & DispatchProps & OwnProps;

class ProductGrid extends React.Component<ProductGridProps> {
  public componentDidMount () {
    this.props.productActions.fetchProducts();
  }

  public render () {
    const {isFetching, data} = this.props.products;
    const { showProductDetail } = this.props.productActions;
    return (
      <Grid className={styles.productsView}>
        <Col xs={true}>
          <div className='flex-wrap main-axis-center'>
            {isFetching ? (
              <Dimmer active={true} inverted={true}>
                <Loader />
              </Dimmer>
            ) : data.map((product: Product) => {
              return (
                <div className={styles.productCell} key={product._id} onClick={() => showProductDetail(product._id)}>
                  <div className={styles.imageContainer}>
                    {product.image.length > 0 && <Image src={product.image[product.featuredImageIndex].large} />}
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
              );
            })}
          </div>
        </Col>
      </Grid>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  products: state.products
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  productActions: bindActionCreators({ ...productActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid);
