import * as React from 'react';
import { connect } from 'react-redux';
import { match } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { Dimmer, Loader, Button, Icon, Grid, Popup } from 'semantic-ui-react';
import { routerActions } from 'connected-react-router';
import ImageGallery from '../../components/ImageGallery/ImageGallery';
import { productActions } from '../../actions/products';
import { currencyFormat } from '../../modules/helpers';
import pagseguroLogo from '../../assets/pagseguro-logo.png';
import styles from './ProductDetail.module.scss';

type StateProps = {
  products: ProductsState;
};

type DispatchProps = {
  productActions: typeof productActions;
  routerActions: typeof routerActions;
};

type OwnProps = {
  match: match<{id: string}>;
};

type ProductDetailProps = StateProps & DispatchProps & OwnProps;

class ProductDetail extends React.Component<ProductDetailProps> {
  public componentDidMount () {
    this.props.productActions.getProductDetail(this.props.match.params.id);
  }

  public render () {
    const { isFetching, activeProduct } = this.props.products;
    return (
      <div>
        <Grid className={styles.productDetails} fluid={true}>
          <Grid.Column width={2} only='computer' />
          <Grid.Column width={1} only='widescreen' />
          { isFetching ? (
            <Dimmer active={true} inverted={true}>
              <Loader />
            </Dimmer>
          ) : (
            <Grid.Column computer={12} widescreen={10} width={16}>
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
                        <div className={styles.buttonContainer}>
                          <Popup
                            inverted={true}
                            content='Clique para falar diretamente conosco e receber seu desconto.'
                            trigger={
                              <Button
                                primary={true}
                                icon={true}
                                labelPosition='left'
                                onClick={() => void 0}
                              >
                                <Icon name='shop' />
                                Comprar aqui
                              </Button>
                            }
                          />
                          <div className={styles.discountInfo}>Com até 10% de desconto!</div>
                        </div>
                        <div className={styles.buttonContainer}>
                          <Button
                            primary={true}
                            icon={true}
                            labelPosition='left'
                            onClick={() => window.open(activeProduct.storeLink, '_blank')}
                          >
                            <Icon name='shop' />
                            Loja Elo7
                          </Button>
                        </div>
                        <h3>Detalhes do produto e confecção</h3>
                        <div>Peso: {activeProduct.weight} g</div>
                        <div>Dimensões: {activeProduct.width} (C) x {activeProduct.depth} (L) x {activeProduct.height} (A)</div>
                        <div>Quantidade mínima do pedido: {activeProduct.minAmount}</div>
                        <div>Tempo esperado para produção: {activeProduct.productionTime} dias úteis.</div>
                        <img className={styles.pagseguro} src={pagseguroLogo} alt='pagseguro' />
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
}

const mapStateToProps = (state: RootState) => ({
  products: state.products
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  productActions: bindActionCreators({ ...productActions }, dispatch),
  routerActions: bindActionCreators({ ...routerActions }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
