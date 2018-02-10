import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Dimmer, Loader, Button, Icon, Divider, Grid, Image } from 'semantic-ui-react';
import { getProductDetails } from '../modules/actions/products';

import '../styles/products.css';

class ProductDetails extends Component {
  componentDidMount () {
    this.props.getProductDetails(this.props.match.params.id);
  }

  goToShop = (url) => {
    window.open(url, '_blank');
  }

  render () {
    const {isFetching, activeProduct} = this.props.products;
    return (
      <Grid className='product-details'>
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
                    <Image src={activeProduct.image[activeProduct.featuredImageIndex]} />
                  </Grid.Column>
                  <Grid.Column>
                    <div className='description-container flex-column cross-axis-baseline'>
                      <div className='title'>{activeProduct.name}</div>
                      <div className='price'>R$ {activeProduct.currentPrice.toFixed(2)}</div>
                      <Button icon labelPosition='left' onClick={() => this.goToShop(activeProduct.storeLink)}>
                        <Icon name='shop' />
                        Ver na minha lojinha
                      </Button>
                      <div>{activeProduct.description}</div>
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

ProductDetails.propTypes = {
  getProductDetails: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired,
  products: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  products: state.products
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({getProductDetails}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
