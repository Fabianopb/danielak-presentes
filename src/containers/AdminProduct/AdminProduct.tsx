import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useSWR from 'swr';
import {
  Dimmer,
  Loader,
  Icon,
  Modal,
  Button,
  Header,
  Form as SemanticForm,
  Input,
  Checkbox,
} from 'semantic-ui-react';
import { FORM_ERROR } from 'final-form';
import { Field, Form } from 'react-final-form';
import styled from 'styled-components';
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
import FieldRenderer from '../../components/FieldRenderer';

type FormValues = {
  name: string;
  featuredImageIndex?: number;
  storeLink?: string;
  description: string;
  categoryId: string;
  currentPrice?: number;
  discountPrice?: number;
  tags: string;
  productionTime?: number;
  minAmount?: number;
  width?: number;
  height?: number;
  depth?: number;
  weight?: number;
  isVisible: boolean;
  isFeatured: boolean;
  images: {
    large: string;
    small: string;
  }[];
};

type ClientImage = {
  large: string;
  small: string;
  loading?: boolean;
};

function usePrevious<T>(value: T) {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const InlineFormRow = styled.div`
  display: flex;
  margin-top: 24px;
`;

const StyledField = styled(FieldRenderer)`
  flex: 1;
  & + & {
    margin-left: 16px;
  }
`;

const transformProductFormValuesToApi = (values: FormValues): ApiProductPayload => {
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
  const [deleteError, setDeleteError] = useState<string>();

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

  const initialValues = useMemo<FormValues>(() => {
    if (product) {
      const { id, createdAt, ...rest } = product;
      return rest;
    }
    return {
      name: '',
      description: '',
      categoryId: '',
      tags: '',
      isVisible: true,
      isFeatured: false,
      images: [],
    };
  }, [product]);

  const submitProduct = async (values: FormValues) => {
    const validValues = transformProductFormValuesToApi(values);
    try {
      if (!product) {
        await createProduct(validValues);
      } else {
        await editProduct(product.id, validValues);
      }
      history.push('/admin');
    } catch (error) {
      return { [FORM_ERROR]: JSON.stringify(error.message) };
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
      setDeleteError(JSON.stringify(error.message));
    }
  };

  const categoriesOptions = (categories || []).map(cat => ({ text: cat.name, value: cat.id }));

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
      <Form
        onSubmit={submitProduct}
        initialValues={initialValues}
        render={({ handleSubmit }) => (
          <SemanticForm onSubmit={handleSubmit}>
            <InlineFormRow>
              <Field name="name">
                {field => (
                  <StyledField {...field} label="Nome do produto">
                    <Input {...field.input} placeholder="Nome do produto" fluid />
                  </StyledField>
                )}
              </Field>
              <Field name="storeLink">
                {field => (
                  <StyledField {...field} label="Link da loja">
                    <Input {...field.input} placeholder="Link da loja" fluid />
                  </StyledField>
                )}
              </Field>
            </InlineFormRow>
            {/* TODO: category dropdown */}
            {/* TODO: image upload */}
            {/* TODO: rich text description */}
            <InlineFormRow>
              <Field name="currentPrice">
                {field => (
                  <StyledField {...field} label="Preço">
                    <Input {...field.input} type="number" placeholder="Preço" label="R$" fluid />
                  </StyledField>
                )}
              </Field>
              <Field name="discountPrice">
                {field => (
                  <StyledField {...field} label="Preço com desconto">
                    <Input
                      {...field.input}
                      type="number"
                      placeholder="Preço com desconto"
                      label="R$"
                      fluid
                    />
                  </StyledField>
                )}
              </Field>
            </InlineFormRow>
            <Field name="tags">
              {field => (
                <FieldRenderer {...field} label="Tags" style={{ marginTop: 24 }}>
                  <Input {...field.input} placeholder="Tags separadas por vírgula" fluid />
                </FieldRenderer>
              )}
            </Field>
            <InlineFormRow>
              <Field name="productionTime">
                {field => (
                  <StyledField {...field} label="Dias para produção">
                    <Input {...field.input} type="number" placeholder="Dias para produção" fluid />
                  </StyledField>
                )}
              </Field>
              <Field name="minAmount">
                {field => (
                  <StyledField {...field} label="Quantidade mínima">
                    <Input {...field.input} type="number" placeholder="Quantidade mínima" fluid />
                  </StyledField>
                )}
              </Field>
            </InlineFormRow>
            <InlineFormRow>
              <Field name="depth">
                {field => (
                  <StyledField {...field} label="Comprimento">
                    <Input
                      {...field.input}
                      type="number"
                      placeholder="Comprimento"
                      fluid
                      labelPosition="right"
                      label="cm"
                    />
                  </StyledField>
                )}
              </Field>
              <Field name="width">
                {field => (
                  <StyledField {...field} label="Largura">
                    <Input
                      {...field.input}
                      type="number"
                      placeholder="Largura"
                      fluid
                      labelPosition="right"
                      label="cm"
                    />
                  </StyledField>
                )}
              </Field>
              <Field name="height">
                {field => (
                  <StyledField {...field} label="Altura">
                    <Input
                      {...field.input}
                      type="number"
                      placeholder="Altura"
                      fluid
                      labelPosition="right"
                      label="cm"
                    />
                  </StyledField>
                )}
              </Field>
              <Field name="weight">
                {field => (
                  <StyledField {...field} label="Peso">
                    <Input
                      {...field.input}
                      type="number"
                      placeholder="Peso"
                      fluid
                      labelPosition="right"
                      label="g"
                    />
                  </StyledField>
                )}
              </Field>
            </InlineFormRow>
            <Field name="isVisible">
              {field => (
                <FieldRenderer {...field} style={{ marginTop: 24 }}>
                  <Checkbox
                    checked={field.input.value}
                    onChange={field.input.onChange}
                    type="checkbox"
                    label="Visível"
                  />
                </FieldRenderer>
              )}
            </Field>
            <Field name="isFeatured">
              {field => (
                <FieldRenderer {...field} style={{ marginTop: 8 }}>
                  <Checkbox
                    checked={field.input.value}
                    onChange={field.input.onChange}
                    type="checkbox"
                    label="Em destaque"
                  />
                </FieldRenderer>
              )}
            </Field>
          </SemanticForm>
        )}
      />
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
