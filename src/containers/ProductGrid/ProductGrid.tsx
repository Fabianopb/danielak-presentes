import { useHistory, useLocation } from 'react-router-dom';
import { Image, Divider } from 'semantic-ui-react';
import queryString from 'query-string';
import { Carousel } from 'react-responsive-carousel';
import carousel1 from '../../assets/carousel-1.jpg';
import carousel2 from '../../assets/carousel-2.jpg';
import carousel3 from '../../assets/carousel-3.jpg';
import { currencyFormat } from '../../modules/helpers';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './ProductGrid.module.scss';
import { Product } from '../../data/products';

type Props = {
  products: Product[];
};

const ProductGrid = ({ products }: Props) => {
  const history = useHistory();
  const location = useLocation();

  const { categoryId } = queryString.parse(location.search);

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
        {products
          .filter((product) => (categoryId ? product.categoria === categoryId : true))
          .map((product) => (
            <div
              className={styles.productCell}
              key={product.id}
              onClick={() => history.push(`/product/${product.id}${location.search}`)}
            >
              <div className={styles.imageContainer}>
                {product.imagens.length > 0 && <Image className={styles.productImage} src={product.imagens[0].large} />}
              </div>
              <div className={styles.title}>{product.nome}</div>
              <div className={styles.currentPrice}>
                <span className={product.precoDesconto ? styles.disabledPrice : ''}>
                  {currencyFormat(product.preco)}
                </span>
                {product.precoDesconto && currencyFormat(product.precoDesconto)}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductGrid;
