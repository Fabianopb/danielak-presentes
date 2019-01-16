import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Dimmer, Loader, Image } from 'semantic-ui-react';
import { Grid, Col } from 'react-flexbox-grid';
import { RouterState, routerActions } from 'connected-react-router';
import { Carousel } from 'react-responsive-carousel';
import carousel1 from '../../assets/carousel-1.jpg';
import carousel2 from '../../assets/carousel-2.jpg';
import carousel3 from '../../assets/carousel-3.jpg';
import { productActions } from '../../actions/products';
import { currencyFormat } from '../../modules/helpers';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from './ProductGrid.module.scss';

type StateProps = {
  products: ProductsState;
  router: RouterState;
};

type DispatchProps = {
  productActions: typeof productActions;
  routerActions: typeof routerActions;
};

type OwnProps = {};

type ProductGridProps = StateProps & DispatchProps & OwnProps;

class ProductGrid extends React.Component<ProductGridProps> {
  public componentDidMount () {
    this.props.productActions.fetchProducts();
  }

  public render () {
    const { isFetching, data } = this.props.products;
    const { push } = this.props.routerActions;
    const { search } = this.props.router.location;
    return (
      <Grid className={styles.productsView}>
        <Col xs={true}>
          <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true}>
            <div>
              <img src={carousel1} alt='carousel1' />
              <p className='legend'>Legend 1</p>
            </div>
            <div>
              <img src={carousel2} alt='carousel2' />
              <p className='legend'>Legend 2</p>
            </div>
            <div>
              <img src={carousel3} alt='carousel3' />
              <p className='legend'>Legend 3</p>
            </div>
          </Carousel>
          <div className='flex-wrap main-axis-center'>
            {isFetching ? (
              <Dimmer active={true} inverted={true}>
                <Loader />
              </Dimmer>
            ) : data.map((product: Product) => {
              return (
                <div className={styles.productCell} key={product._id} onClick={() => push(`/product/${product._id}${search}`)}>
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
  products: state.products,
  router: state.router,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  productActions: bindActionCreators({ ...productActions }, dispatch),
  routerActions: bindActionCreators({ ...routerActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid);
