import React, { useState, useMemo, useEffect } from 'react';
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
  Dropdown,
  Segment,
  Popup,
} from 'semantic-ui-react';
import { FORM_ERROR } from 'final-form';
import { Field, Form } from 'react-final-form';
import ReactQuill from 'react-quill';
import Dropzone from 'react-dropzone';
import 'react-quill/dist/quill.snow.css';
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
  uploadFile,
} from '../../api';
import FieldRenderer from '../../components/FieldRenderer';
import MessageContainer from '../../components/MessageContainer';
import { getImageNameFromUrl } from '../../modules/helpers';

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
};

type ClientImage = {
  large: string;
  small: string;
  loading?: boolean;
};

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

const StyledQuillContainer = styled.div`
  .ql-toolbar.ql-snow,
  .ql-container.ql-snow {
    border-color: #dedede;
  }

  /* .error {
    :global(.ql-toolbar.ql-snow), :global(.ql-container.ql-snow) {
      background-color: #fff6f6;
      border-color: #e0b4b4;
    } */
`;

const quillModules = {
  toolbar: [
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
  ],
};

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
  const [stateImages, setStateImages] = useState<ClientImage[]>([]);
  const [imageError, setImageError] = useState<string>();

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

  useEffect(() => {
    if (product) {
      setStateImages(product.images);
    }
  }, [product]);

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
    const valuesWithImages = { ...validValues, images: stateImages };
    try {
      if (!product) {
        await createProduct(valuesWithImages);
      } else {
        await editProduct(product.id, valuesWithImages);
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

  const handleFileDrop = async (files: any[]) => {
    try {
      setStateImages([...stateImages, { small: '', large: '', loading: true }]);
      const formData = new FormData();
      formData.append('file', files[0]);
      const response = await uploadFile(formData);
      setStateImages(
        stateImages
          .filter(image => !image.loading)
          .concat([
            {
              large: response.data[0].Location,
              small: response.data[1].Location,
            },
          ]),
      );
      setImageError(undefined);
    } catch (error) {
      setStateImages(stateImages.filter(image => !image.loading));
      setImageError(JSON.stringify(error.message));
    }
  };

  const handleDeleteImage = async (imageUrls: ClientImage) => {
    try {
      const imageIndex = stateImages.findIndex(
        image => image.large === imageUrls.large && image.small === imageUrls.small,
      );
      setStateImages(
        stateImages.map((img, index) =>
          index === imageIndex ? { ...img, loading: true } : { ...img },
        ),
      );
      const largeImageName = getImageNameFromUrl(imageUrls.large);
      const smallImageName = getImageNameFromUrl(imageUrls.small);
      await deleteFiles([largeImageName, smallImageName]);
      setStateImages(stateImages.filter((image, index) => index !== imageIndex));
    } catch (error) {
      setStateImages(stateImages.map(img => ({ ...img, loading: false })));
      setImageError(JSON.stringify(error.message));
    }
  };

  const isUploadingOrDeleting = stateImages.some(img => img.loading);
  const hasDropzone = stateImages && stateImages.length < 5 && !isUploadingOrDeleting;

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
        render={({ handleSubmit, submitting, submitError }) => (
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
            <Field name="categoryId" label="Categoria">
              {field => (
                <FieldRenderer {...field} style={{ marginTop: 24 }}>
                  <Dropdown
                    value={field.input.value}
                    onChange={(event, data) => field.input.onChange(data.value)}
                    selection
                    placeholder="Escolha uma categoria"
                    options={categoriesOptions}
                  />
                </FieldRenderer>
              )}
            </Field>
            <div style={{ marginTop: 24 }}>
              <label>Upload de imagens</label>
              <Popup
                trigger={<Icon name="question" circular />}
                content="Altura e largura devem ser maiores que 580px"
                position="top left"
              />
            </div>
            <div className={styles.dropzoneArea} style={{ marginTop: 24 }}>
              {stateImages.map(image => (
                <div key={image.small} className={styles.previewContainer}>
                  {image.loading ? (
                    <Segment className={styles.loading} loading />
                  ) : (
                    <div>
                      <div className={styles.deleteButton} onClick={() => handleDeleteImage(image)}>
                        <Icon name="delete" />
                      </div>
                      <img className={styles.imagePreview} src={image.small} alt={image.small} />
                    </div>
                  )}
                </div>
              ))}
              {hasDropzone && (
                <Dropzone onDrop={handleFileDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className={styles.fileDrop}>
                      <input {...getInputProps()} />
                      <div className={styles.fileDropText}>Faça upload da imagem aqui</div>
                    </div>
                  )}
                </Dropzone>
              )}
            </div>
            {imageError && <MessageContainer message={imageError} />}
            <Field name="description" label="Descrição">
              {field => (
                <FieldRenderer {...field} style={{ marginTop: 24 }}>
                  <StyledQuillContainer>
                    <ReactQuill
                      value={field.input.value}
                      onChange={field.input.onChange}
                      modules={quillModules}
                    />
                  </StyledQuillContainer>
                </FieldRenderer>
              )}
            </Field>
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
            {submitError && <MessageContainer message={submitError} />}
            <Button
              primary
              icon
              labelPosition="right"
              disabled={submitting || isUploadingOrDeleting}
              style={{ marginTop: 16 }}
            >
              Salvar
              <Icon name="check" />
            </Button>
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
          {deleteError && <MessageContainer message={deleteError} />}
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
