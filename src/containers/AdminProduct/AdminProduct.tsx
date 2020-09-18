import React, { useState, useMemo } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useSWR from 'swr';
import { Dimmer, Loader, Icon, Modal, Button, Header } from 'semantic-ui-react';
import ProductForm, {
  ProductFormData,
  ClientImage,
  emptyProductFormValues,
} from '../../forms/Product/Product';
import styles from './AdminProduct.module.scss';
import {
  fetchCategories,
  fetchProductById,
  deleteProduct,
  deleteFiles,
  createProduct,
  editProduct,
  ApiProductPayload,
} from '../../api';

const transformProductFormValuesToApi = (values: ProductFormData): ApiProductPayload => {
  if (
    values.productionTime === undefined ||
    values.minAmount === undefined ||
    values.weight === undefined ||
    values.height === undefined ||
    values.width === undefined ||
    values.depth === undefined
  ) {
    throw new Error('There are undefined values in the form that should be defined');
  }
  return { ...values, featuredImageIndex: 0 } as ApiProductPayload;
};

const AdminProduct = () => {
  const [isOpen, setIsOpen] = useState(false);

  const params = useParams();
  const history = useHistory();

  const { data: categories, isValidating: loadingCategories } = useSWR(
    '/categories',
    fetchCategories,
  );

  const { data: product, isValidating: loadingProduct } = useSWR(
    params.id === 'new' ? null : `/product/${params.id}`,
    () => fetchProductById(params.id),
  );

  const initialValues = useMemo<ProductFormData>(() => {
    if (product) {
      const { id, createdAt, ...rest } = product;
      return rest;
    }
    return emptyProductFormValues;
  }, [product]);

  const submitProduct = async (values: ProductFormData) => {
    const validValues = transformProductFormValuesToApi(values);
    try {
      if (!product) {
        await createProduct(validValues);
      } else {
        await editProduct(product.id, validValues);
      }
      history.push('/admin');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const confirmProductDelete = async (id: string, images: ClientImage[]) => {
    try {
      await Promise.all([
        deleteProduct(id),
        deleteFiles(images.flatMap(img => [img.small, img.large])),
      ]);
      history.push('/admin');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
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
            disabled={!product}
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
      {categories && (
        <ProductForm
          initialValues={initialValues}
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
            onClick={() => (product ? confirmProductDelete(product.id, product.images) : undefined)}
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
