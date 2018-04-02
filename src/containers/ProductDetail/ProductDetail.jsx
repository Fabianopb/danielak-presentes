import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { Dimmer, Loader, Button, Icon, Divider, Grid } from 'semantic-ui-react';
import ImageGallery from '../../components/ImageGallery/ImageGallery';
import { getProductDetail } from '../../actions/products';
import { currencyFormat } from '../../modules/helpers';

import styles from './ProductDetail.module.scss';

class ProductDetail extends Component {
  componentDidMount () {
    this.props.getProductDetail(this.props.match.params.id);
  }

  goToShop (url) {
    window.open(url, '_blank');
  }

  render () {
    const {isFetching, activeProduct} = this.props.products;
    return (
      <Grid className={styles.productDetails}>
        <Grid.Column width={2} only='computer' />
        <Grid.Column width={1} only='widescreen' />
        { isFetching ? (
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
        ) : (
          <Grid.Column computer={12} widescreen={10} width={16}>
            { activeProduct ? (
              <div>
                <Grid stackable columns={2}>
                  <Grid.Column>
                    <ImageGallery images={activeProduct.image} selectedIndex={activeProduct.featuredImageIndex} />
                  </Grid.Column>
                  <Grid.Column>
                    <div className={`${styles.descriptionContainer} flex-column cross-axis-baseline`}>
                      <div className={styles.title}>{activeProduct.name}</div>
                      <div className={styles.price}>
                        <span className={activeProduct.discountPrice && styles.disabledPrice}>
                          { currencyFormat(activeProduct.currentPrice) }
                        </span>
                        { activeProduct.discountPrice && currencyFormat(activeProduct.discountPrice) }
                      </div>
                      <Button primary icon labelPosition='left' onClick={() => this.goToShop(activeProduct.storeLink)}>
                        <Icon name='shop' />
                        Ver na minha lojinha
                      </Button>
                      <div className={styles.description} dangerouslySetInnerHTML={{__html: activeProduct.description}} />
                    </div>
                  </Grid.Column>
                </Grid>
                <Divider />
                <h3>Detalhes do produto e entrega</h3>
                <div>Peso: {activeProduct.weight} g</div>
                <div>Dimensões: {activeProduct.width} (C) x {activeProduct.depth} (L) x {activeProduct.height} (A)</div>
                <div>Quantidade mínima do pedido: {activeProduct.minAmount}</div>
                <div>Tempo esperado para produção: {activeProduct.productionTime}</div>
              </div>
            ) : (
              <div>Produto não encontrado</div>
            ) }
          </Grid.Column>
        ) }
        <Grid.Column width={2} only='computer' />
        <Grid.Column width={1} only='widescreen' />
      </Grid>
    );
  }
}

ProductDetail.propTypes = {
  getProductDetail: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  products: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  products: state.products
});

export default connect(mapStateToProps, {getProductDetail})(ProductDetail);
