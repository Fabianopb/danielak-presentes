import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useSWR from 'swr';
import { Dimmer, Loader, Icon, Modal, Button, Header } from 'semantic-ui-react';
import ProductForm from '../../forms/Product/Product';
import styles from './AdminProduct.module.scss';
import { fetchCategories, fetchProductById } from '../../api';

const AdminProduct = () => {
  const [isOpen, setIsOpen] = useState(false);

  const params = useParams();
  const history = useHistory();

  const { data: categories, isValidating: loadingCategories } = useSWR(
    '/categories',
    fetchCategories,
  );

  const { data: product, isValidating: loadingProduct } = useSWR(`/product/${params.id}`, () =>
    fetchProductById(params.id),
  );

  const submitProduct = (values: Product): void => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { _id, ...rest } = values;
    const productPayload = params.id === 'new' ? rest : product;
    // productActions.upsertProduct(productPayload as Product);
  };

  return (
    <div className={styles.adminProduct}>
      <div className={styles.addProductHeader}>
        <h3>Adicionar produto</h3>
        <div className={styles.actionButtons}>
          <Button
            basic
            icon
            labelPosition="right"
            color="blue"
            onClick={() => history.push('/admin')}
          >
            Voltar
            <Icon name="chevron left" />
          </Button>
          <Button
            icon
            labelPosition="right"
            color="red"
            disabled={params.id === 'new'}
            onClick={() => setIsOpen(true)}
          >
            Remover
            <Icon name="trash" />
          </Button>
        </div>
      </div>
      {loadingProduct && loadingCategories && (
        <Dimmer active inverted>
          <Loader />
        </Dimmer>
      )}
      {product && categories && (
        <ProductForm
          initialValues={params.id === 'new' ? {} : product}
          categories={categories}
          onSubmit={submitProduct}
        />
      )}
      <Modal open={isOpen} onClose={() => setIsOpen(false)} size="small">
        <Header icon="trash" content="Apagar produto" />
        <Modal.Content>
          <p>
            Tem certeza que deseja apagar o produto <em>{product && product.name}</em>?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic icon labelPosition="right" color="blue" onClick={() => setIsOpen(false)}>
            Cancelar
            <Icon name="ban" />
          </Button>
          <Button
            icon
            labelPosition="right"
            color="red"
            // onClick={() => productActions.deleteProduct((product as Product)._id)}
          >
            Remover
            <Icon name="remove" />
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default AdminProduct;
