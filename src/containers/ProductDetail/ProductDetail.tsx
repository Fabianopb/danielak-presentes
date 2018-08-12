import * as React from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { Dimmer, Loader, Button, Icon, Grid } from 'semantic-ui-react';
import ImageGallery from '../../components/ImageGallery/ImageGallery';
import { getProductDetail } from '../../actions/products';
import { currencyFormat } from '../../modules/helpers';
import history from '../../modules/history';
import styles from './ProductDetail.module.scss';

type StateProps = {
  products: ProductsState;
};

type DispatchProps = {
  getProductDetail: any;
};

type OwnProps = {
  match: match<{id: string}>;
};

type ProductDetailProps = StateProps & DispatchProps & OwnProps;

class ProductDetail extends React.Component<ProductDetailProps> {
  public componentDidMount () {
    this.props.getProductDetail(this.props.match.params.id);
  }

  public render () {
    const {isFetching, activeProduct} = this.props.products;
    return (
      <div>
        <Grid className={styles.productDetails}>
          <Grid.Column width={2} only='computer' />
          <Grid.Column width={1} only='widescreen' />
          { isFetching ? (
            <Dimmer active={true} inverted={true}>
              <Loader />
            </Dimmer>
          ) : (
            <Grid.Column computer={12} widescreen={10} width={16}>
              <div className={styles.backButtonWrapper}>
                <Button basic={true} icon={true} labelPosition='right' color='purple' onClick={() => history.goBack()}>
                  <Icon name='chevron left' />Voltar
                </Button>
              </div>
              { activeProduct ? (
                <div>
                  <Grid stackable={true} columns={2}>
                    <Grid.Column className={styles.frame}>
                      <ImageGallery images={activeProduct.image} selectedIndex={activeProduct.featuredImageIndex} />
                    </Grid.Column>
                    <Grid.Column className={styles.frame}>
                      <div className={`${styles.detailsContainer} flex-column cross-axis-baseline`}>
                        <div className={styles.title}>{activeProduct.name}</div>
                        <div className={styles.price}>
                          <span className={activeProduct.discountPrice && styles.disabledPrice}>
                            { currencyFormat(activeProduct.currentPrice) }
                          </span>
                          { activeProduct.discountPrice && currencyFormat(activeProduct.discountPrice) }
                        </div>
                        <Button primary={true} icon={true} labelPosition='left' onClick={() => this.goToShop(activeProduct.storeLink)}>
                          <Icon name='shop' />
                          Ver na minha lojinha
                        </Button>
                        <h3>Detalhes do produto e confecção</h3>
                        <div>Peso: {activeProduct.weight} g</div>
                        <div>Dimensões: {activeProduct.width} (C) x {activeProduct.depth} (L) x {activeProduct.height} (A)</div>
                        <div>Quantidade mínima do pedido: {activeProduct.minAmount}</div>
                        <div>Tempo esperado para produção: {activeProduct.productionTime} dias úteis.</div>
                      </div>
                    </Grid.Column>
                  </Grid>
                  <Grid>
                    <Grid.Column className={styles.description}>
                      <div dangerouslySetInnerHTML={{__html: activeProduct.description}} />
                    </Grid.Column>
                  </Grid>
                </div>
              ) : (
                <div>Produto não encontrado</div>
              ) }
            </Grid.Column>
          ) }
          <Grid.Column width={2} only='computer' />
          <Grid.Column width={1} only='widescreen' />
        </Grid>
      </div>
    );
  }

  private goToShop = (url: string) => {
    window.open(url, '_blank');
  }
}

const mapStateToProps = (state: RootState) => ({
  products: state.products
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getProductDetail: bindActionCreators(getProductDetail, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
