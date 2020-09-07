import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Dimmer, Loader, Image, Divider } from 'semantic-ui-react';
import useSWR from 'swr';
import { RouterState, routerActions as cRouterActions } from 'connected-react-router';
import { Carousel } from 'react-responsive-carousel';
import carousel1 from '../../assets/carousel-1.jpg';
import carousel2 from '../../assets/carousel-2.jpg';
import carousel3 from '../../assets/carousel-3.jpg';
import { currencyFormat } from '../../modules/helpers';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './ProductGrid.module.scss';
import { fetchAllProducts } from '../../api';

interface StateProps {
  router: RouterState;
}

interface DispatchProps {
  routerActions: typeof cRouterActions;
}

type ProductGridProps = StateProps & DispatchProps;

const ProductGrid = ({ router, routerActions }: ProductGridProps) => {
  const { data, isValidating } = useSWR('/products', fetchAllProducts);

  return (
    <div className={styles.productsView}>
      <h3>Destaques</h3>
      <Divider />
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        stopOnHover={false}
        interval={6000}
        transitionTime={600}
        className={styles.carousel}
      >
        <div>
          <img src={carousel1} alt="carousel1" />
          <p className="legend">Entregue seu projeto em uma caixa personalizada e com estilo</p>
        </div>
        <div>
          <img src={carousel2} alt="carousel2" />
          <p className="legend">Caixas para fotos 10x15 com encaixe para pendrive ou pencard</p>
        </div>
        <div>
          <img src={carousel3} alt="carousel3" />
          <p className="legend">Um jeito diferente e especial de tratar seus clientes</p>
        </div>
      </Carousel>
      <h3>Produtos</h3>
      <Divider />
      <div className="flex-wrap main-axis-center">
        {isValidating ? (
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
        ) : (
          data &&
          data.map(product => (
            <div
              className={styles.productCell}
              key={product._id}
              onClick={() => routerActions.push(`/product/${product._id}${router.location.search}`)}
            >
              <div className={styles.imageContainer}>
                {product.image.length > 0 && (
                  <Image
                    className={styles.productImage}
                    src={product.image[product.featuredImageIndex].large}
                  />
                )}
              </div>
              <div className={styles.title}>{product.name}</div>
              <div className={styles.currentPrice}>
                <span className={product.discountPrice ? styles.disabledPrice : ''}>
                  {currencyFormat(product.currentPrice)}
                </span>
                {product.discountPrice && currencyFormat(product.discountPrice)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  router: state.router,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  routerActions: bindActionCreators({ ...cRouterActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductGrid);
