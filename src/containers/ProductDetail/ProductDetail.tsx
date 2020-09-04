import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import {
  Dimmer,
  Loader,
  Button,
  Icon,
  Grid,
  Popup,
  Modal,
} from "semantic-ui-react";
import { routerActions as cRouterActions } from "connected-react-router";
import ImageGallery from "../../components/ImageGallery/ImageGallery";
import { productActions as cProductActions } from "../../actions/products";
import { currencyFormat } from "../../modules/helpers";
import pagseguroLogo from "../../assets/pagseguro-logo.png";
import styles from "./ProductDetail.module.scss";

interface StateProps {
  products: ProductsState;
  match: string;
}

interface DispatchProps {
  productActions: typeof cProductActions;
  routerActions: typeof cRouterActions;
}

type ProductDetailProps = StateProps & DispatchProps;

const ProductDetail = ({
  products,
  match,
  productActions,
  routerActions,
}: ProductDetailProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    productActions.getProductDetail(match);
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <Grid className={styles.productDetails} fluid="true">
        <Grid.Column width={2} only="computer" />
        <Grid.Column width={1} only="widescreen" />
        {products.isFetching ? (
          <Dimmer active inverted>
            <Loader />
          </Dimmer>
        ) : (
          <Grid.Column computer={12} widescreen={10} width={16}>
            {products.activeProduct ? (
              <div>
                <Grid stackable columns={2}>
                  <Grid.Column className={styles.frame}>
                    <ImageGallery
                      images={products.activeProduct.image}
                      selectedIndex={products.activeProduct.featuredImageIndex}
                    />
                  </Grid.Column>
                  <Grid.Column className={styles.frame}>
                    <div
                      className={`${styles.detailsContainer} flex-column cross-axis-baseline`}
                    >
                      <div className={styles.title}>
                        {products.activeProduct.name}
                      </div>
                      <div className={styles.price}>
                        <span
                          className={
                            products.activeProduct.discountPrice
                              ? styles.disabledPrice
                              : ""
                          }
                        >
                          {currencyFormat(products.activeProduct.currentPrice)}
                        </span>
                        {products.activeProduct.discountPrice &&
                          currencyFormat(products.activeProduct.discountPrice)}
                      </div>
                      <div className={styles.buttonContainer}>
                        <Popup
                          inverted
                          content="Clique para falar diretamente conosco e receber seu desconto."
                          trigger={
                            <Button
                              primary
                              icon="shop"
                              content="Comprar aqui"
                              labelPosition="left"
                              onClick={() => setIsModalOpen(true)}
                            />
                          }
                        />
                        <div className={styles.discountInfo}>
                          Com até 10% de desconto!
                        </div>
                      </div>
                      {products.activeProduct.storeLink && (
                        <div className={styles.buttonContainer}>
                          <Button
                            primary
                            icon="shop"
                            content="Loja Elo7"
                            labelPosition="left"
                            onClick={() =>
                              window.open(
                                products.activeProduct
                                  ? products.activeProduct.storeLink
                                  : undefined,
                                "_blank"
                              )
                            }
                          />
                        </div>
                      )}
                      <h3>Detalhes do produto e confecção</h3>
                      <div>Peso: {products.activeProduct.weight} g</div>
                      <div>
                        Dimensões (cm): {products.activeProduct.width} x{" "}
                        {products.activeProduct.depth} x{" "}
                        {products.activeProduct.height}
                        (comprimento x largura x altura)
                      </div>
                      <div>
                        Quantidade mínima do pedido:{" "}
                        {products.activeProduct.minAmount} unidades
                      </div>
                      <div>
                        Tempo esperado para produção:{" "}
                        {products.activeProduct.productionTime} dias úteis
                      </div>
                      <img
                        className={styles.pagseguro}
                        src={pagseguroLogo}
                        alt="pagseguro"
                      />
                    </div>
                  </Grid.Column>
                </Grid>
                <Grid>
                  <Grid.Column className={styles.description}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: products.activeProduct.description,
                      }}
                    />
                  </Grid.Column>
                </Grid>
              </div>
            ) : (
              <div>Produto não encontrado</div>
            )}
          </Grid.Column>
        )}
        <Grid.Column width={2} only="computer" />
        <Grid.Column width={1} only="widescreen" />
      </Grid>
      <Modal
        size="small"
        dimmer="inverted"
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <Modal.Content className={styles.modalContent}>
          <div className={styles.subtitle}>
            Entre em contato direto e faça seu orçamento. Desconto à vista ou
            até 3x sem juros.
          </div>
          <p>
            <Icon name="mail" size="large" />
            <a href="mailto:danielakpresentes@yahoo.com.br">
              danielakpresentes@yahoo.com.br
            </a>
          </p>
          <p>
            <Icon name="whatsapp" size="large" className={styles.whatsapp} />
            +55 11 99777 5245
          </p>
          <p>
            <Icon name="facebook" size="large" className={styles.facebook} />
            <a
              href="https://www.facebook.com/danikpresentes/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.facebook.com/danikpresentes
            </a>
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button
            basic
            icon="arrow left"
            labelPosition="left"
            content="Voltar"
            color="grey"
            onClick={() => setIsModalOpen(false)}
          />
        </Modal.Actions>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  products: state.products,
  match: state.router.location.pathname.replace("/product/", ""),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  productActions: bindActionCreators({ ...cProductActions }, dispatch),
  routerActions: bindActionCreators({ ...cRouterActions }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
