import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Icon, Grid, Popup, Modal } from 'semantic-ui-react';
import ImageGallery from '../../components/ImageGallery/ImageGallery';
import { currencyFormat } from '../../modules/helpers';
import pagseguroLogo from '../../assets/pagseguro-logo.png';
import styles from './ProductDetail.module.scss';
import { Product } from '../../data/products';

type Props = {
  products: Product[];
};

const ProductDetail = ({ products }: Props) => {
  const params = useParams<{ id: string }>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const product = products.find((p) => p.id === params.id);

  return (
    <div>
      <Grid className={styles.productDetails} fluid="true">
        <Grid.Column width={2} only="computer" />
        <Grid.Column width={1} only="widescreen" />
        <Grid.Column computer={12} widescreen={10} width={16}>
          {product && (
            <div>
              <Grid stackable columns={2}>
                <Grid.Column className={styles.frame}>
                  <ImageGallery images={product.imagens} selectedIndex={0} />
                </Grid.Column>
                <Grid.Column className={styles.frame}>
                  <div className={`${styles.detailsContainer} flex-column cross-axis-baseline`}>
                    <div className={styles.title}>{product.nome}</div>
                    <div className={styles.price}>
                      <span className={product.precoDesconto ? styles.disabledPrice : ''}>
                        {currencyFormat(product.preco)}
                      </span>
                      {product.precoDesconto && currencyFormat(product.precoDesconto)}
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
                      <div className={styles.discountInfo}>Com até 10% de desconto!</div>
                    </div>
                    {product.linkElo7 && (
                      <div className={styles.buttonContainer}>
                        <Button
                          primary
                          icon="shop"
                          content="Loja Elo7"
                          labelPosition="left"
                          onClick={() => window.open(product.linkElo7 ? product.linkElo7 : undefined, '_blank')}
                        />
                      </div>
                    )}
                    <h3>Detalhes do produto e confecção</h3>
                    <div>Peso: {product.pesoEmGramas} g</div>
                    <div>
                      Dimensões (cm): {product.larguraEmCm} x {product.profundidadeEmCm} x {product.alturaEmCm}
                      (comprimento x largura x altura)
                    </div>
                    <div>Quantidade mínima do pedido: {product.minimoPedido} unidades</div>
                    <div>Tempo esperado para produção: {product.diasProducao} dias úteis</div>
                    <img className={styles.pagseguro} src={pagseguroLogo} alt="pagseguro" />
                  </div>
                </Grid.Column>
              </Grid>
              <Grid>
                <Grid.Column className={styles.description}>
                  <div
                    // FIXME: what would be the alternative?
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      __html: product.descricao,
                    }}
                  />
                </Grid.Column>
              </Grid>
            </div>
          )}
        </Grid.Column>
        <Grid.Column width={2} only="computer" />
        <Grid.Column width={1} only="widescreen" />
      </Grid>
      <Modal size="small" dimmer="inverted" open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Content className={styles.modalContent}>
          <div className={styles.subtitle}>
            Entre em contato direto e faça seu orçamento. Desconto à vista ou até 3x sem juros.
          </div>
          <p>
            <Icon name="mail" size="large" />
            <a href="mailto:danielakpresentes@yahoo.com.br">danielakpresentes@yahoo.com.br</a>
          </p>
          <p>
            <Icon name="whatsapp" size="large" className={styles.whatsapp} />
            +55 11 99777 5245
          </p>
          <p>
            <Icon name="facebook" size="large" className={styles.facebook} />
            <a href="https://www.facebook.com/danikpresentes/" target="_blank" rel="noopener noreferrer">
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

export default ProductDetail;
